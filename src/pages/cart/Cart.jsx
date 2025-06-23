import { useEffect, useState } from "react";
import { useCart } from "../../components/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faArrowLeft,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../components/AuthContext";
import { toast } from "react-toastify";
import Links from "../../components/Links";
export default function Cart() {
  const [showAddress, setShowAddress] = useState(false);
  const { cart, removeFromCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Cart";
    if (!user) {
      navigate("/login");
      toast.warning("Please log in to view your cart");
    }
  }, [user, navigate]);
  const totalPrice = cart.reduce((sum, item) => {
    const price = item.discount || item.descount || item.price || 0;
    return sum + price * item.quantity;
  }, 0);

  const tax = +(totalPrice * 0.02).toFixed(2);
  const grandTotal = +(totalPrice + tax).toFixed(2);

  return (
    <>
      <Links page={"Cart"} location={"Cart"} linkTo={"/cart"} />
      <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
        <div className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-medium mb-6">
            Shopping Cart{" "}
            <span className="text-sm text-indigo-500">{cart.length} Items</span>
          </h1>

          <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
            <p className="text-left">Product Details</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {cart.map((product, index) => {
            const price = product.discount || product.descount || product.price;
            return (
              <div
                key={product.id || index}
                className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
              >
                <div className="flex items-center md:gap-6 gap-3">
                  <div className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                    <img
                      loading="lazy"
                      className="max-w-full h-full object-cover"
                      src={product.cover || product.image || product.image1}
                      alt={product.name}
                    />
                  </div>
                  <div>
                    <p className="hidden md:block font-semibold">
                      {product.name}
                    </p>
                    <div className="font-normal text-gray-500/70">
                      <div className="flex items-center">
                        <p>Qty:</p>
                        <select
                          className="outline-none ml-1"
                          value={product.quantity}
                          onChange={(e) =>
                            updateQuantity(product.id, Number(e.target.value))
                          }
                        >
                          {Array(10)
                            .fill("")
                            .map((_, idx) => (
                              <option key={idx} value={idx + 1}>
                                {idx + 1}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center">
                  ${(price * product.quantity).toFixed(2)}
                </p>
                <button
                  className="cursor-pointer mx-auto text-red-500 hover:text-red-700 transition"
                  onClick={() => removeFromCart(product.id)}
                >
                  <FontAwesomeIcon icon={faTrash} size="lg" />
                </button>
              </div>
            );
          })}

          <Link
            to={"/medicines"}
            className="group flex items-center mt-8 gap-2 text-indigo-500 font-medium"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
          <h2 className="text-xl font-medium">Order Summary</h2>
          <hr className="border-gray-300 my-5" />

          <div className="mb-6">
            <p className="text-sm font-medium uppercase">Delivery Address</p>
            <div className="relative flex justify-between items-start mt-2">
              <p className="text-gray-500 flex items-center gap-2">
                <FontAwesomeIcon icon={faLocationDot} /> No address found
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-indigo-500 hover:underline cursor-pointer text-sm"
              >
                Change
              </button>
              {showAddress && (
                <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full shadow z-10">
                  <p
                    onClick={() => setShowAddress(false)}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                  >
                    New York, USA
                  </p>
                  <p
                    onClick={() => setShowAddress(false)}
                    className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
                  >
                    Add address
                  </p>
                </div>
              )}
            </div>

            <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
            <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <hr className="border-gray-300" />

          <div className="text-gray-500 mt-4 space-y-2 text-sm">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-green-600">Free</span>
            </p>
            <p className="flex justify-between">
              <span>Tax (2%)</span>
              <span>${tax.toFixed(2)}</span>
            </p>
            <p className="flex justify-between text-base font-semibold pt-2">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </p>
          </div>

          <button className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
