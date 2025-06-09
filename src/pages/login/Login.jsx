import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const name = user.displayName || user.email.split("@")[0];

      toast.success(`Welcome back ${name}`, {
        position: "top-center",
      });
      navigate("/");
    } catch (err) {
      toast.error(err.message, { position: "bottom-center" });
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const name = user.displayName || user.email.split("@")[0];

      toast.success(`Welcome back ${name}`, {
        position: "top-center",
      });
      navigate("/");
    } catch (err) {
      toast.error(err.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white text-gray-500 max-w-96 mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Welcome back
        </h2>

        <form onSubmit={handleLogin}>
          <input
            id="email"
            className="w-full bg-transparent border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="password"
            className="w-full bg-transparent border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-right py-4">
            <Link className="underline" to="#" style={{ color: "#00A297" }}>
              Forgot Password
            </Link>
          </div>
          <button
            type="submit"
            className="w-full mb-3 transition-all active:scale-95 py-2.5 rounded cursor-pointer text-white font-medium"
            style={{ backgroundColor: "#00A297" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#00897B")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#00A297")}
          >
            Log in
          </button>
        </form>
        <p className="text-center mt-4">
          Don’t have an account?
          <Link
            to="/signUp"
            className="underline ml-1"
            style={{ color: "#00A297" }}
          >
            Signup
          </Link>
        </p>
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center gap-2 justify-center my-3 cursor-pointer bg-white border border-gray-500/30 py-2.5 rounded-full text-gray-800"
        >
          <img
            className="h-4 w-4"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          Log in with Google
        </button>
      </div>
    </div>
  );
}
