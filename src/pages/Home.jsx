import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Classic everyday shirt",
    category: "Clothing",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=85",
  },
  {
    id: 2,
    name: "Studio headphones",
    category: "Electronics",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=85",
  },
  {
    id: 3,
    name: "Gold pendant necklace",
    category: "Jewelry",
    price: 76,
    image:
      "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=700&q=85",
  },
  {
    id: 4,
    name: "Modern mirrorless camera",
    category: "Electronics",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&q=85",
  },
  {
    id: 5,
    name: "Relaxed fit denim jacket",
    category: "Clothing",
    price: 68,
    image:
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=700&q=85",
  },
  {
    id: 6,
    name: "Minimal gold earrings",
    category: "Jewelry",
    price: 54,
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700&q=85",
  },
];
const categories = [
  {
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=85",
  },
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=85",
  },
  {
    name: "Jewelry",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85",
  },
];

function Home() {
  const [showBanner, setShowBanner] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  return (
    <main className="min-h-screen bg-[#f1f8f7] text-gray-900">
      <section className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-teal-50">
          <div className="grid min-h-[470px] items-center md:grid-cols-2">
            <div className="relative z-10 px-7 py-14 sm:px-12 lg:px-16">
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-teal-700">
                The new season edit
              </span>
              <h1 className="mt-6 max-w-xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Everyday essentials,{" "}
                <span className="text-teal-600">thoughtfully chosen.</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
                Discover considered pieces for your home, wardrobe, and
                everything in between.
              </p>
              {showBanner && (
                <p className="mt-3 max-w-lg text-sm leading-6 text-gray-600">
                  Quality you can feel, design you can live with. Find your next
                  favorite from our curated collection.
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/Product"
                  className="rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-teal-200 transition hover:bg-teal-700"
                >
                  Shop collection <span aria-hidden="true">→</span>
                </Link>
                <button
                  onClick={() => setShowBanner(!showBanner)}
                  className="rounded-xl border border-gray-200 bg-white px-6 py-3.5 font-semibold text-gray-800 transition hover:border-teal-300"
                >
                  {showBanner ? "Show less" : "Discover more"}
                </button>
              </div>
              <div className="mt-10 flex items-center gap-3 text-sm text-gray-600">
                <span className="flex -space-x-2">
                  <span className="h-8 w-8 rounded-full border-2 border-teal-50 bg-amber-200" />
                  <span className="h-8 w-8 rounded-full border-2 border-teal-50 bg-rose-200" />
                  <span className="h-8 w-8 rounded-full border-2 border-teal-50 bg-emerald-200" />
                </span>
                <span>
                  <strong className="text-gray-900">2,400+</strong> happy
                  customers
                </span>
              </div>
            </div>
            <div className="relative min-h-72 md:absolute md:inset-y-0 md:right-0 md:w-[48%]">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=90"
                alt="A curated selection of seasonal fashion"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent md:bg-gradient-to-r md:from-teal-50 md:via-teal-50/20 md:to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[.18em] text-teal-600">
              Find your fit
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Shop by category
            </h2>
          </div>
          <Link
            to="/Product"
            className="hidden font-semibold text-teal-600 hover:text-teal-800 sm:block"
          >
            View everything →
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {categories.map((item) => (
            <Link
              to="/Product"
              key={item.name}
              className="group relative h-64 overflow-hidden rounded-2xl bg-gray-200 sm:h-80"
            >
              <img
                src={item.image}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-2xl font-bold">{item.name}</h3>
                <span className="mt-1 inline-block text-sm text-white/80">
                  Explore collection →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.18em] text-teal-600">
                Handpicked for you
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Featured favorites
              </h2>
            </div>
            <Link
              to="/Product"
              className="font-semibold text-teal-600 hover:text-teal-800"
            >
              Shop all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:-translate-y-1 hover:shadow-xl"
              >
                <Link to="/Product" className="block">
                  <div className="relative flex h-48 items-center justify-center bg-gray-50 p-4 sm:h-64">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-600 shadow-sm">
                      Popular
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <p className="text-xs font-medium text-gray-500">
                      {product.category}
                    </p>
                    <h3 className="mt-1 line-clamp-1 font-semibold">
                      {product.name}
                    </h3>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-teal-600">
                        ${product.price}
                      </span>
                      <span className="text-sm text-amber-500">★★★★★</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <div className="overflow-hidden rounded-3xl bg-gray-900 text-white">
          <div className="grid items-center md:grid-cols-2">
            <div className="px-7 py-12 sm:px-12 lg:px-16">
              <span className="text-sm font-bold uppercase tracking-[.2em] text-teal-300">
                A little something extra
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
                Good things are better with{" "}
                <span className="text-teal-300">20% off.</span>
              </h2>
              <p className="mt-4 max-w-md leading-7 text-gray-300">
                Get 20% off your first order when you join our community.
                Thoughtful finds, delivered to your door.
              </p>
              <Link
                to="/Product"
                className="mt-7 inline-flex rounded-xl bg-white px-6 py-3.5 font-semibold text-gray-900 transition hover:bg-teal-100"
              >
                Explore the offer →
              </Link>
            </div>
            <img
              className="h-64 w-full object-cover md:h-full"
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000&q=85"
              alt="A bright, welcoming retail boutique"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white px-5 py-12 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            A more thoughtful way to shop
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-600">
            We bring together useful, well-made products and a friendly shopping
            experience.{" "}
            {showAbout &&
              "Every pick is made with quality, considered design, and everyday value in mind."}
          </p>
          <button
            onClick={() => setShowAbout(!showAbout)}
            className="mt-4 font-semibold text-teal-600 hover:text-teal-800"
          >
            {showAbout ? "Read less" : "Read our story →"}
          </button>
        </div>
      </section>
      <footer className="bg-gray-950 px-5 py-9 text-center text-sm text-gray-400">
        <p className="text-xl font-extrabold tracking-tight text-white">
          SHOP<span className="text-teal-400">IFY</span>
        </p>
        <p className="mt-2">Good finds for everyday life.</p>
        <nav className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link to="/" className="hover:text-white">
            Home
          </Link>
          <Link to="/About" className="hover:text-white">
            About
          </Link>
          <Link to="/Product" className="hover:text-white">
            Products
          </Link>
          <Link to="/Contact" className="hover:text-white">
            Contact
          </Link>
        </nav>
        <p className="mt-6 text-gray-500">
          © 2026 Shopify. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export default Home;
