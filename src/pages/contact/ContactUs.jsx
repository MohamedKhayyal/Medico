import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

export default function ContactUs() {
  const Navigate = useNavigate();
  useEffect(() => {
    document.title = "Contact us";
  }, []);

  const [formData, setFormData] = useState({
    subject: "Customer service",
    email: "",
    message: "",
    agree: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      toast.error("Please agree to the terms and conditions.", {
        position: "bottom-center",
      });
      return;
    }

    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        timestamp: serverTimestamp(),
      });
      toast.success("Message sent successfully!", {
        position: "top-center",
      });
      setFormData({
        subject: "Customer service",
        email: "",
        message: "",
        agree: false,
      });
    } catch (err) {
      toast.error("Please SignUp to Send The Message", {
        position: "bottom-center",
      });
      Navigate("/signUp");
    }
  };

  return (
    <>
      <div className="w-full flex justify-between items-center mb-10 bg-[#eaf7f7] px-4 md:px-16 lg:px-24 xl:px-32 py-5">
        <h1 className="text-3xl font-bold">Contact us</h1>
        <nav className="text-gray-600">
          <Link to="/" className="mr-2 hover:underline text-black">
            Home
          </Link>
          <span className="mx-1">|</span>
          <Link to="/contact" className="ml-2 hover:underline">
            Contact us
          </Link>
        </nav>
      </div>
      <div className=" min-h-screen px-4 md:px-16 lg:px-24 xl:px-32 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar: Store Information */}
            <aside className="bg-white rounded-lg shadow p-6 w-full md:w-1/3 h-fit md:sticky md:top-24 self-start">
              <h2 className="text-xl font-semibold mb-6">Store information</h2>
              <div className="flex items-start gap-3 mb-4">
                <span className="text-teal-500 text-2xl">📍</span>
                <div>
                  <div className="font-medium">Demo Store</div>
                  <div>507-Union Trade Center</div>
                  <div>123456</div>
                  <div>France</div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-teal-500 text-2xl">📞</span>
                <div>
                  <div className="font-medium">Call us:</div>
                  <div>(+91) 9876-543-210</div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-teal-500 text-2xl">✉️</span>
                <div>
                  <div className="font-medium">Email us:</div>
                  <div className="break-all">demo@example.com</div>
                </div>
              </div>
            </aside>

            {/* Contact Form */}
            <form
              className="bg-white rounded-lg shadow p-6 flex-1"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
                <label className="font-medium md:text-right" htmlFor="subject">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="col-span-3 border rounded px-3 py-2 focus:outline-teal-400"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option>Customer service</option>
                  <option>Technical support</option>
                  <option>Billing</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
                <label className="font-medium md:text-right" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="col-span-3 border rounded px-3 py-2 focus:outline-teal-400"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
                <label
                  className="font-medium md:text-right"
                  htmlFor="attachment"
                >
                  Attachment
                </label>
                <div className="col-span-3 flex items-center gap-2">
                  <input
                    id="attachment"
                    name="attachment"
                    type="file"
                    className="hidden"
                  />
                  <label
                    htmlFor="attachment"
                    className="bg-[#00A297] text-white px-4 py-2 rounded cursor-pointer hover:bg-teal-600"
                  >
                    CHOOSE FILE
                  </label>
                  <span className="text-gray-500 text-sm">optional</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start mb-4">
                <label
                  className="font-medium md:text-right mt-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help?"
                  rows={4}
                  className="col-span-3 border rounded px-3 py-2 focus:outline-teal-400"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center mb-6">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  className="mr-2"
                  checked={formData.agree}
                  onChange={handleChange}
                  required
                />

                <label htmlFor="agree" className="text-sm">
                  I agree to the terms and conditions and the privacy policy
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#00A297] hover:bg-[#0d0d0d] text-white font-semibold px-8 py-2 rounded"
                >
                  SEND
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
