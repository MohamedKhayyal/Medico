import { useState } from "react";
import {
  FaVial,
  FaCapsules,
  FaTooth,
  FaStethoscope,
  FaBandAid,
  FaThermometerHalf,
  FaMicroscope,
  FaBriefcaseMedical,
} from "react-icons/fa";
import { MdMasks } from "react-icons/md";

const categories = [
  {
    icon: <FaVial size={50} className="text-[#00A297]" />,
    label: "Accessories",
    count: 24,
  },
  {
    icon: <FaCapsules size={50} className="text-[#00A297]" />,
    label: "Capsules",
    count: 19,
  },
  {
    icon: <FaTooth size={50} className="text-[#00A297]" />,
    label: "Tooth",
    count: 20,
  },
  {
    icon: <FaStethoscope size={50} className="text-[#00A297]" />,
    label: "Stethoscope",
    count: 17,
  },
  {
    icon: <FaBandAid size={50} className="text-[#00A297]" />,
    label: "Band Aid",
    count: 18,
  },
  {
    icon: <FaThermometerHalf size={50} className="text-[#00A297]" />,
    label: "Thermometer",
    count: 15,
  },
  {
    icon: <FaMicroscope size={50} className="text-[#00A297]" />,
    label: "Microscope",
    count: 17,
  },
  {
    icon: <FaBriefcaseMedical size={50} className="text-[#00A297]" />,
    label: "First Aid Kit",
    count: 19,
  },
  {
    icon: <MdMasks size={50} className="text-[#00A297]" />,
    label: "Face Masks",
    count: 18,
  },
];

const ITEMS_PER_PAGE = 8;

export default function PopularCategories() {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil((categories.length - 1) / ITEMS_PER_PAGE) + 1;

  let start = page * ITEMS_PER_PAGE;
  let end = start + ITEMS_PER_PAGE;

  if (page === 1) {
    start = 1;
    end = start + ITEMS_PER_PAGE;
  }

  const pagedCategories = categories.slice(start, end);

  return (
    <div className="w-full py-12 mb-10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Popular Categories
      </h2>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 xl:gap-16 min-h-[17rem]">
        {pagedCategories.map((cat) => (
          <div key={cat.label} className="flex flex-col items-center w-32">
            <div className="bg-[#f6f6f6] rounded-full flex items-center justify-center w-30 h-30 mb-4">
              {cat.icon}
            </div>
            <div className="font-bold text-lg text-center">{cat.label}</div>
            <div className="text-gray-500 text-base text-center mt-1">
              ({cat.count} Items)
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-8">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            className={`block w-4 h-4 rounded-full transition border-2 border-white shadow ${
              idx === page
                ? "bg-[#00A297] scale-110"
                : "bg-gray-300 hover:bg-[#00A297]/60"
            }`}
            onClick={() => setPage(idx)}
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
