import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useAuth } from "./AuthContext";

export default function ProductCollection({
  collectionName = "Medico",
  limit = 7,
  children,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const items = [];
        querySnapshot.forEach((doc) =>
          items.push({ id: doc.id, ...doc.data() })
        );
        const shuffled = items.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, limit));
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collectionName, limit, authLoading]);

  return children({
    products,
    loading: loading || authLoading,
  });
}
