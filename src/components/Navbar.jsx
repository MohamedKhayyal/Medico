import { useEffect, useState } from "react";
import logo from "../assets/logo-1743073720.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faHouse,
  faPills,
  faPhone,
  faRightToBracket,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./AuthContext";
import Logout from "./Logout";
import RenderIcons from "./RenderIcons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/medicines?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className=" bg-white border-b border-gray-300 px-4 md:px-16 lg:px-24 xl:px-32 py-4 flex flex-wrap items-center justify-between gap-5 transition-all">
      {/* Logo */}
      <Link to="/" className="flex-shrink-0">
        <img className="h-9 w-auto" src={logo} alt="Logo" />
      </Link>
      {/* Search Bar */}
      <div className="flex items-center flex-1 justify-center mx-4">
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full max-w-xs border rounded h-9"
          style={{ borderColor: "#00A297" }}
        >
          <input
            className="py-1.5 px-3 bg-transparent outline-none placeholder-gray-500 flex-1 min-w-0 text-sm"
            type="text"
            placeholder="Search products Here..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="h-9 w-9 flex items-center justify-center text-white rounded-r"
            style={{ background: "#00A297" }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
      {/* Desktop Nav */}
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
        {/* Cart + Wishlist */}
        <RenderIcons />
      </div>
      {/* Mobile Top Row */}
      <div className="flex sm:hidden items-center justify-between w-full mt-4">
        <RenderIcons />
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="ml-2"
        >
          <FontAwesomeIcon icon={faBars} size="lg" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 transition-transform duration-300 overflow-y-auto ${
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
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 w-full py-2 text-lg"
        >
          <FontAwesomeIcon icon={faHouse} />
          Home
        </NavLink>

        <NavLink
          to="/medicines"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 w-full py-2 text-lg"
        >
          <FontAwesomeIcon icon={faPills} />
          Medicines
        </NavLink>
        <NavLink
          to="/contact"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 w-full py-2 text-lg"
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
