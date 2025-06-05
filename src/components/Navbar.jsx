import { useEffect, useState } from "react";
import logo from "../assets/logo-1743073720.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
  faBars,
  faHeart,
  faHouse,
  faPills,
  faPhone,
  faRightToBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./AuthContext";
import Logout from "./Logout";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className="flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/">
        <img className="h-9" src={logo} alt="dummyLogoColored" />
      </Link>

      <div className="hidden sm:flex items-center gap-6 md:gap-10">
        <NavLink to="/" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faHouse} />
          Home
        </NavLink>
        <NavLink to="/medicines" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPills} />
          Medicines
        </NavLink>
        <NavLink to="/contact" className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPhone} />
          Contact
        </NavLink>

        <div
          className="hidden lg:flex items-center text-sm gap-2 h-9 rounded border"
          style={{ borderColor: "#00A297" }}
        >
          <input
            className="py-1.5 px-3 bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products Here..."
          />
          <button
            className="h-9 w-9 flex items-center justify-center text-white rounded-r"
            style={{ background: "#00A297" }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>

        <div className="relative cursor-pointer flex items-center gap-4">
          <FontAwesomeIcon icon={faCartShopping} />
          <FontAwesomeIcon icon={faHeart} />
        </div>

        {user ? (
          <Logout
            className="flex items-center gap-2 px-6 py-2 text-white rounded-full transition-colors duration-300"
            style={{ background: "#00A297" }}
          />
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              scrollTo(0, 0);
            }}
            className="flex items-center gap-2 px-6 py-2 text-white rounded-full transition-colors duration-300"
            style={{ background: "#00A297" }}
            onMouseEnter={(e) => (e.target.style.background = "#00897B")}
            onMouseLeave={(e) => (e.target.style.background = "#00A297")}
          >
            <FontAwesomeIcon icon={faRightToBracket} />
            Login
          </button>
        )}
      </div>

      <div className="flex sm:hidden items-center gap-2">
        <input
          className="py-1 px-2 bg-gray-100 rounded outline-none text-sm w-24"
          type="text"
          placeholder="Search..."
        />
        <button
          className="h-8 w-8 flex items-center justify-center text-white rounded"
          style={{ background: "#00A297" }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="sm:hidden ml-2"
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } bg-white flex flex-col items-start gap-3 px-5 py-6 md:hidden`}
        style={{ minHeight: "100vh" }}
      >
        <button
          className="self-end mb-4 text-2xl"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <NavLink
          to="/"
          className="flex items-center gap-2 w-full py-2 text-lg"
          onClick={() => setOpen(false)}
        >
          <FontAwesomeIcon icon={faHouse} />
          Home
        </NavLink>
        <NavLink
          to="/medicines"
          className="flex items-center gap-2 w-full py-2 text-lg"
          onClick={() => setOpen(false)}
        >
          <FontAwesomeIcon icon={faPills} />
          Medicines
        </NavLink>
        <NavLink
          to="/contact"
          className="flex items-center gap-2 w-full py-2 text-lg"
          onClick={() => setOpen(false)}
        >
          <FontAwesomeIcon icon={faPhone} />
          Contact
        </NavLink>
        {user ? (
          <Logout className="flex items-center gap-2 px-5 py-2 mt-4 bg-[#00A297] hover:bg-[#00897B] transition text-white rounded-full w-full justify-center text-lg" />
        ) : (
          <button
            onClick={() => {
              navigate("/login");
              setOpen(false);
            }}
            className="flex items-center gap-2 px-5 py-2 mt-4 bg-[#00A297] hover:bg-[#00897B] transition text-white rounded-full w-full justify-center text-lg"
          >
            <FontAwesomeIcon icon={faRightToBracket} />
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
