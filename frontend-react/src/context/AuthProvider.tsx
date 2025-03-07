import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import React, { ReactNode, useEffect, useState } from "react";
import app from "../firebase/firebase";
import { User } from "../types/User";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const db = getFirestore(app);
  // @ts-ignore
  const [jwtToken, setJwtToken] = useState<string | null>(
    localStorage.getItem("jwtToken")
  );
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(true);
  // @ts-ignore
  const [error, setError] = useState<string | null>(null);

  // const axiosInstance = useAxiosInstance();

  // useEffect( () => {
  //     const getUserData = async() =>{
  //         try{
  //             const response = await axiosInstance.post('/me');
  //             localStorage.setItem('user',JSON.stringify(response.data));
  //             console.log("user ",JSON.stringify(response.data))
  //         } catch(err : unknown){
  //             console.log("cannot fetch the user"+err);
  //         } finally{
  //             console.log("fetched the user");
  //         }

  //     };
  //     getUserData();
  //     console.log("at authprovider")
  //     const userDetails = JSON.parse(localStorage.getItem('user') || '{}')
  //     setUser(userDetails);
  // },[jwtToken]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setUser(docSnap.data() as User);
          } else {
            setError("No such user exists");
          }
        } else {
          setError("User is not logged in");
        }
      } catch (err) {
        setError("Error fetching user data");
        console.error("Error fetching user: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    return () => {
      localStorage.removeItem("user");
    };
  }, [user?.uid]);

  const auth = getAuth(app);

  const signUp = async (email: string, password: string, role: string) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userLog = userCredential.user;
    await setDoc(doc(db, "users", userLog.uid), {
      email: userLog.email,
      role: role,
    });
    return userLog;
  };

  const getUserData = async (userId: string) => {
    const userDoc = await getDoc(doc(db, "users", userId));
    console.log("userDoc", userDoc);
    return userDoc.exists() ? userDoc.data() : null;
  };

  const getUserRole = async (userId: string) => {
    const userDoc = await getDoc(doc(db, "users", userId));
    return userDoc.exists() ? userDoc.data()?.role : null;
  };

  const loginFireBase = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("user", getUserData(user.uid));
    const role = await getUserRole(user.uid);
    console.log("role", role);
    return { user, role };
  };

  const login = async (email: string, password: string) => {
    const { user, role } = await loginFireBase(email, password);
    const userData = await getUserData(user.uid);
    if (!userData) {
      throw new Error("User not found");
    }
    localStorage.setItem("user", JSON.stringify(userData));
    setUser({
      ...userData,
      curr_sem: userData.curr_sem || "",
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || 9876543210,
      profile_pic: userData.profile_pic || "",
      role: role || "",
      department: userData.department || "",
      roll_no: userData.roll_no || "",
      year: userData.year || new Date().getFullYear(),
      uid: userData.uid || "",
    });
    return { userData };
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!jwtToken,
        jwtToken,
        user,
        login,
        logout,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
