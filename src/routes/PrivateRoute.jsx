import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth(); 
  const location = useLocation();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  const selectedProfile = localStorage.getItem("selectedProfile");
  if (!selectedProfile && location.pathname !== "/who") {
    return <Navigate to="/who" replace />;
  }

    return children;
}
