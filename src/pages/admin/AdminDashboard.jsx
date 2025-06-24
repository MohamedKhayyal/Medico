import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";

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
    await deleteDoc(doc(db, "Medico", id));
    setProducts(products.filter((product) => product.id !== id));
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
