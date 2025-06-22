import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import LatestProducts from "../../components/LatestProducts";
import { useCart } from "../../components/CartContext";

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "Medico", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() };
          setProduct(data);
          setMainImage(data.cover || data.image1 || data.image2);
        } else {
          setProduct(null);
        }
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <>
      <div className="w-full flex justify-between items-center mb-10 bg-[#eaf7f7] px-4 md:px-16 lg:px-24 xl:px-32 py-5">
        <h1 className="text-3xl font-bold">Details</h1>
        <nav className="text-gray-600">
          <Link to="/" className="mr-2 hover:underline text-black">
            Home
          </Link>
          <span className="mx-1">|</span>
          <Link to="/details/:id" className="ml-2 hover:underline">
            Details
          </Link>
        </nav>
      </div>
      <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto">
        {/* Images */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full rounded-lg border"
          />
          <div className="flex gap-2">
            {[product.cover, product.image1, product.image2]
              .filter(Boolean)
              .map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-20 h-20 object-contain border rounded cursor-pointer ${
                    mainImage === img ? "ring-2 ring-[#00A297]" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
          </div>
        </div>
        {/* Details */}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={`w-5 h-5 ${
                  i < (product.star || 0) ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="mb-4 text-gray-600">{product.description}</div>
          <div className="mb-2">
            <span className="font-semibold">Brand:</span> {product.brand}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Stock:</span>{" "}
            <span className="text-[#00A297]">{product.stock}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div
              className="bg-[#00A297] h-2 rounded-full"
              style={{
                width: `${Math.min(100, (product.stock / 400) * 100)}%`,
              }}
            ></div>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Price:</span>
            {product.price && (
              <span className="line-through text-gray-400">
                ${product.price}
              </span>
            )}
            <span className="text-[#00A297] font-bold text-xl ml-2">
              ${product.discount || product.descount}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center border rounded overflow-hidden w-20 h-12 bg-white">
              <button
                className="flex-1 h-full flex items-center justify-center text-xl font-bold text-gray-700 hover:bg-[#00A297]"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                type="button"
              >
                &#8722;
              </button>
              <input
                type="text"
                className="w-8 text-center border-0 focus:ring-0 outline-none text-lg font-semibold"
                value={quantity}
                readOnly
              />
              <button
                className="flex-1 h-full flex items-center justify-center text-xl font-bold text-gray-700 hover:bg-[#00A297]"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                type="button"
              >
                &#43;
              </button>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="flex-1 px-6 py-2 bg-[#00A297] text-white rounded font-semibold hover:bg-[#00897b] transition h-12"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      {/* Reassurance Policies */}
      <div className="max-w-6xl mx-auto mt-8 mb-10">
        <div className="bg-[#fafafa] rounded shadow-sm divide-y divide-gray-200">
          <div className="flex items-center px-6 py-4">
            <span className="mr-4 text-[#00A297]">
              {/* Lock Icon */}
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <rect width="24" height="24" fill="none" />
                <path
                  d="M7 10V7a5 5 0 0 1 10 0v3"
                  stroke="#00A297"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="#00A297"
                  strokeWidth="2"
                />
                <circle cx="12" cy="16" r="1" fill="#00A297" />
              </svg>
            </span>
            <div>
              <div className="font-semibold">Security policy</div>
              <div className="text-gray-500 text-sm">
                (edit with the Customer Reassurance module)
              </div>
            </div>
          </div>
          <div className="flex items-center px-6 py-4">
            <span className="mr-4 text-[#00A297]">
              {/* Delivery Icon */}
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <rect width="24" height="24" fill="none" />
                <path
                  d="M3 17V7a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v10M16 17h2a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-2"
                  stroke="#00A297"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="7.5" cy="17.5" r="1.5" fill="#00A297" />
                <circle cx="16.5" cy="17.5" r="1.5" fill="#00A297" />
              </svg>
            </span>
            <div>
              <div className="font-semibold">Delivery policy</div>
              <div className="text-gray-500 text-sm">
                (edit with the Customer Reassurance module)
              </div>
            </div>
          </div>
          <div className="flex items-center px-6 py-4">
            <span className="mr-4 text-[#00A297]">
              {/* Return Icon */}
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <rect width="24" height="24" fill="none" />
                <path
                  d="M3 12v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                  stroke="#00A297"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"
                  stroke="#00A297"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="8"
                  y="10"
                  width="8"
                  height="6"
                  rx="1"
                  stroke="#00A297"
                  strokeWidth="2"
                />
                <circle cx="12" cy="13" r="1" fill="#00A297" />
              </svg>
            </span>
            <div>
              <div className="font-semibold">Return policy</div>
              <div className="text-gray-500 text-sm">
                (edit with the Customer Reassurance module)
              </div>
            </div>
          </div>
        </div>
      </div>
      <LatestProducts title={"You might also like"} />
    </>
  );
}
