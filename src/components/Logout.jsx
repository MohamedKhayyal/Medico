import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
export default function Logout({ className }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!", {
        position: "top-center",
      });
      navigate("/login");
    } catch (error) {
      toast.error(error, {
        position: "bottom-center",
      });
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={className}
      style={{ backgroundColor: "#E53935", cursor: "pointer" }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#C62828")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#E53935")}
    >
      <FontAwesomeIcon icon={faRightToBracket} />
      Logout
    </button>
  );
}
