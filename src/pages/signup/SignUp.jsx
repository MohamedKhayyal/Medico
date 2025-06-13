import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

export default function SignUp() {
  useEffect(() => {
    document.title = "Sign Up";
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("User Registered successfully!", {
        position: "top-center",
      });
      navigate("/");
    } catch (err) {
      toast.error(err.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignUp}
        className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">
          Sign Up
        </h2>
        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-3">
          <FontAwesomeIcon icon={faUser} className="text-gray-500" />
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-3">
          <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-2 pl-3">
          <FontAwesomeIcon icon={faLock} className="text-gray-500" />
          <input
            className="w-full outline-none bg-transparent py-2.5"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full mb-3 transition-all active:scale-95 py-2.5 rounded cursor-pointer text-white font-medium"
          style={{ backgroundColor: "#00A297" }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#00897B")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#00A297")}
        >
          Create Account
        </button>

        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className=" underline"
            style={{ color: "#00A297" }}
          >
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
}
