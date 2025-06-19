import { useEffect } from "react";
import Hero from "../../components/Hero";
import PopularCategories from "../../components/PopularCategories";
import ProductBanner from "../../components/ProductBanner";
import Promotional from "../../components/Promotional";
import Comments from "../../components/Comments";
import ServiceFeatures from "../../components/ServiceFeatures";
import LatestProducts from "../../components/LatestProducts";
import DealOfTheDay from "../../components/DealOfTheDay";

export default function Home() {
  useEffect(() => {
    document.title = "Medico";
  }, []);

  return (
    <div>
      <Hero />
      <ProductBanner />
      <PopularCategories />
      <LatestProducts title={"Latest Products"} />
      <DealOfTheDay />
      <Promotional />
      <LatestProducts title={"Featured Products"} />
      <ServiceFeatures />
      <Comments />
    </div>
  );
}
