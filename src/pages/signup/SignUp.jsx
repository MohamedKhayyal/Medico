import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import image from "../../assets/pexels-cottonbro-8668003.jpg";

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
      toast.success(`Welcome ${username}`, {
        position: "top-center",
      });
      navigate("/");
    } catch (err) {
      toast.error(err.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="flex h-[700px] w-full mb-10">
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full w-full object-cover rounded-l-2xl shadow-xl"
          src={image}
          alt="leftSideImage"
          loading="lazy"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center bg-white rounded-r-2xl shadow-xl">
        <form
          onSubmit={handleSignUp}
          className="md:w-96 w-80 flex flex-col items-center justify-center"
        >
          <h2 className="text-4xl text-[#00A297] font-extrabold mb-2 tracking-tight drop-shadow">
            Sign Up
          </h2>
          <p className="text-sm text-gray-500/90 mt-3 mb-2">
            Create your account to get started
          </p>
          <div className="flex items-center my-4 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <FontAwesomeIcon icon={faUser} className="text-gray-500" />
            <input
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
            <input
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <FontAwesomeIcon icon={faLock} className="text-gray-500" />
            <input
              className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-[#00A297] hover:bg-[#00897b] font-bold text-lg shadow-lg transition"
          >
            Create Account
          </button>
          <p className="text-gray-500/90 text-sm mt-4">
            Already have an account?{" "}
            <Link
              className="text-[#00A297] hover:underline font-semibold"
              to={"/login"}
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
