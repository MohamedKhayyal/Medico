import { useEffect } from "react";
import Hero from "../../components/Hero";
import PopularCategories from "../../components/PopularCategories";
import ProductBanner from "../../components/ProductBanner";
import Promotional from "../../components/Promotional";
import Comments from "../../components/Comments";

export default function Home() {
  useEffect(() => {
    document.title = "Medico";
  }, []);

  return (
    <div>
      <Hero />
      <ProductBanner />
      <PopularCategories />
      <Promotional />
      <Comments/>
    </div>
  );
}
