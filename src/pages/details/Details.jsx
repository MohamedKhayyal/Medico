import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faTruck,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import LatestProducts from "../../components/LatestProducts";
import { useCart } from "../../components/CartContext";
import StarRating from "../../components/StarRating";
import Links from "../../components/Links";
import Loading from "../../components/Loading";

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

  useEffect(() => {
    if (product?.name) {
      document.title = product.name;
    }
  }, [product]);

  if (loading) return <div>{<Loading />}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <>
      <Links page={"Details"} location={"Details"} linkTo={`/details/${id}`} />
      <div className="flex flex-col md:flex-row gap-8 p-8 max-w-6xl mx-auto">
        {/* Images */}
        <div className="flex flex-col gap-4 w-full md:w-1/2">
          <img
            loading="lazy"
            src={mainImage}
            alt={product.name}
            className="w-full rounded-2xl border border-gray-200 shadow-xl bg-gradient-to-br from-white to-[#e0f7fa] object-contain h-96"
          />
          <div className="flex gap-2">
            {[product.cover, product.image1, product.image2]
              .filter(Boolean)
              .map((img, idx) => (
                <img
                  loading="lazy"
                  key={idx}
                  src={img}
                  alt={`thumb-${idx}`}
                  className={`w-20 h-20 object-contain border rounded-xl cursor-pointer shadow-sm transition-all duration-200 hover:scale-105 ${
                    mainImage === img ? "ring-2 ring-[#00A297]" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
          </div>
        </div>
        {/* Details */}
        <div className="flex-1 bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between">
          <StarRating product={product.star} />
          <h1 className="text-3xl font-extrabold text-[#00A297] mb-2 tracking-tight drop-shadow">
            {product.name}
          </h1>
          <div className="mb-4 text-gray-600 text-base">
            {product.description}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Brand:</span> {product.brand}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Stock:</span>{" "}
            <span className="text-[#00A297] font-bold">{product.stock}</span>
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
              <span className="line-through text-gray-400 ml-2">
                ${product.price}
              </span>
            )}
            <span className="text-[#00A297] font-bold text-2xl ml-2">
              ${product.discount || product.descount}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden w-24 h-12 bg-white shadow">
              <button
                className="flex-1 h-full flex items-center justify-center text-xl font-bold text-gray-700 hover:bg-[#00A297] hover:text-white transition"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                type="button"
              >
                &#8722;
              </button>
              <input
                type="text"
                className="w-8 text-center border-0 focus:ring-0 outline-none text-lg font-semibold bg-transparent"
                value={quantity}
                readOnly
              />
              <button
                className="flex-1 h-full flex items-center justify-center text-xl font-bold text-gray-700 hover:bg-[#00A297] hover:text-white transition"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                type="button"
              >
                &#43;
              </button>
            </div>
            <button
              onClick={() => addToCart(product)}
              className="flex-1 px-6 py-3 bg-[#00A297] text-white rounded-xl font-bold hover:bg-[#00897b] transition h-12 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#00A297]/40"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      {/* Reassurance Policies */}
      <div className="max-w-6xl mx-auto mt-8 mb-10">
        <div className="bg-[#fafafa] rounded-2xl shadow-xl divide-y divide-gray-200">
          <div className="flex items-center px-6 py-4">
            <FontAwesomeIcon
              icon={faLock}
              className="text-[#00A297] text-2xl mr-4"
            />
            <div>
              <div className="font-semibold">Security policy</div>
              <div className="text-gray-500 text-sm">
                (edit with the Customer Reassurance module)
              </div>
            </div>
          </div>
          <div className="flex items-center px-6 py-4">
            <FontAwesomeIcon
              icon={faTruck}
              className="text-[#00A297] text-2xl mr-4"
            />
            <div>
              <div className="font-semibold">Delivery policy</div>
              <div className="text-gray-500 text-sm">
                (edit with the Customer Reassurance module)
              </div>
            </div>
          </div>
          <div className="flex items-center px-6 py-4">
            <FontAwesomeIcon
              icon={faRotateLeft}
              className="text-[#00A297] text-2xl mr-4"
            />
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
