import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user, loading } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem("cart");
      setCart(saved ? JSON.parse(saved) : []);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (product, quantity = 1) => {
    if (!user) {
      toast.warning("Please log in to add items to cart");
      return;
    }

    setCart((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].quantity += quantity;
        toast.success("Increased quantity in cart");
        return updated;
      }

      toast.success("Added to cart");
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.info("Removed from cart");
  };

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
    toast.info("Cart updated");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
