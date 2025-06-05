import { useState } from "react";
import logo from "../assets/logo-1743073720.svg";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
  faBars,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to={"/"}>
        <img className="h-9" src={logo} alt="dummyLogoColored" />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to={"/"}>Home</Link>
        <Link to={"/"}>Medicines</Link>
        <Link to={"/"}>Contact</Link>

        <div
          className="hidden lg:flex items-center text-sm gap-2 px-6 rounded-full"
          style={{ border: "2px solid #00A297" }}
        >
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products Here..."
          />

          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>

        <div className="relative cursor-pointer flex items-center gap-4">
          <div>
            <FontAwesomeIcon icon={faCartShopping} />
            {/* <button className="absolute -top-2 -right-3 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
              3
            </button> */}
          </div>
          <FontAwesomeIcon icon={faHeart} />
        </div>

        <button
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
          className="cursor-pointer px-8 py-2 text-white rounded-full"
          style={{
            background: "#00A297",
            transition: "background 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#00897B")}
          onMouseLeave={(e) => (e.target.style.background = "#00A297")}
        >
          Login
        </button>
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        <Link to={"/"} className="block">
          Home
        </Link>
        <Link to={"/"} className="block">
          About
        </Link>
        <Link to={"/"} className="block">
          Contact
        </Link>
        <button className="cursor-pointer px-6 py-2 mt-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full text-sm">
          Login
        </button>
      </div>
    </nav>
  );
}
