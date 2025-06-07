import Hero from "../../components/Hero";
import PopularCategories from "../../components/PopularCategories";
import ProductBanner from "../../components/ProductBanner";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <ProductBanner/>
      <PopularCategories/>
    </div>
  );
}
