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
    <nav className="flex flex-wrap items-center justify-between gap-5 px-4 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/" className="flex-shrink-0">
        <img className="h-9 w-auto" src={logo} alt="Logo" />
      </Link>

      <div className="hidden sm:flex items-center gap-4 md:gap-8 flex-wrap">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-sm whitespace-nowrap"
        >
          <FontAwesomeIcon icon={faHouse} />
          Home
        </NavLink>
        <NavLink
          to="/medicines"
          className="flex items-center gap-2 text-sm whitespace-nowrap"
        >
          <FontAwesomeIcon icon={faPills} />
          Medicines
        </NavLink>
        <NavLink
          to="/contact"
          className="flex items-center gap-2 text-sm whitespace-nowrap"
        >
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

        <div className="flex gap-6 mt-4 text-[20px] px-2">
          <div className="hover:text-[#00A297] transition-colors duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
          <div className="hover:text-[#00A297] transition-colors duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>
      </div>

      <div className="flex sm:hidden items-center justify-between w-full mt-4">
        <div className="flex items-center gap-6 text-[20px] px-2">
          <div className="hover:text-[#00A297] transition-colors duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faCartShopping} />
          </div>
          <div className="hover:text-[#00A297] transition-colors duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>

        <div className="flex items-center gap-2">
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
          className="ml-2"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

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
