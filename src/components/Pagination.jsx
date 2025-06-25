import React from "react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Helper to generate page numbers (show up to 5 pages, with ... if needed)
  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  // Scroll to top helper
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="flex justify-center items-center gap-2 mt-8 select-none">
      <button
        className="px-3 py-1 rounded border bg-white shadow text-sm font-medium hover:bg-[#00A297] hover:text-white transition disabled:opacity-50"
        onClick={() => {
          onPageChange(currentPage - 1);
          scrollToTop();
        }}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Prev
      </button>
      {getPages().map((page, idx) =>
        page === "..." ? (
          <span key={idx} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={page}
            className={`px-3 py-1 rounded border text-sm font-medium shadow transition ${
              page === currentPage
                ? "bg-[#00A297] text-white border-[#00A297]"
                : "bg-white hover:bg-[#00A297] hover:text-white border-gray-200"
            }`}
            onClick={() => {
              onPageChange(page);
              scrollToTop();
            }}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        )
      )}
      <button
        className="px-3 py-1 rounded border bg-white shadow text-sm font-medium hover:bg-[#00A297] hover:text-white transition disabled:opacity-50"
        onClick={() => {
          onPageChange(currentPage + 1);
          scrollToTop();
        }}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </nav>
  );
}
