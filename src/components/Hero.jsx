import { useState } from "react";
import image1 from "../assets/sample-1-removebg-preview.png";
import image2 from "../assets/sample-2-removebg-preview.png";

const slides = [
  {
    image: image1,
    subtitle: "HIGHER LEVEL OF CARE",
    title: "Providing Total HealthCare Solutions",
    desc: "Equipment used for supporting and enhancing",
    button: "SHOP NOW",
  },
  {
    image: image2,
    subtitle: "VACCINES OF COVID-19",
    title: "Association Between COVID-19 Vaccines",
    desc: "Lorem Ipsum is simply the printing and typesetting industry",
    button: "SHOP NOW",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="mb-20 relative w-full bg-[#d6f6f6] overflow-hidden min-h-[350px] md:min-h-[420px] lg:min-h-[500px] flex items-center group">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-[#00A297] text-[#00A297] hover:bg-[#00A297] hover:text-white transition rounded-full w-12 h-12 flex items-center justify-center shadow opacity-0 group-hover:opacity-100"
        aria-label="Previous"
      >
        <svg width="24" height="24" fill="currentColor">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
        </svg>
      </button>
      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white border-2 border-[#00A297] text-[#00A297] hover:bg-[#00A297] hover:text-white transition rounded-full w-12 h-12 flex items-center justify-center shadow opacity-0 group-hover:opacity-100"
        aria-label="Next"
      >
        <svg width="24" height="24" fill="currentColor">
          <path d="M10 6l-1.41 1.41L13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>
      {/* Slider Content */}
      <div
        key={current}
        className="w-full flex flex-col md:flex-row items-center px-4 md:px-12 lg:px-24 xl:px-32 py-8 gap-8 transition-opacity duration-700 ease-in-out animate-fadeIn"
      >
        {/* Image */}
        <div className="w-full md:w-1/2 transition-all duration-700 ease-in-out">
          <img
            src={slides[current].image}
            alt="slide"
            className="w-auto h-[280px] md:h-[420px] lg:h-[500px] max-w-full object-contain"
          />
        </div>
        {/* Text */}
        <div
          key={current}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <div className="text-sm md:text-base font-medium text-gray-700 mb-2 tracking-widest animate__animated animate__slideInRight">
            {slides[current].subtitle}
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight animate__animated animate__slideInRight">
            {slides[current].title}
          </h1>

          <p className="text-base md:text-lg text-gray-700 mb-6 animate__animated animate__slideInRight">
            {slides[current].desc}
          </p>

          <button className="animate__animated animate__fadeInUp animate__delay-05s bg-[#00A297] hover:bg-[#00897B] text-white font-semibold px-8 py-3 rounded transition shadow cursor-pointer">
            {slides[current].button}
          </button>
        </div>
      </div>
      {/* Dots */}
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`block w-4 h-4 rounded-full border-2 border-[#00A297] transition cursor-pointer ${
              idx === current ? "bg-[#00A297]" : "bg-white"
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
