import { useEffect, useState } from "react";
import image from "../../assets/pexels-cottonbro-8668003.jpg";
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
        <div className="md:w-96 w-80 flex flex-col items-center justify-center">
          <h2 className="text-4xl text-[#00A297] font-extrabold mb-2 tracking-tight drop-shadow">
            Login
          </h2>
          <p className="text-sm text-gray-500/90 mt-3 mb-2">
            Welcome back! Please sign in to continue
          </p>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-full cursor-pointer border border-gray-200 shadow hover:bg-gray-100 transition"
          >
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
              alt="googleLogo"
            />
          </button>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300/90"></div>
            <p className="w-full text-nowrap text-sm text-gray-500/90">
              or sign in with email
            </p>
            <div className="w-full h-px bg-gray-300/90"></div>
          </div>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-2">
            <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="16"
                height="11"
                viewBox="0 0 16 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="email"
                placeholder="Email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>
            <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                required
              />
            </div>
            <div className="w-full flex items-center justify-between mt-8 text-gray-500/80">
              <div className="flex items-center gap-2">
                <input className="h-5" type="checkbox" id="checkbox" />
                <label className="text-sm" htmlFor="checkbox">
                  Remember me
                </label>
              </div>
              <a className="text-sm underline" href="#">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="mt-8 w-full h-11 rounded-full text-white bg-[#00A297] hover:bg-[#00897b] font-bold text-lg shadow-lg transition"
            >
              Login
            </button>
          </form>

          <p className="text-gray-500/90 text-sm mt-4">
            Don’t have an account?{" "}
            <Link
              className="text-[#00A297] hover:underline font-semibold"
              to={"/signUp"}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
