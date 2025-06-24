import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home/Home";
import ContactUs from "./pages/contact/ContactUs";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Medcine from "./pages/products/Medcine";
import Details from "./pages/details/Details";
import { CartProvider } from "./components/CartContext";
import Cart from "./pages/cart/Cart";
import Wishlist from "./pages/wishlist/Wishlist";
import NotFound from "./pages/not found/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";

export default function App() {
  return (
    <CartProvider>
      <ScrollToTopButton />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/signUp"
            element={
              <ProtectedRoute>
                <SignUp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/medicines" element={<Medcine />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/edit/:id"
            element={
              <AdminRoute>
                <EditProduct />
              </AdminRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
