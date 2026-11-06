import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };
  const details = [
    {
      icon: "✉",
      title: "Email us",
      value: "hello@shopify.com",
      note: "We usually reply within one business day.",
    },
    {
      icon: "⌖",
      title: "Visit us",
      value: "Dhaka, Bangladesh",
      note: "Saturday–Thursday, 9:00 AM–6:00 PM",
    },
    {
      icon: "☎",
      title: "Call our team",
      value: "+880 1234-567890",
      note: "Here to help with your order.",
    },
  ];
  return (
    <main className="min-h-screen bg-[#f1f8f7] text-gray-900">
      <section className="mx-auto max-w-7xl px-5 pt-6 sm:px-8">
        <div className="rounded-3xl bg-teal-50 px-7 py-14 text-center sm:px-12 sm:py-16">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-teal-600">
            We’re here to help
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Let’s talk.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-600">
            Questions about an order, a product, or anything else? We’d love to
            hear from you.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {details.map((item) => (
            <article
              key={item.title}
              className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xl font-bold text-teal-600">
                {item.icon}
              </span>
              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p className="mt-1 font-semibold text-teal-600">
                  {item.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24">
        <div className="grid overflow-hidden rounded-3xl bg-white shadow-sm md:grid-cols-[.8fr_1.2fr]">
          <div className="bg-gray-900 p-7 text-white sm:p-10 lg:p-12">
            <p className="text-sm font-bold uppercase tracking-[.18em] text-teal-300">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-extrabold">Send us a message</h2>
            <p className="mt-4 leading-7 text-gray-300">
              Fill out the form and a real person from our team will get back to
              you as soon as possible.
            </p>
            <div className="mt-10 border-t border-white/15 pt-6">
              <p className="font-semibold">Customer care hours</p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                Saturday–Thursday
                <br />
                9:00 AM–6:00 PM (BST)
                <br />
                Friday: Closed
              </p>
            </div>
            <div className="mt-7 rounded-2xl bg-white/5 p-5">
              <p className="text-sm leading-6 text-gray-300">
                “Every conversation helps us make your experience a little
                better.”
              </p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-6 sm:p-9 lg:p-12"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-semibold"
                >
                  Your name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Jane Smith"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="jane@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-sm font-semibold"
              >
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                placeholder="How can we help?"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
              />
            </div>
            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-semibold"
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                placeholder="Tell us a little more..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-teal-100 transition hover:bg-teal-700 sm:w-auto"
            >
              Send message <span aria-hidden="true">→</span>
            </button>
            <p className="text-xs text-gray-500">
              We’ll only use your details to reply to your message.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Contact;

