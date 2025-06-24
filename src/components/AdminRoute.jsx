import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "./AuthContext";
import Loading from "./Loading";

export default function AdminRoute({ children }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const ref = doc(db, "admins", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists() && snap.data().role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    checkRole();
  }, [user]);

  if (loading) return <Loading message="Checking Admin ..." />;
  if (!isAdmin) return <Navigate to="/" />;

  return children;
}
