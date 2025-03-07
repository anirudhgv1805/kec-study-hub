import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import { useAuth } from "../context/AuthContext";
import NavigateButton from "../components/NavigateButton";

export const StaffDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleAnnouncementPostingClick = () => {
    navigate("/announcement-posting");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 relative">
        <button
          onClick={handleLogoutClick}
          className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
        <h1 className="text-3xl font-bold text-center mb-6">Staff Dashboard</h1>
        <UserProfile />
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleAnnouncementPostingClick}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Go to Announcement Posting
          </button>
          <NavigateButton label="View Notes" to="/notes-view" />
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
