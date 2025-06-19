import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCollection from "./ProductCollection";

export default function LatestProducts({ title }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto my-12">
      <h2 className="text-4xl font-bold text-center mb-8">{title}</h2>
      <ProductCollection limit={9}>
        {({ products, loading }) =>
          loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={8}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
              className="pb-8"
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div
                    className="flex flex-col items-center border border-gray-200 bg-white rounded-lg p-4 h-full relative group transition-shadow hover:shadow-lg"
                    onMouseEnter={() => setHovered(product.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="relative w-55 h-55 mb-4 mx-auto flex items-center justify-center">
                      <img
                        loading="lazy"
                        src={product.cover}
                        alt={product.name}
                        className={`absolute top-0 left-0 w-full h-full object-contain transition-all duration-400 ${
                          hovered === product.id
                            ? "opacity-0 scale-95"
                            : "opacity-100 scale-100"
                        }`}
                      />
                      <img
                        loading="lazy"
                        src={product.image1}
                        alt={product.name}
                        className={`absolute top-0 left-0 w-full h-full object-contain transition-all duration-400 ${
                          hovered === product.id
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-105"
                        }`}
                      />
                    </div>
                    <div
                      className={`absolute top-0 right-3 transition-all duration-300 z-10 ${
                        hovered === product.id
                          ? "translate-y-3 opacity-100"
                          : "-translate-y-8 opacity-0"
                      }`}
                    >
                      <button className="bg-transparent border border-gray-300 rounded-full p-2 shadow hover:text-white hover:bg-[#00A297] transition duration-300">
                        <FontAwesomeIcon
                          icon={farHeart}
                          className="transition duration-300"
                        />
                      </button>
                    </div>
                    <div className="flex items-center mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={`w-5 h-5 ${
                            i < (product.star || 0)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-center font-medium text-gray-800 mb-1 min-h-[48px]">
                      {product.name}
                    </div>
                    <div className="text-[#00A297] font-bold text-lg mb-3">
                      ${product.discount || product.descount}
                    </div>
                    <button className="w-full py-2 rounded bg-gray-100 font-semibold text-gray-800 hover:bg-[#00A297] hover:text-white transition mb-2">
                      ADD TO CART
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )
        }
      </ProductCollection>
    </div>
  );
}
