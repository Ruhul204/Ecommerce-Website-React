import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "./ProductCard";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState("All products");
  const [sort, setSort] = useState("featured");
  const [cartCount, setCartCount] = useState(0);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search")?.trim().toLowerCase() || "";

  useEffect(() => {
    let isMounted = true;
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Could not load products");
        return res.json();
      })
      .then((data) => {
        if (isMounted) setProducts(data);
      })
      .catch(() => {
        if (isMounted) setError(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(
    () => ["All products", ...new Set(products.map((item) => item.category))],
    [products],
  );
  const visibleProducts = useMemo(() => {
    const filtered = products.filter((item) => {
      const matchesCategory =
        category === "All products" || item.category === category;
      const matchesSearch =
        !searchQuery ||
        `${item.title} ${item.category}`.toLowerCase().includes(searchQuery);
      return matchesCategory && matchesSearch;
    });
    if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);
    if (sort === "rating")
      filtered.sort((a, b) => b.rating.rate - a.rating.rate);
    return filtered;
  }, [products, category, sort, searchQuery]);

  const handleAddToCart = (product) => {
    try {
      const savedCart = JSON.parse(
        localStorage.getItem("shopify-cart") || "[]",
      );
      const cart = Array.isArray(savedCart) ? savedCart : [];
      const existing = cart.find((item) => item.id === product.id);
      const nextCart = existing
        ? cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        : [...cart, { ...product, quantity: 1 }];
      localStorage.setItem("shopify-cart", JSON.stringify(nextCart));
      window.dispatchEvent(new Event("shopify-cart-updated"));
    } catch {
      // Keep the product page usable if browser storage is unavailable.
    }
    setCartCount((count) => count + 1);
  };

  return (
    <main className="min-h-screen bg-[#f1f8f7] text-gray-900">
      <section className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-teal-50 px-7 py-11 sm:px-12 sm:py-14">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-teal-600">
              The SHOPIFY collection
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Products for{" "}
              <span className="text-teal-600">everyday living.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Explore our curated collection of useful, well-designed favorites,
              chosen to bring a little more joy to your day.
            </p>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-gray-600">
              <span>
                <strong className="text-gray-900">Free shipping</strong> over
                $75
              </span>
              <span>
                <strong className="text-gray-900">Easy returns</strong> within
                30 days
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-teal-600">
              Our collection
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
              {searchQuery ? `Results for “${searchParams.get("search")?.trim()}”` : "Find your new favorite"}
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {loading
                ? "Finding the good stuff…"
                : `${visibleProducts.length} products to explore`}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex gap-2 overflow-x-auto pb-1 sm:max-w-xl">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${category === item ? "bg-teal-600 text-white shadow-md shadow-teal-100" : "border border-gray-200 bg-white text-gray-600 hover:border-teal-200 hover:text-teal-600"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="sr-only" htmlFor="product-sort">
              Sort products
            </label>
            <select
              id="product-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-100"
            >
              <option value="featured">Featured</option>
              <option value="rating">Top rated</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
            </select>
          </div>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700"
          >
            We couldn’t load the collection just now. Please refresh the page to
            try again.
          </div>
        )}
        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 bg-white"
              >
                <div className="h-48 bg-gray-100 sm:h-64" />
                <div className="space-y-3 p-4">
                  <div className="h-3 w-1/3 rounded bg-gray-100" />
                  <div className="h-4 w-4/5 rounded bg-gray-100" />
                  <div className="h-9 rounded-lg bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && visibleProducts.length === 0 && (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center text-gray-500">
            No products in this category yet.
          </div>
        )}
        {!loading && !error && visibleProducts.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
        {!loading && !error && visibleProducts.length > 0 && (
          <p className="mt-8 text-center text-sm text-gray-500">
            {cartCount > 0
              ? `${cartCount} ${cartCount === 1 ? "item" : "items"} added to your bag`
              : "A little something for every day."}
          </p>
        )}
      </section>
    </main>
  );
}

export default Product;

