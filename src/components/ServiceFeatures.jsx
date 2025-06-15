import { FaTruck, FaHeadset } from "react-icons/fa";
import { GiPiggyBank } from "react-icons/gi";
import { BsPercent } from "react-icons/bs";

export default function ServiceFeatures() {
  const items = [
    {
      icon: <FaTruck className="text-3xl" />,
      title: "Worldwide Shipping",
      subtitle: "For all Orders Over $100",
    },
    {
      icon: <GiPiggyBank className="text-3xl" />,
      title: "Money Back Guarantee",
      subtitle: "Guarantee With In 30 Days",
    },
    {
      icon: <BsPercent className="text-3xl" />,
      title: "Offers And Discounts",
      subtitle: "Back Returns In 7 Days",
    },
    {
      icon: <FaHeadset className="text-3xl" />,
      title: "24/7 Support Services",
      subtitle: "Contact us Anytime",
    },
  ];

  return (
    <div className="border border-teal-500 rounded-md py-6 px-10 flex flex-col md:flex-row justify-between items-center gap-6 w-[85%] mt-10 mb-10 m-auto">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="flex items-center gap-3 text-center md:text-left"
        >
          <div className="text-black hover:text-teal-500 flex">{item.icon}</div>
          <div>
            <h4 className="font-semibold text-lg">{item.title}</h4>
            <p className="text-gray-500">{item.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
