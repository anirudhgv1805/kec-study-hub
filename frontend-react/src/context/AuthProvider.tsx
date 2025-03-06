import React, { ReactNode, useEffect, useState } from "react";
import { User } from "../types/User";
import { useAxiosInstance } from "../utils/axiosInstance";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps{
    children:ReactNode;
}

export const AuthProvider : React.FC< AuthProviderProps > = ({ children }) => {
    const [jwtToken, setJwtToken] = useState<string | null>(localStorage.getItem('jwtToken'))
    const [user, setUser] = useState<User | null>(null);

    const axiosInstance = useAxiosInstance();
    
    useEffect( () => {
        if(jwtToken){
            const getUserData = async() =>{
                try{
                    const response = await axiosInstance.post('/me');
                    localStorage.setItem('user',JSON.stringify(response.data));
                    console.log("user ",JSON.stringify(response.data))
                } catch(err : unknown){
                    console.log("cannot fetch the user"+err);
                } finally{
                    console.log("fetched the user");
                }
                
            };
            getUserData();
            console.log("at authprovider")
            const userDetails = JSON.parse(localStorage.getItem('user') || '{}')
            setUser(userDetails);
        }
    },[jwtToken]);


    const login = async (jwtToken:string) => {
        localStorage.setItem('jwtToken',jwtToken);
        setJwtToken(jwtToken);
    };

    const logout = () =>{
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('user');
        setJwtToken(null);
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{isAuthenticated: !!jwtToken, jwtToken, user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};