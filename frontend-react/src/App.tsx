import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AdminDashboard } from "./pages/AdminDashboard";
import { Unauthorized } from "./pages/Unauthorized";

export const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/not-allowed" element={<Unauthorized />} />
      </Routes>
    </>
  );
};
