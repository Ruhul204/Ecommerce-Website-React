import { Link } from "react-router-dom";

const values = [
  {
    icon: "✦",
    title: "Thoughtful quality",
    text: "We look for useful details, lasting materials, and products made to earn a place in your everyday.",
  },
  {
    icon: "♡",
    title: "People come first",
    text: "From the first browse to delivery at your door, we want shopping to feel simple and personal.",
  },
  {
    icon: "↗",
    title: "Better choices",
    text: "A carefully edited collection makes it easier to find the right thing and buy with confidence.",
  },
];

function About() {
  return (
    <main className="min-h-screen bg-[#f1f8f7] text-gray-900">
      <section className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <div className="overflow-hidden rounded-3xl bg-teal-50">
          <div className="grid items-center md:grid-cols-2">
            <div className="px-7 py-14 sm:px-12 lg:px-16">
              <p className="text-sm font-bold uppercase tracking-[.18em] text-teal-600">
                A little about us
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
                Good finds.{" "}
                <span className="text-teal-600">Good feeling.</span>
              </h1>
              <p className="mt-5 max-w-lg text-lg leading-8 text-gray-600">
                SHOPIFY is an independent online store built around the things
                you reach for every day.
              </p>
              <Link
                to="/Product"
                className="mt-8 inline-flex rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white transition hover:bg-teal-700"
              >
                Explore our collection →
              </Link>
            </div>
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000&q=85"
              alt="Our team working together"
              className="h-72 w-full object-cover md:h-full"
            />
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-teal-600">
            Our story
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            A simpler way to find what you love.
          </h2>
        </div>
        <div className="space-y-4 text-base leading-8 text-gray-600">
          <p>
            Shopping should feel inspiring, not overwhelming. We started SHOPIFY
            with a simple idea: bring useful, well-designed products together in
            one easy place.
          </p>
          <p>
            Our collection spans the everyday essentials you need and the
            thoughtful details that make them feel special. We keep listening,
            keep learning, and keep looking for better things to share with you.
          </p>
        </div>
      </section>
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-teal-600">
              What matters to us
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The little things make a difference.
            </h2>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {values.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-7 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-2xl font-bold text-teal-600">
                  {item.icon}
                </span>
                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-gray-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="rounded-3xl bg-teal-600 px-7 py-12 text-center text-white sm:px-12">
          <p className="text-sm font-bold uppercase tracking-[.2em] text-teal-200">
            Come on in
          </p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Find your next favorite.
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-teal-100">
            Browse a collection made for everyday life, and get in touch if
            there is anything we can help with.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/Product"
              className="rounded-xl bg-white px-6 py-3 font-semibold text-teal-700 transition hover:bg-teal-50"
            >
              Shop now
            </Link>
            <Link
              to="/Contact"
              className="rounded-xl border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;

