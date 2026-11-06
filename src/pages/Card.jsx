import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const CART_KEY = "shopify-cart";

function readCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function Card() {
  const [items, setItems] = useState(readCart);

  useEffect(() => {
    const syncCart = () => setItems(readCart());
    window.addEventListener("storage", syncCart);
    window.addEventListener("shopify-cart-updated", syncCart);
    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("shopify-cart-updated", syncCart);
    };
  }, []);

  const updateCart = (nextItems) => {
    setItems(nextItems);
    localStorage.setItem(CART_KEY, JSON.stringify(nextItems));
    window.dispatchEvent(new Event("shopify-cart-updated"));
  };
  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + Number(item.price || 0) * item.quantity,
        0,
      ),
    [items],
  );
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const changeQuantity = (id, amount) =>
    updateCart(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    );
  const removeItem = (id) => updateCart(items.filter((item) => item.id !== id));

  return (
    <main className="min-h-screen bg-[#f1f8f7] text-gray-900">
      <section className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <div className="rounded-3xl bg-teal-50 px-7 py-10 sm:px-12 sm:py-12">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-teal-600">
            Your SHOPIFY bag
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Shopping cart
          </h1>
          <p className="mt-3 text-gray-600">
            {itemCount} {itemCount === 1 ? "item" : "items"} ready for you.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_360px] lg:py-14">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-14 text-center shadow-sm">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
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
              <h2 className="mt-5 text-2xl font-bold">Your cart is waiting</h2>
              <p className="mt-2 text-gray-500">
                Looks like you haven’t added anything just yet.
              </p>
              <Link
                to="/Product"
                className="mt-6 inline-flex rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
              >
                Explore products
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <article
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:p-5"
              >
                <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-gray-50 p-3 sm:h-28 sm:w-28">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">
                    {item.category}
                  </p>
                  <h2 className="mt-1 line-clamp-2 font-semibold leading-6">
                    {item.title}
                  </h2>
                  <p className="mt-2 font-bold text-teal-600">
                    ${Number(item.price).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <div className="inline-flex items-center rounded-xl border border-gray-200">
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, -1)}
                      aria-label={`Decrease quantity of ${item.title}`}
                      className="h-10 w-10 text-lg text-gray-600 hover:text-teal-600"
                    >
                      −
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, 1)}
                      aria-label={`Increase quantity of ${item.title}`}
                      className="h-10 w-10 text-lg text-gray-600 hover:text-teal-600"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-500 transition hover:bg-rose-50 hover:text-rose-600"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
        <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-7">
          <h2 className="text-xl font-bold">Order summary</h2>
          <div className="mt-6 flex justify-between text-sm text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span className="font-semibold text-emerald-600">
              {subtotal >= 75 || subtotal === 0
                ? "Free"
                : "Calculated at checkout"}
            </span>
          </div>
          <div className="mt-5 border-t border-gray-100 pt-5">
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span className="text-teal-600">${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <button
            type="button"
            disabled={items.length === 0}
            onClick={() => window.alert("Checkout is coming soon!")}
            className="mt-6 w-full rounded-xl bg-teal-600 px-5 py-3.5 font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            Continue to checkout →
          </button>
          <Link
            to="/Product"
            className="mt-4 block text-center text-sm font-semibold text-teal-600 hover:text-teal-800"
          >
            Continue shopping
          </Link>
        </aside>
      </section>
    </main>
  );
}

export default Card;
