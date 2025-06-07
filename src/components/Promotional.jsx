import image from "../assets/parallax_img.jpg";
export default function Promotional() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-around text-sm border border-gray-300 rounded-md  w-full h-[100vh] bg-white">
      <div
        style={{ backgroundImage: `url(${image})` }}
        className=" w-full h-full bg-cover bg-center rounded-md"
      >
        <div className="flex flex-col justify-center px-4 md:px-16 lg:px-32 py-12 w-full max-w-3xl mt-30">
          <p className="text-sm sm:text-base md:text-lg font-semibold text-[#222] mb-2 tracking-wide">
            HIGHER LEVEL OF CARE
          </p>
          <h2 className="text-xl sm:text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Genuine Commitment
            <br className="hidden md:block" />
            To Your Health
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-8">
            Lorem Ipsum is simply the printing and typesetting industry
          </p>
          <button className="bg-[#00A297] hover:bg-[#0b0b0b] text-white font-bold px-8 py-4 rounded transition shadow text-lg w-48">
            SHOP NOW
          </button>
        </div>
      </div>
    </div>
  );
}
