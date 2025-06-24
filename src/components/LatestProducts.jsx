import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCollection from "./ProductCollection";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import StarRating from "./StarRating";

export default function LatestProducts({ title }) {
  const [hovered, setHovered] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
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
                    className="flex flex-col items-center border border-gray-200 bg-white rounded-2xl p-6 min-h-[400px] h-[400px] relative group transition-shadow hover:shadow-2xl shadow-xl duration-200"
                    onMouseEnter={() => setHovered(product.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <Link
                      className="relative w-44 h-44 mb-4 mx-auto flex items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#f7fafc] to-[#e0f7fa] border border-gray-100 shadow-sm"
                      to={`/details/${product.id}`}
                    >
                      <img
                        loading="lazy"
                        src={product.cover}
                        alt={product.name}
                        className={`absolute top-0 left-0 w-full h-full object-contain transition-all duration-500 ${
                          hovered === product.id
                            ? "opacity-0 scale-95"
                            : "opacity-100 scale-100"
                        }`}
                      />
                      <img
                        loading="lazy"
                        src={product.image1}
                        alt={product.name}
                        className={`absolute top-0 left-0 w-full h-full object-contain transition-all duration-500 ${
                          hovered === product.id
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-105"
                        }`}
                      />
                    </Link>
                    <div
                      className={`absolute top-0 right-3 transition-all duration-300 z-10 ${
                        hovered === product.id
                          ? "translate-y-3 opacity-100"
                          : "-translate-y-8 opacity-0"
                      }`}
                    >
                      <button
                        onClick={() =>
                          isInWishlist(product.id)
                            ? removeFromWishlist(product.id)
                            : addToWishlist(product)
                        }
                        className={`bg-white border rounded-full p-2 shadow-md transition duration-300 ${
                          isInWishlist(product.id)
                            ? "text-[red] border-[red] hover:bg-[red] hover:text-white"
                            : "text-[#00A297] border-[#00A297] hover:bg-[#00A297] hover:text-white"
                        }`}
                      >
                        <FontAwesomeIcon icon={farHeart} />
                      </button>
                    </div>
                    <StarRating product={product.star} />
                    <div className="text-center font-semibold text-gray-900 mb-1 min-h-[48px] text-base">
                      {product.name}
                    </div>
                    <div className="text-[#00A297] font-bold text-xl mb-3">
                      ${product.discount || product.descount}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-2 rounded-xl bg-gray-100 font-semibold text-gray-800 hover:bg-[#00A297] hover:text-white transition mb-2 shadow focus:outline-none focus:ring-2 focus:ring-[#00A297]/30"
                    >
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
