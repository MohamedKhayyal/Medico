import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import "animate.css";
import { WishlistProvider } from "./components/WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <WishlistProvider>
      <App />
    </WishlistProvider>
  </AuthProvider>
);
