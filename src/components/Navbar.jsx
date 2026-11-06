import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/About" },
  { label: "Products", to: "/Product" },
  { label: "Contact", to: "/Contact" },
];
const CART_KEY = "shopify-cart";

function readCart() {
  try {
    const value = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(readCart);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const syncCart = () => setCartItems(readCart());
    window.addEventListener("storage", syncCart);
    window.addEventListener("shopify-cart-updated", syncCart);
    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("shopify-cart-updated", syncCart);
    };
  }, []);

  useEffect(() => {
    if (!cartOpen) return undefined;
    const handleEscape = (event) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [cartOpen]);

  const itemCount = useMemo(
    () =>
      cartItems.reduce((total, item) => total + Number(item.quantity || 0), 0),
    [cartItems],
  );
  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + Number(item.price || 0) * Number(item.quantity || 0),
        0,
      ),
    [cartItems],
  );
  const removeCartItem = (id) => {
    const nextItems = cartItems.filter((item) => item.id !== id);
    setCartItems(nextItems);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(nextItems));
      window.dispatchEvent(new Event("shopify-cart-updated"));
    } catch {
      // Keep the drawer usable if browser storage is unavailable.
    }
  };

  const closeMenu = () => setMenuOpen(false);
  const handleSearch = (event) => {
    event.preventDefault();
    const query = search.trim();
    if (!query) return;
    navigate(`/Product?search=${encodeURIComponent(query)}`);
    closeMenu();
  };

  const searchForm = (id, mobile = false) => (
    <form
      onSubmit={handleSearch}
      role="search"
      className={
        mobile
          ? "relative mt-4 md:hidden"
          : "relative hidden w-full max-w-sm md:block"
      }
    >
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <input
        id={id}
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search products..."
        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-11 text-sm outline-none transition placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
      />
      <button
        type="submit"
        aria-label="Search products"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-500 transition hover:bg-teal-50 hover:text-teal-600"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.2 4.2" />
        </svg>
      </button>
    </form>
  );

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 text-gray-800 shadow-sm backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="Shopify home"
            className="inline-flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-xl font-extrabold text-white shadow-md shadow-teal-200">
              S
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              SHOP<span className="text-teal-600">IFY</span>
            </span>
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex"
          >
            {navItems.map((item) => {
              const active =
                location.pathname.toLowerCase() === item.to.toLowerCase();
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${active ? "bg-teal-50 text-teal-700" : "text-gray-600 hover:bg-gray-50 hover:text-teal-600"}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {searchForm("desktop-product-search")}

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open shopping cart${itemCount ? `, ${itemCount} items` : ""}`}
              title="Shopping cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-teal-50 hover:text-teal-600"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.5L21 9H6"
                />
                <circle cx="10" cy="20" r="1" />
                <circle cx="18" cy="20" r="1" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-600 px-1 text-[10px] font-bold text-white">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </button>
            <Link
              to="/Login"
              className="hidden rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700 sm:inline-flex"
            >
              Sign in
            </Link>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-700 transition hover:bg-gray-50 lg:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
                aria-hidden="true"
              >
                {menuOpen ? (
                  <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
                ) : (
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-gray-100 bg-white px-5 pb-5 pt-3 shadow-lg lg:hidden">
            <nav
              aria-label="Mobile navigation"
              className="mx-auto flex max-w-7xl flex-col gap-1"
            >
              {navItems.map((item) => {
                const active =
                  location.pathname.toLowerCase() === item.to.toLowerCase();
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className={`rounded-xl px-4 py-3 font-semibold transition ${active ? "bg-teal-50 text-teal-700" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/Login"
                onClick={closeMenu}
                className="mt-2 rounded-xl bg-teal-600 px-4 py-3 text-center font-semibold text-white"
              >
                Sign in
              </Link>
            </nav>
            {searchForm("mobile-product-search", true)}
          </div>
        )}
      </header>
      {cartOpen && (
        <div className="fixed inset-0 z-[70]" role="presentation">
          <button
            type="button"
            aria-label="Close shopping cart"
            onClick={() => setCartOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-gray-950/40 backdrop-blur-[2px]"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6">
              <div>
                <h2 id="cart-drawer-title" className="text-xl font-extrabold">
                  Your bag
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close shopping cart"
                className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                ×
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    className="h-8 w-8"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 1.9-1.5L21 9H6"
                    />
                    <circle cx="10" cy="20" r="1" />
                    <circle cx="18" cy="20" r="1" />
                  </svg>
                </span>
                <h3 className="mt-5 text-lg font-bold">Your bag is empty</h3>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Find something you love and it will show up here.
                </p>
                <Link
                  to="/Product"
                  onClick={() => setCartOpen(false)}
                  className="mt-6 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                >
                  Browse products
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
                  {cartItems.map((item) => (
                    <article
                      key={item.id}
                      className="flex gap-4 border-b border-gray-100 pb-4"
                    >
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-gray-50 p-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-sm font-semibold leading-5">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs capitalize text-gray-500">
                          {item.category}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="font-bold text-teal-700">
                            $
                            {(
                              Number(item.price) * Number(item.quantity || 1)
                            ).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500">
                            Qty {item.quantity || 1}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeCartItem(item.id)}
                        aria-label={`Remove ${item.title}`}
                        className="self-start rounded-lg px-2 py-1 text-lg leading-none text-gray-400 hover:bg-rose-50 hover:text-rose-600"
                      >
                        ×
                      </button>
                    </article>
                  ))}
                </div>
                <div className="border-t border-gray-100 bg-white px-5 py-5 sm:px-6">
                  <div className="mb-4 flex justify-between text-base">
                    <span className="font-semibold text-gray-600">
                      Subtotal
                    </span>
                    <span className="font-extrabold text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="mb-4 text-xs text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Link
                    to="/Card"
                    onClick={() => setCartOpen(false)}
                    className="block rounded-xl bg-teal-600 px-5 py-3.5 text-center font-semibold text-white transition hover:bg-teal-700"
                  >
                    View cart <span aria-hidden="true">→</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="mt-3 w-full rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}

export default Navbar;
