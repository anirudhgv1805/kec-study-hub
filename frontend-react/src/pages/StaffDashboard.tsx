import React from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";

export const StaffDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/announcement-posting");
  };

  return (
    <>
      <h1>This is the staff dashboard</h1>
      <UserProfile />
      <button
        onClick={handleButtonClick}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Go to Announcement Posting
      </button>
    </>
  );
};
