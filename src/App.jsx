import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SignUp from "./pages/signup/SignUp";
import Login from "./pages/login/Login";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/signUp"
            index
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
        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </div>
  );
}
