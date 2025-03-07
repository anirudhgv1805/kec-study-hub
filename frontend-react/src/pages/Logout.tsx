import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const Logout: React.FC = () => {
  const { logout } = useAuth();
  useEffect(() => {
    logout();
  }, [logout]);
  return (
    <>
      <h1 className="flex justify-center items-center h-screen text-red-700 text-4xl">
        You have been logged out
      </h1>
    </>
  );
};
