import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "Medico"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    };
    fetchProducts();
  }, []);
  useEffect(() => {
    document.title = "Admin Dashboard";
  }, []);

  const handleDelete = async (id) => {
    toast(
      ({ closeToast }) => (
        <div className="p-6 rounded-2xl bg-white shadow-xl max-w-xs mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-red-500 text-xl"
            />
            <span className="text-xl font-extrabold text-[#00A297]">
              Delete Confirmation
            </span>
          </div>
          <p className="text-base font-semibold text-gray-800 mb-5">
            Are you sure you want to delete this product?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={async () => {
                await deleteDoc(doc(db, "Medico", id));
                setProducts((prev) =>
                  prev.filter((product) => product.id !== id)
                );
                closeToast();
                toast.success("Product deleted successfully", {
                  position: "top-center",
                  icon: "🗑️",
                  className:
                    "!bg-white !text-[#00A297] font-bold !rounded-2xl !shadow-xl",
                });
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl font-semibold shadow focus:outline-none focus:ring-2 focus:ring-red-400/40 transition"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => closeToast()}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2 rounded-xl font-semibold shadow focus:outline-none focus:ring-2 focus:ring-gray-400/40 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
        toastId: `confirm-delete-${id}`,
        className: "!rounded-2xl !border-2 border-[#00A297] !p-0 !bg-white",
        bodyClassName: "!p-0",
      }
    );
  };

  return (
    <div className="p-5 min-h-screen bg-gradient-to-br from-white via-[#f7fafc] to-[#e0f7fa]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-[#00A297] mb-8 text-center tracking-tight drop-shadow">
          🛠 Admin Dashboard
        </h1>
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/admin/add")}
            className="bg-[#00A297] hover:bg-[#00897b] text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-[#00A297]/40"
          >
            + Add product
          </button>
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 p-5 rounded-2xl bg-white shadow-xl flex flex-col items-center hover:shadow-2xl transition duration-200 group"
            >
              {product.cover && (
                <img
                  loading="lazy"
                  src={product.cover}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg mb-3 border border-gray-100 shadow group-hover:scale-105 transition"
                />
              )}
              <h2 className="text-lg font-bold text-gray-800 mb-1 text-center truncate w-full">
                {product.name}
              </h2>
              <p className="text-[#00A297] font-semibold mb-2">
                Price: {product.discount || product.descount || 0} $
              </p>
              <div className="flex gap-2 mt-auto w-full">
                <button
                  onClick={() => navigate(`/admin/edit/${product.id}`)}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 transition text-white px-3 py-1 rounded-lg font-medium shadow focus:outline-none focus:ring-2 focus:ring-yellow-400/40"
                >
                  ✏ Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 rounded-lg font-medium shadow focus:outline-none focus:ring-2 focus:ring-red-400/40"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
