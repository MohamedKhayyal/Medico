import { useState, useEffect } from "react";
import image1 from "../assets/sample-1.jpg";
import image2 from "../assets/sample-2.jpg";
import { useNavigate } from "react-router-dom";
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
  const Navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-20 relative w-full overflow-hidden min-h-[320px] sm:min-h-[380px] md:min-h-[420px] lg:min-h-[500px] flex items-center justify-center group">
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-500"
        style={{
          backgroundImage: `url(${slides[current].image})`,
        }}
      />
      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-white border-2 border-[#00A297] text-[#00A297] hover:bg-[#00A297] hover:text-white transition rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow opacity-80 group-hover:opacity-100"
        aria-label="Previous"
      >
        <svg width="24" height="24" fill="currentColor">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-white border-2 border-[#00A297] text-[#00A297] hover:bg-[#00A297] hover:text-white transition rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center shadow opacity-80 group-hover:opacity-100"
        aria-label="Next"
      >
        <svg width="24" height="24" fill="currentColor">
          <path d="M10 6l-1.41 1.41L13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>
      {/* Slide Content */}
      <div className="relative z-20 px-2 sm:px-4 md:px-12 lg:px-24 xl:px-32 w-full max-w-7xl flex justify-center md:justify-end">
        <div
          key={current}
          className="w-full md:w-1/2 flex flex-col items-center md:items-end text-center md:text-right text-black py-8 md:bg-transparent rounded p-2 sm:p-4"
        >
          <div className="text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2 tracking-widest animate__animated animate__fadeInRight">
            {slides[current].subtitle}
          </div>

          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight animate__animated animate__fadeInRight">
            {slides[current].title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 animate__animated animate__fadeInRight">
            {slides[current].desc}
          </p>

          <button
            onClick={() => Navigate("/medicines")}
            className="bg-[#00A297] hover:bg-[#0d0d0d] text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded transition shadow cursor-pointer animate__animated animate__fadeInUp animate__delay-05s text-sm sm:text-base"
          >
            {slides[current].button}
          </button>
        </div>
      </div>
      {/* Slide Dots */}
      <div className="absolute bottom-3 sm:bottom-6 w-full flex justify-center z-30">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition ${
                current === index
                  ? "bg-[#00A297]"
                  : "bg-white border border-[#00A297]"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
