export function sortProducts(products, sort) {
  if (sort === "low") {
    return [...products].sort(
      (a, b) => (Number(a.discount) || 0) - (Number(b.discount) || 0)
    );
  } else if (sort === "high") {
    return [...products].sort(
      (a, b) => (Number(b.discount) || 0) - (Number(a.discount) || 0)
    );
  } else if (sort === "newest") {
    return [...products].sort(
      (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
    );
  }
  return products;
}

export default function SidebarFilters({
  brands = [],
  sort,
  setSort,
  selectedBrand,
  setSelectedBrand,
  clearFilters,
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <aside
      className={`z-40 bg-white border rounded-lg p-0 shadow w-72 fixed top-0 left-0 h-full transition-transform duration-300 lg:static lg:top-auto lg:left-auto lg:h-auto lg:sticky lg:self-start lg:mt-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } ${sidebarOpen ? "block" : "hidden"} lg:block`}
      style={{ minWidth: 320, top: "1rem" }}
    >
      <div
        className="flex items-center justify-between border-b px-6 py-4"
        style={{ borderColor: "#00A297" }}
      >
        <span className="font-bold text-xl tracking-wide">FILTERS</span>
        <button
          className="text-sm text-[#00A297] font-semibold hover:underline lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          HIDE
        </button>
        <button
          className="text-sm text-[#00A297] font-semibold hover:underline hidden lg:block"
          onClick={clearFilters}
        >
          CLEAR
        </button>
      </div>
      <div className="px-6 py-4 flex flex-col gap-6">
        <div>
          <div className="font-semibold mb-2">Sort by Brand</div>
          <select
            className="w-full border rounded px-2 py-2"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="font-semibold mb-2">Sort By</div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                value="low"
                checked={sort === "low"}
                onChange={() => setSort("low")}
                className="accent-[#00A297]"
              />
              Price Low to High
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                value="high"
                checked={sort === "high"}
                onChange={() => setSort("high")}
                className="accent-[#00A297]"
              />
              Price High to Low
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="sort"
                value="newest"
                checked={sort === "newest"}
                onChange={() => setSort("newest")}
                className="accent-[#00A297]"
              />
              Newest First
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
}
