import UserProfile from "../components/UserProfile";
import { userId } from "../services/auth";

export const AdminDashboard: React.FC = () => {
  const uid = userId || '';
  return (
    <>
      <h1>This is the dashboard</h1>
      <h2>{userId}</h2>
      <UserProfile uid={uid} />
    </>
  );
};
