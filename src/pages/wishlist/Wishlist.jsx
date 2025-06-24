import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faStar } from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../../components/WishlistContext";
import { useCart } from "../../components/CartContext";
import { useEffect } from "react";
import Links from "../../components/Links";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  useEffect(() => {
    document.title = "Wishlist";
  }, []);
  return (
    <>
      <Links page={"Wishlist"} location={"Wishlist"} linkTo={"/wishlist"} />
      <div className="px-4 md:px-16 lg:px-24 xl:px-32 py-10">
        <h1 className="text-3xl font-extrabold text-[#00A297] mb-8 tracking-tight drop-shadow">
          Your Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="text-center text-gray-500 bg-white rounded-2xl shadow p-10">
            Your wishlist is empty. <br />
            <Link
              to="/medicines"
              className="text-[#00A297] hover:underline font-semibold"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div
            className="grid gap-8"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            }}
          >
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-2xl p-6 bg-white relative flex flex-col items-center shadow-xl hover:shadow-2xl transition group"
              >
                <Link
                  to={`/details/${product.id}`}
                  className="w-full h-48 flex items-center justify-center mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-[#f7fafc] to-[#e0f7fa] border border-gray-100 shadow-sm"
                >
                  <img
                    loading="lazy"
                    src={product.cover || product.image1}
                    alt={product.name}
                    className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
                <div className="text-center mb-1 font-semibold text-gray-900 text-base min-h-[40px]">
                  {product.name}
                </div>
                <div className="flex items-center mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`w-4 h-4 ${
                        i < (product.star || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[#00A297] font-bold text-xl mb-2">
                  ${product.discount || product.descount || product.price}
                </div>

                <div className="flex gap-2 mt-auto w-full">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-[#00A297] text-white py-2 rounded-xl font-semibold hover:bg-[#00897B] transition shadow focus:outline-none focus:ring-2 focus:ring-[#00A297]/30"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="bg-gray-100 p-2 rounded-xl hover:bg-red-100 transition shadow focus:outline-none focus:ring-2 focus:ring-red-400/30"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
