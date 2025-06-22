import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#f9f9f9] text-center px-4">
      <h1 className="text-6xl font-bold text-[#00A297] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        onClick={() => scrollTo(0, 0)}
        to="/"
        className="inline-flex items-center gap-2 text-white bg-[#00A297] px-4 py-2 rounded hover:bg-[#00897b] transition"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Home
      </Link>
    </div>
  );
}
