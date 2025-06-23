import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
export default function RenderIcons() {
  const { user } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <div className="flex gap-6 text-[20px] px-2 relative">
      <Link
        to="/cart"
        className="hover:text-[#00A297] transition-colors duration-300 cursor-pointer relative"
      >
        <FontAwesomeIcon icon={faCartShopping} />
        {user && cart.length > 0 && (
          <span className="absolute -top-2 -right-3 text-xs bg-[#00A297] text-white rounded-full w-5 h-5 flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </Link>
      <Link
        to="/wishlist"
        className="hover:text-[#00A297] transition-colors duration-300 cursor-pointer relative"
      >
        <FontAwesomeIcon icon={faHeart} />
        {wishlist.length > 0 && (
          <span className="absolute -top-2 -right-3 text-xs bg-[#00A297] text-white rounded-full w-5 h-5 flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </Link>
    </div>
  );
}
