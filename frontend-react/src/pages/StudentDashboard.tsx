import React from "react";
import { useNavigate } from "react-router-dom";
import NavigateButton from "../components/NavigateButton";
import UserProfile from "../components/UserProfile";

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate("/logout");
  };

  const handleViewAnnouncementsClick = () => {
    navigate("/announcement-viewing");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Student Dashboard
        </h1>
        <UserProfile />
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={handleLogoutClick}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
          <button
            onClick={handleViewAnnouncementsClick}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            View Announcements
          </button>
          <NavigateButton label="View Notes" to="/notes-view" />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
