import { useEffect, useState } from "react";
import ProductCollection from "../../components/ProductCollection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import SidebarFilters, { sortProducts } from "../../components/SidebarFilters";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../components/CartContext";
import { useWishlist } from "../../components/WishlistContext";
import StarRating from "../../components/StarRating";
import Links from "../../components/Links";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Medcine() {
  const [hovered, setHovered] = useState(null);
  const [sort, setSort] = useState("low");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const query = useQuery();
  const searchQuery = query.get("search")?.toLowerCase() || "";

  const clearFilters = () => {
    setSort("low");
    setSelectedBrand("");
  };

  useEffect(() => {
    document.title = "Medicines";
  }, []);

  return (
    <>
      <Links page={"medicine"} location={"Medicines"} linkTo={"/medicines"} />
      <div className="flex p-4 gap-4 relative lg:flex-row flex-col mb-10">
        {!sidebarOpen && (
          <div className="block lg:hidden w-72 mb-4">
            <div className="border rounded-lg bg-white flex items-center justify-between px-6 py-4">
              <span className="font-bold text-xl tracking-wide">FILTERS</span>
              <button
                className="text-sm text-[#00A297] font-semibold hover:underline"
                onClick={() => setSidebarOpen(true)}
              >
                SHOW
              </button>
            </div>
          </div>
        )}
        {sidebarOpen && (
          <div
            className="sticky lg:hidden inset-0 bg-black/30 z-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        <ProductCollection collectionName="Medico" limit={100}>
          {({ products, loading }) => {
            const brands = Array.from(
              new Set(products.map((p) => p.brand).filter(Boolean))
            );
            let filtered = products;
            if (selectedBrand) {
              filtered = filtered.filter((p) => p.brand === selectedBrand);
            }
            if (searchQuery) {
              filtered = filtered.filter((p) =>
                p.name?.toLowerCase().includes(searchQuery)
              );
            }
            filtered = sortProducts(filtered, sort);
            return (
              <>
                <SidebarFilters
                  brands={brands}
                  sort={sort}
                  setSort={setSort}
                  selectedBrand={selectedBrand}
                  setSelectedBrand={setSelectedBrand}
                  clearFilters={clearFilters}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                <div className="flex-1 ml-0 lg:ml-0">
                  {loading ? (
                    <div>Loading...</div>
                  ) : filtered.length === 0 ? (
                    <div>No medicines found.</div>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: 24,
                      }}
                    >
                      {filtered.map((product) => (
                        <div
                          key={product.id}
                          className="flex flex-col items-center border border-gray-200 bg-white rounded-lg p-4 h-full relative group transition-shadow hover:shadow-lg cursor-pointer"
                          onMouseEnter={() => setHovered(product.id)}
                          onMouseLeave={() => setHovered(null)}
                        >
                          <Link
                            className="relative w-55 h-55 mb-4 mx-auto flex items-center justify-center"
                            to={`/details/${product.id}`}
                          >
                            <img
                              loading="lazy"
                              src={product.cover}
                              alt={product.name}
                              className={`absolute top-0 left-0 w-full h-full object-contain transition-all duration-400 ${
                                hovered === product.id
                                  ? "opacity-0 scale-95"
                                  : "opacity-100 scale-100"
                              }`}
                            />
                            <img
                              loading="lazy"
                              src={product.image1}
                              alt={product.name}
                              className={`absolute top-0 left-0 w-full h-full object-contain transition-all duration-400 ${
                                hovered === product.id
                                  ? "opacity-100 scale-100"
                                  : "opacity-0 scale-105"
                              }`}
                            />
                          </Link>

                          <div
                            className={`absolute top-0 right-3 transition-all duration-300 z-10 ${
                              hovered === product.id
                                ? "translate-y-3 opacity-100"
                                : "-translate-y-8 opacity-0"
                            }`}
                          >
                            <button
                              onClick={() =>
                                isInWishlist(product.id)
                                  ? removeFromWishlist(product.id)
                                  : addToWishlist(product)
                              }
                              className={`bg-transparent border rounded-full p-2 shadow transition duration-300 ${
                                isInWishlist(product.id)
                                  ? " hover:text-white hover:bg-[red] border-gray-300"
                                  : "border-gray-300 hover:bg-[#00A297] hover:text-white"
                              }`}
                            >
                              <FontAwesomeIcon icon={farHeart} />
                            </button>
                          </div>
                          <StarRating product={product.star} />
                          <div className="text-center font-medium text-gray-800 mb-1 min-h-[48px]">
                            {product.name}
                          </div>

                          <div className="flex items-center gap-2 mb-1">
                            <span className="line-through text-gray-400 text-base">
                              {product.price ? `$${product.price}` : ""}
                            </span>
                            <span className="text-[#00A297] font-bold text-xl">
                              ${product.discount || product.descount}
                            </span>
                          </div>

                          <button
                            onClick={() => addToCart(product)}
                            className="cursor-pointer w-full py-2 rounded bg-gray-100 font-semibold text-gray-800 hover:bg-[#00A297] hover:text-white transition mb-2"
                          >
                            ADD TO CART
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            );
          }}
        </ProductCollection>
      </div>
    </>
  );
}
