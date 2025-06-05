// src/routes/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // If user is logged in, redirect to home (or dashboard)
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If not logged in, show the page (login/signup)
  return children;
}
