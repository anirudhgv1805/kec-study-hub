import { getFirestore } from "firebase/firestore";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import app from "../firebase/firebase";

const UserProfile: React.FC = () => {
  // @ts-ignore
  const db = getFirestore(app);

  const { user } = useAuth();
  // @ts-ignore
  const [loading, setLoading] = useState<boolean>(false);
  // @ts-ignore
  const [error, setError] = useState<string | null>(null);

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
