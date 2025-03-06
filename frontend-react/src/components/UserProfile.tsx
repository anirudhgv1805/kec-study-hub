import React, { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { User } from "../types/User";
import app from "../firebase/firebase";

interface UserProfileProps {
  uid: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ uid }) => {
  const db = getFirestore(app);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setUser(docSnap.data() as User);
        } else {
          setError("No such user exists");
        }
      } catch (err) {
        setError("Error fetching user data");
        console.error("Error fetching user: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [uid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">User Profile</h1>
      {user && (
        <div className="mt-4 space-y-4">
          <img
            src={`data:image/jpeg;base64,${user.profile_pic}`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <div>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Department:</strong> {user.department}
            </p>
            <p>
              <strong>Roll No:</strong> {user.roll_no}
            </p>
            <p>
              <strong>Current Semester:</strong> {user.curr_sem}
            </p>
            <p>
              <strong>Year:</strong> {user.year}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
