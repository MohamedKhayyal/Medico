import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      } float-animation`}
      aria-label="Scroll to top"
    >
      <span className="relative flex items-center justify-center w-12 h-12 rounded-full border-4 border-[#00A297] bg-[#00A297] group shadow-lg">
        <div className="w-5 h-5 text-white">
          <FontAwesomeIcon icon={faArrowUp} />
        </div>
      </span>
    </button>
  );
}
