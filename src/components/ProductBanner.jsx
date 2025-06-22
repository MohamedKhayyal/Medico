import { useNavigate } from "react-router-dom";
import mask from "../assets/sub-banner-1.jpg";
import stethoscope from "../assets/sub-banner-2.jpg";

export default function ProductBanner() {
  const Navigate = useNavigate();
  return (
    <div className="mb-20 w-full flex flex-col lg:flex-row gap-6 px-2 sm:px-4 md:px-12 lg:px-24 xl:px-32 mt-4">
      {/* Mask Card */}
      <div
        className="flex-1 bg-[#e6f7f0] rounded-xl flex flex-row items-center p-4 sm:p-8 gap-4 sm:gap-6 shadow bg-cover bg-center transform transition-transform duration-300 hover:scale-105"
        style={{ backgroundImage: `url(${mask})` }}
      >
        <div className="flex-1 flex flex-col items-end text-left">
          <div className="text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2 tracking-widest">
            FABRIC SURGICAL MASK
          </div>
          <h2 className="text-base sm:text-2xl md:text-3xl font-bold mb-4 text-gray-900 leading-snug">
            Ply Surgical Mask
            <br />
            With Filter
          </h2>
          <button
            onClick={() => Navigate("/medicines")}
            className="bg-[#00A297] hover:bg-[#0d0d0d] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded transition shadow text-sm sm:text-base"
          >
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Stethoscope Card */}
      <div
        className="flex-1 bg-[#f8f4ea] rounded-xl flex flex-row items-center p-4 sm:p-8 gap-4 sm:gap-6 shadow bg-cover bg-center transform transition-transform duration-300 hover:scale-105"
        style={{ backgroundImage: `url(${stethoscope})` }}
      >
        <div className="flex-1 flex flex-col items-end text-left">
          <div className="text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2 tracking-widest">
            SMART CARE STETHOSCOPES
          </div>
          <h2 className="text-base sm:text-2xl md:text-3xl font-bold mb-4 text-gray-900 leading-snug">
            Digital Stethoscope
            <br />
            For Doctors
          </h2>
          <button className="bg-[#00A297] hover:bg-[#0d0d0d] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded transition shadow text-sm sm:text-base">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
}
