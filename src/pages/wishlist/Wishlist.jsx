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
        <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center text-gray-500">
            Your wishlist is empty. <br />
            <Link to="/medicines" className="text-[#00A297] hover:underline">
              Browse products
            </Link>
          </div>
        ) : (
          <div
            className="grid gap-6"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 bg-white relative flex flex-col items-center"
              >
                <Link
                  to={`/details/${product.id}`}
                  className="w-full h-44 flex items-center justify-center mb-3"
                >
                  <img
                    loading="lazy"
                    src={product.cover || product.image1}
                    alt={product.name}
                    className="h-full object-contain"
                  />
                </Link>
                <div className="text-center mb-1 font-semibold">
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
                    className="flex-1 bg-[#00A297] text-white py-2 rounded hover:bg-[#00897B] transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="bg-gray-100 p-2 rounded hover:bg-red-100 transition"
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
