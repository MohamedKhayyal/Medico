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
export default function App() {
  return (
    <div>
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
          <Route path="/" index element={<Home />} />
          <Route path="contact" index element={<ContactUs />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
