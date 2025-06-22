import { Link } from "react-router-dom";
export default function Links({ page, location, linkTo }) {
  return (
    <div className="w-full flex justify-between items-center bg-[#eaf7f7] px-4 md:px-16 lg:px-24 xl:px-32 py-5">
      <h1 className="text-3xl font-bold">{page}</h1>
      <nav className="text-gray-600">
        <Link to="/" className="mr-2 hover:underline text-black">
          Home
        </Link>
        <span className="mx-1">|</span>
        <Link to={linkTo} className="ml-2 hover:underline">
          {location}
        </Link>
      </nav>
    </div>
  );
}
