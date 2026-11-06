import { useState } from "react";

function ProductCard({ product, onAddToCart }) {
  const [isFavorite, setIsFavorite] = useState(false);
  if (!product) return null;
  const rating = product.rating?.rate;
  const reviewCount = product.rating?.count;
  const price = Number(product.price);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative flex h-52 items-center justify-center overflow-hidden bg-gray-50 p-5 sm:h-64 sm:p-7">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
        />
        {product.category && (
          <span className="absolute left-3 top-3 max-w-[70%] truncate rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 shadow-sm sm:left-4 sm:top-4">
            {product.category}
          </span>
        )}
        <button
          type="button"
          onClick={() => setIsFavorite((favorite) => !favorite)}
          aria-label={
            isFavorite
              ? `Remove ${product.title} from favorites`
              : `Add ${product.title} to favorites`
          }
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105 sm:right-4 sm:top-4 ${isFavorite ? "text-rose-500" : "text-gray-400 hover:text-rose-500"}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.8 8.7c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"
            />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 flex-col border-t border-gray-100 p-4 sm:p-5">
        <h2 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-gray-800 sm:text-base">
          {product.title}
        </h2>
        {rating != null && (
          <div
            className="mt-2 flex items-center gap-1.5 text-sm"
            aria-label={`${rating} out of 5 stars${reviewCount != null ? `, ${reviewCount} reviews` : ""}`}
          >
            <span className="text-amber-500" aria-hidden="true">
              ★
            </span>
            <span className="font-semibold text-gray-700">{rating}</span>
            {reviewCount != null && (
              <span className="text-gray-400">({reviewCount})</span>
            )}
          </div>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="text-lg font-extrabold text-teal-600">
            ${Number.isFinite(price) ? price.toFixed(2) : "0.00"}
          </span>
          <button
            type="button"
            onClick={() => onAddToCart?.(product)}
            className="rounded-xl bg-teal-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-200 sm:px-4 sm:text-sm"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
