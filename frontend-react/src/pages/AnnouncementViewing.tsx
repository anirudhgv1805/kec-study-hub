import React, { useEffect, useState } from "react";
import {
  subscribeToAnnouncements,
  updateLikes,
} from "../services/announcementHandling";
import { useAuth } from "../context/AuthContext";
import { Announcement } from "../types/Announcement";

export const AnnouncementViewing: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = subscribeToAnnouncements((fetchedAnnouncements) => {
      setAnnouncements(fetchedAnnouncements);
    });

    return () => unsubscribe();
  }, []);

  const handleLike = async (id: string, _currentLikes: number) => {
    if (user?.uid) {
      await updateLikes(id, user.uid);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Announcements</h1>
        {announcements.length === 0 ? (
          <p className="text-center text-gray-500">
            No announcements available
          </p>
        ) : (
          <ul className="space-y-4">
            {announcements.map((announcement) => (
              <li
                key={announcement.id}
                className="p-4 border rounded-md shadow-sm"
              >
                <h2 className="text-xl font-semibold">{announcement.title}</h2>
                <p className="mt-2">{announcement.message}</p>
                <p className="mt-2 text-sm text-gray-600">
                  Target: {announcement.target}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Posted by: {announcement.userId}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Vulgar Content: {announcement.vulgarContent ? "Yes" : "No"}
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Posted on: {new Date(announcement.timestamp).toLocaleString()}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleLike(announcement.id!, announcement.likes)
                    }
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    disabled={announcement.likedBy?.includes(user?.uid!)}
                  >
                    Like
                  </button>
                  <span className="ml-2 text-sm text-gray-600">
                    {announcement.likes} Likes
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AnnouncementViewing;
