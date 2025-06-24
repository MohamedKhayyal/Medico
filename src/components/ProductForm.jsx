import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../firebase/firebaseConfig";
import Loading from "./Loading";

export default function ProductForm() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    discount: "",
    brand: "",
    stock: "",
    star: "",
    description: "",
    cover: "",
    image1: "",
    image2: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "Medico"), {
        name: form.name,
        price: parseFloat(form.price),
        discount: parseFloat(form.discount),
        brand: form.brand,
        stock: parseInt(form.stock),
        star: parseFloat(form.star),
        description: form.description,
        cover: form.cover,
        image1: form.image1,
        image2: form.image2,
      });

      toast.success(" Product added successfully!");
      setForm({
        name: "",
        price: "",
        discount: "",
        brand: "",
        stock: "",
        star: "",
        description: "",
        cover: "",
        image1: "",
        image2: "",
      });
    } catch (err) {
      toast.error(" Failed to add product. Please try again.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 p-8 border border-gray-200 rounded-2xl bg-gradient-to-br from-white via-[#f7fafc] to-[#e0f7fa] shadow-xl max-w-2xl mx-auto my-10 animate-fade-in"
    >
      <h2 className="text-2xl font-extrabold text-[#00A297] mb-6 text-center tracking-tight drop-shadow">
        Add New Product
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border border-gray-300 focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 rounded-lg p-3 w-full transition outline-none shadow-sm bg-white"
          required
        />
        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="border border-gray-300 focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 rounded-lg p-3 w-full transition outline-none shadow-sm bg-white"
          required
        />
        <input
          name="discount"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount"
          type="number"
          className="border border-gray-300 focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 rounded-lg p-3 w-full transition outline-none shadow-sm bg-white"
        />
        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="border border-gray-300 focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 rounded-lg p-3 w-full transition outline-none shadow-sm bg-white"
        />
        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          type="number"
          className="border border-gray-300 focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 rounded-lg p-3 w-full transition outline-none shadow-sm bg-white"
        />
        <input
          name="star"
          value={form.star}
          onChange={handleChange}
          placeholder="Star (1 to 5)"
          type="number"
          className="border border-gray-300 focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 rounded-lg p-3 w-full transition outline-none shadow-sm bg-white"
        />
        <input
          name="cover"
          value={form.cover}
          onChange={handleChange}
          placeholder="Cover Image URL"
          className="border border-gray-300 focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 rounded-lg p-3 w-full transition outline-none shadow-sm bg-white col-span-1 md:col-span-2"
          required
        />
        <input
          name="image1"
          value={form.image1}
          onChange={handleChange}
          placeholder="Image 1 URL"
          className="border border-gray-300 focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 rounded-lg p-3 w-full transition outline-none shadow-sm bg-white"
          required
        />
        <input
          name="image2"
          value={form.image2}
          onChange={handleChange}
          placeholder="Image 2 URL"
          className="border border-gray-300 focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 rounded-lg p-3 w-full transition outline-none shadow-sm bg-white"
          required
        />
      </div>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border border-gray-300 focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 rounded-lg p-3 w-full transition outline-none shadow-sm bg-white min-h-[90px] resize-y"
      />
      <button
        disabled={loading}
        className="bg-[#00A297] hover:bg-[#00897b] transition text-white px-6 py-3 rounded-xl w-full font-semibold text-lg shadow-lg hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#00A297]/40 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? <Loading message="Adding" /> : "Add Product"}
      </button>
    </form>
  );
}
