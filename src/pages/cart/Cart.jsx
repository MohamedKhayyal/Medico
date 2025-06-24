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
          <h1 className="text-3xl font-extrabold text-[#00A297] mb-8 tracking-tight drop-shadow">
            Shopping Cart{" "}
            <span className="text-base text-gray-400 font-medium">
              ({cart.length} Items)
            </span>
          </h1>

          <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-semibold pb-3">
            <p className="text-left">Product Details</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          <div className="divide-y divide-gray-200 bg-white rounded-2xl shadow-xl">
            {cart.map((product, index) => {
              const price = product.discount || product.descount || product.price;
              return (
                <div
                  key={product.id || index}
                  className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium py-5 px-2 hover:bg-[#f7fafc] transition"
                >
                  <div className="flex items-center md:gap-6 gap-3">
                    <div className="cursor-pointer w-20 h-20 flex items-center justify-center border border-gray-200 rounded-xl bg-gradient-to-br from-white to-[#e0f7fa] shadow-sm">
                      <img
                        loading="lazy"
                        className="max-w-full h-full object-contain rounded-lg"
                        src={product.cover || product.image || product.image1}
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="hidden md:block font-semibold text-gray-900 mb-1">
                        {product.name}
                      </p>
                      <div className="font-normal text-gray-500/70">
                        <div className="flex items-center">
                          <p>Qty:</p>
                          <select
                            className="outline-none ml-1 border border-gray-300 rounded px-2 py-1 focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 transition"
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
                  <p className="text-center text-[#00A297] font-bold text-lg">
                    ${(price * product.quantity).toFixed(2)}
                  </p>
                  <button
                    className="cursor-pointer mx-auto text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-full transition shadow focus:outline-none focus:ring-2 focus:ring-red-400/30"
                    onClick={() => removeFromCart(product.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} size="lg" />
                  </button>
                </div>
              );
            })}
          </div>

          <Link
            to={"/medicines"}
            className="group flex items-center mt-8 gap-2 text-[#00A297] font-semibold hover:underline"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <div className="max-w-[360px] w-full bg-gradient-to-br from-white via-[#f7fafc] to-[#e0f7fa] p-7 max-md:mt-16 border border-gray-200 rounded-2xl shadow-xl ml-0 md:ml-8 h-fit">
          <h2 className="text-xl font-extrabold text-[#00A297] mb-4 text-center tracking-tight drop-shadow">
            Order Summary
          </h2>
          <hr className="border-gray-200 my-5" />

          <div className="mb-6">
            <p className="text-sm font-semibold uppercase text-gray-700">
              Delivery Address
            </p>
            <div className="relative flex justify-between items-start mt-2">
              <p className="text-gray-500 flex items-center gap-2">
                <FontAwesomeIcon icon={faLocationDot} /> No address found
              </p>
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-[#00A297] hover:underline cursor-pointer text-sm font-semibold"
              >
                Change
              </button>
              {showAddress && (
                <div className="absolute top-12 py-1 bg-white border border-gray-200 text-sm w-full shadow-lg z-10 rounded-xl">
                  <p
                    onClick={() => setShowAddress(false)}
                    className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer rounded"
                  >
                    New York, USA
                  </p>
                  <p
                    onClick={() => setShowAddress(false)}
                    className="text-[#00A297] text-center cursor-pointer p-2 hover:bg-[#00A297]/10 rounded"
                  >
                    Add address
                  </p>
                </div>
              )}
            </div>

            <p className="text-sm font-semibold uppercase mt-6 text-gray-700">
              Payment Method
            </p>
            <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none rounded focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 transition">
              <option value="COD">Cash On Delivery</option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <hr className="border-gray-200" />

          <div className="text-gray-700 mt-4 space-y-2 text-sm">
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
            <p className="flex justify-between text-base font-bold pt-2">
              <span>Total</span>
              <span>${grandTotal.toFixed(2)}</span>
            </p>
          </div>

          <button className="w-full py-3 mt-6 cursor-pointer bg-[#00A297] text-white font-bold rounded-xl text-lg shadow-lg hover:bg-[#00897b] transition focus:outline-none focus:ring-2 focus:ring-[#00A297]/40">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
