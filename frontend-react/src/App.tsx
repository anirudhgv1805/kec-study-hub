import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Unauthorized } from "./pages/Unauthorized";
import { StudentDashboard } from "./pages/StudentDashboard";
import { StaffDashboard } from "./pages/StaffDashboard";
import AnnouncementPosting from "./pages/AnnouncementPosting";
import { Logout } from "./pages/Logout";
import { AnnouncementViewing } from "./pages/AnnouncementViewing";
import NotesView from "./pages/NotesView";

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/announcement-posting" element={<AnnouncementPosting />} />
        <Route path="/announcement-viewing" element={<AnnouncementViewing />} />
        <Route path="/not-allowed" element={<Unauthorized />} />
        <Route path="/notes-view" element={<NotesView />} />
      </Routes>
    </>
  );
};
