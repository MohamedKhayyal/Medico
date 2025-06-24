import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import Links from "../../components/Links";

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
      <Links page={"Contact us"} location={"Contact us"} linkTo={"/contact"} />
      <div className="min-h-screen px-4 md:px-16 lg:px-24 xl:px-32 py-4 bg-gradient-to-br from-white via-[#f7fafc] to-[#e0f7fa]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <aside className="bg-white rounded-2xl shadow-xl p-8 w-full md:w-1/3 h-fit md:sticky md:top-24 self-start border border-gray-200">
              <h2 className="text-2xl font-extrabold text-[#00A297] mb-6 tracking-tight drop-shadow">
                Store information
              </h2>
              <div className="flex items-start gap-3 mb-4">
                <span className="text-[#00A297] text-2xl">📍</span>
                <div>
                  <div className="font-semibold">Demo Store</div>
                  <div>507-Union Trade Center</div>
                  <div>123456</div>
                  <div>France</div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#00A297] text-2xl">📞</span>
                <div>
                  <div className="font-semibold">Call us:</div>
                  <div>(+91) 9876-543-210</div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#00A297] text-2xl">✉️</span>
                <div>
                  <div className="font-semibold">Email us:</div>
                  <div className="break-all">demo@example.com</div>
                </div>
              </div>
            </aside>

            {/* Contact Form */}
            <form
              className="bg-white rounded-2xl shadow-xl p-8 flex-1 border border-gray-200"
              onSubmit={handleSubmit}
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
                <label
                  className="font-semibold md:text-right"
                  htmlFor="subject"
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="col-span-3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 transition"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option>Customer service</option>
                  <option>Technical support</option>
                  <option>Billing</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
                <label className="font-semibold md:text-right" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="col-span-3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 transition"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center mb-4">
                <label
                  className="font-semibold md:text-right"
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
                    className="bg-[#00A297] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#00897b] transition shadow"
                  >
                    CHOOSE FILE
                  </label>
                  <span className="text-gray-500 text-sm">optional</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start mb-4">
                <label
                  className="font-semibold md:text-right mt-2"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help?"
                  rows={4}
                  className="col-span-3 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#00A297] focus:ring-2 focus:ring-[#00A297]/30 transition"
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
                  className="mr-2 accent-[#00A297]"
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
                  className="bg-[#00A297] hover:bg-[#00897b] text-white font-bold px-8 py-3 rounded-xl shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-[#00A297]/40 transition"
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
