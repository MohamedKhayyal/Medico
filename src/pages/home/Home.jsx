import Hero from "../../components/Hero";
import PopularCategories from "../../components/PopularCategories";
import ProductBanner from "../../components/ProductBanner";
import Promotional from "../../components/Promotional";

export default function Home() {
  return (
    <div>
      <Hero />
      <ProductBanner />
      <PopularCategories />
      <Promotional />
    </div>
  );
}
