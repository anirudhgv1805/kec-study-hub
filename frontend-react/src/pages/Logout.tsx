import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const Logout: React.FC = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-red-700 text-4xl mb-6">You have been logged out</h1>
      <Link to="/">
        <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
          Go to Login
        </button>
      </Link>
    </div>
  );
};

export default Logout;
