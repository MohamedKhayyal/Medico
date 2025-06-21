import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCollection from "./ProductCollection";
import DealTimer from "./DealTimer";

export default function DealOfTheDay() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full max-w-7xl mx-auto my-12">
      <h2 className="text-4xl font-bold text-center mb-8">Deal Of The Day</h2>
      <ProductCollection limit={7}>
        {({ products, loading }) =>
          loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-red-500">
              No products found.
            </div>
          ) : (
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                1024: { slidesPerView: 2 },
              }}
              className="pb-8"
            >
              {products.map((product, idx) => (
                <SwiperSlide key={product.id}>
                  <div
                    className="flex flex-col md:flex-row items-center border border-gray-200 bg-white rounded-lg p-6 h-[420px] min-h-[420px] relative group transition-shadow hover:shadow-lg"
                    style={{ height: "420px" }}
                    onMouseEnter={() => setHovered(product.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="w-full md:w-1/2 flex justify-center items-center mb-4 md:mb-0 relative aspect-square max-w-[200px] mx-auto">
                      <img
                        loading="lazy"
                        src={product.cover}
                        alt={product.name || "Product"}
                        className={`absolute inset-0 w-full h-full object-contain transition-all duration-400 ${
                          hovered === product.id
                            ? "opacity-0 scale-95"
                            : "opacity-100 scale-100"
                        }`}
                      />
                      {product.image1 && (
                        <img
                          loading="lazy"
                          src={product.image1}
                          alt={product.name}
                          className={`absolute inset-0 w-full h-full object-contain transition-all duration-400 ${
                            hovered === product.id
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-105"
                          }`}
                        />
                      )}
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
                    <div className="w-full md:w-1/2 flex flex-col gap-2 h-full justify-between">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded">
                          {product.discount > 1
                            ? `-${product.discount || product.descount}%`
                            : `-$${product.price}`}
                        </span>
                      </div>
                      <div className="font-semibold text-lg mb-1">
                        {product.name}
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="line-through text-gray-400 text-base">
                          {product.price ? `$${product.price}` : ""}
                        </span>
                        <span className="text-[#00A297] font-bold text-xl">
                          ${product.discount || product.descount}
                        </span>
                      </div>
                      <div className="mb-1">
                        <span>Available: </span>
                        <span
                          className={
                            product.stock < 30
                              ? "text-red-500 font-bold"
                              : "text-green-600 font-bold"
                          }
                        >
                          {product.stock}
                        </span>
                        <span className="ml-1">items</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-[#00A297] h-2 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (product.stock / 400) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                      {/* Timer */}
                      <DealTimer timerEnd={product.timerEnd} />
                      <button className="cursor-pointer w-full py-2 rounded bg-[#00A297] font-semibold text-white hover:bg-[#00897b] transition">
                        ADD TO CART
                      </button>
                    </div>
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
