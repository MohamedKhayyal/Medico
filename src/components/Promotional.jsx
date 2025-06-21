import { useEffect, useState } from "react";
import image from "../assets/parallax_img.jpg";
import banner1 from "../assets/cms-banner-1.jpg";
import banner2 from "../assets/cms-banner-2.jpg";
import banner3 from "../assets/cms-banner-3.jpg";

export default function Promotional() {
  const banar = [
    { banner: banner1, discount: "25%", title: "Hand Sanitizer\nCoronavirus" },
    { banner: banner2, discount: "15%", title: "Stereo Zoom\nMicroscope" },
    { banner: banner3, discount: "20%", title: "New Forehead\nThermometer" },
  ];

  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="relative mb-5 w-full h-[115vh] overflow-hidden rounded-md">
        <div
          className="absolute top-0 left-0 w-full h-full bg-center bg-cover z-0"
          style={{
            backgroundImage: `url('${image}')`,
            transform: `translateY(${offsetY * -0.05}px)`,
            transition: "transform 0.1s ease-out",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-start h-full w-full px-4 md:px-16 lg:px-32 py-2">
          <div className="w-full md:w-1/2 flex flex-col justify-center items-start h-full p-4 rounded-md">
            <p className="text-base md:text-lg font-semibold text-[#222] mb-2 tracking-wide drop-shadow">
              HIGHER LEVEL OF CARE
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight drop-shadow">
              Genuine Commitment
              <br className="hidden md:block" />
              To Your Health
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-8 drop-shadow">
              Lorem Ipsum is simply the printing and typesetting industry
            </p>
            <button className="bg-[#00A297] hover:bg-[#0b0b0b] text-white font-bold px-8 py-4 rounded transition shadow text-lg w-48">
              SHOP NOW
            </button>
          </div>
        </div>
      </div>
      {/* Banners */}
      <div className="mb-20 w-full flex flex-col lg:flex-row gap-6 px-2 sm:px-4 md:px-12 lg:px-24 xl:px-32 mt-4">
        {banar.map((item, index) => (
          <div
            key={index}
            className="flex-1 rounded-xl flex flex-row items-center p-4 sm:p-15 gap-4 sm:gap-6 shadow bg-cover bg-center transform transition-transform duration-300 hover:scale-105"
            style={{ backgroundImage: `url(${item.banner})` }}
          >
            <div className="flex-1 flex flex-col items-end text-left">
              <div className="text-xs sm:text-sm md:text-base font-medium text-gray-700 mb-2 tracking-widest">
                Flat {item.discount} Off
              </div>
              <h3 className="text-base sm:text-2xl md:text-2xl font-bold mb-4 text-gray-900 leading-snug text-right whitespace-pre-line">
                {item.title}
              </h3>
              <button className="text-[#00A297] cursor-pointer font-semibold px-1 sm:px-1 py-1 sm:py-0.5 border-b-1 border-[#00A297] hover:border-transparent transition-all duration-300 text-sm sm:text-base">
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
