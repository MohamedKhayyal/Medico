import image from "../assets/parallax_img.jpg";
export default function Promotional() {
  return (
    <div
      className="relative flex flex-col md:flex-row items-center justify-start text-sm border border-gray-300 rounded-md w-full h-screen overflow-hidden bg-center bg-cover"
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "400px",
      }}
    >
      <div className="relative z-10 flex flex-col justify-center items-start h-full w-full md:w-1/2 px-4 md:px-16 lg:px-32 py-2">
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
  );
}
