import React, { useState } from "react";
import { Department } from "../types/Department";
import { Announcement } from "../types/Announcement"; 
import { postAnnouncement } from "../services/announcementHandling";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../context/AuthContext";

const AnnouncementPosting: React.FC = () => {
  const [title, setTitle] = useState("");
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<"college" | Department>("college");

  const departments: Department[] = [
    "Artificial Intelligence and Data Science",
    "Artificial Intelligence and Machine Learning",
    "Computer Science and Design",
    "Computer Science Engineering",
    "Electronics and Communication Engineering",
    "Electrical and Electronics Engineering",
    "Electronics and Instrumentation Engineering",
    "Information Technology",
    "Automobile Engineering",
    "Civil Engineering",
    "Mechatronics Engineering",
    "Food Technology",
    "Chemical Engineering",
    "Mechanical Engineering",
    "MCA",
    "MSc",
  ];

  const vulgarWords = ["badword1", "badword2"]; // Add more vulgar words as needed

  const containsVulgarContent = (text: string) => {
    return vulgarWords.some((word) => text.toLowerCase().includes(word));
  };

  if (!user?.uid) return <div>Please login to post an announcement</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnnouncement: Announcement = {
      userId: user?.uid,
      title,
      message,
      target,
      timestamp: new Date().toISOString(),
      vulgarContent: containsVulgarContent(message),
      likes: 0,
      likedBy: [],
      id: ""
    };
    postAnnouncement(newAnnouncement);
    toast.success("Announcement added successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Post an Announcement
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="mt-1 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Target:
            </label>
            <select
              value={target}
              onChange={(e) =>
                setTarget(e.target.value as "college" | Department)
              }
              required
              className="mt-1 block w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="college">College</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Post Announcement
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AnnouncementPosting;
