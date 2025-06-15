import { useEffect, useState } from "react";
import image from "../../assets/roberto-sorin-RS0-h_pyByk-unsplash.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

export default function Login() {
  useEffect(() => {
    document.title = "Login";
  }, []);

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
      toast.success(`Welcome back ${name}`, { position: "top-center" });
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
      toast.success(`Welcome back ${name}`, { position: "top-center" });
      navigate("/");
    } catch (err) {
      toast.error(err.message, { position: "bottom-center" });
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="relative hidden md:block md:w-1/2 h-screen">
        <img
          src={image}
          alt="Pharmacy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      <div className="flex items-center justify-center w-full md:w-1/2 px-6 py-12">
        <div className="bg-white text-gray-600 w-full max-w-md rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Welcome Back
          </h2>

          <form onSubmit={handleLogin}>
            <input
              id="email"
              type="email"
              placeholder="Email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A297]"
            />
            <input
              id="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mb-2 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#00A297]"
            />

            <div className="text-right text-sm mb-4">
              <Link to="#" className="text-[#00A297] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#00A297] hover:bg-[#00897B] text-white font-medium py-3 rounded-full transition-all duration-200 active:scale-95"
            >
              Log in
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Don’t have an account?
            <Link to="/signUp" className="ml-1 text-[#00A297] hover:underline">
              Signup
            </Link>
          </p>

          <div className="my-4 border-t border-gray-200" />

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-full hover:bg-gray-50 transition"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
              alt="Google"
              className="w-5 h-5"
            />
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
