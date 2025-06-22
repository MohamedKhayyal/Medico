import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
export default function StarRating({ product }) {
  return (
    <div className="flex items-center mb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={`w-5 h-5 ${
            i < (product || 0) ? "text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
