import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#f9f9f9] to-[#e0f7fa] px-4 py-10">
      <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center max-w-lg w-full animate-fade-in">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-6"
        >
          <circle cx="60" cy="60" r="60" fill="#E0F7FA" />
          <text
            x="50%"
            y="54%"
            textAnchor="middle"
            fill="#00A297"
            fontSize="48"
            fontWeight="bold"
            dy=".3em"
          >
            404
          </text>
        </svg>
        <h2 className="text-3xl font-extrabold text-[#00A297] mb-2 drop-shadow">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 text-base">
          The page you are looking for doesn’t exist or has been moved.
        </p>
        <Link
          onClick={() => scrollTo(0, 0)}
          to="/"
          className="inline-flex items-center gap-2 text-white bg-[#00A297] px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-[#00897b] transition focus:outline-none focus:ring-2 focus:ring-[#00A297]/40"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
