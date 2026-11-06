import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login Successful!");
    setFormData({ email: "", password: "" });
  };
  return (
    <main className="min-h-[calc(100vh-6rem)] bg-[#f1f8f7] px-5 py-10 text-gray-900 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-gray-200/70 md:grid-cols-2">
        <aside className="relative hidden min-h-[620px] overflow-hidden bg-gray-900 md:block">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&q=85"
            alt="A curated seasonal collection"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/25 to-teal-950/10" />
          <div className="absolute inset-x-0 bottom-0 p-10 text-white lg:p-12">
            <span className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[.16em] backdrop-blur">
              The SHOPIFY edit
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight">
              A few good things, right this way.
            </h1>
            <p className="mt-4 max-w-sm leading-7 text-gray-200">
              Sign in to pick up where you left off and find something you’ll
              love.
            </p>
          </div>
        </aside>
        <section className="flex items-center p-6 sm:p-10 lg:p-14">
          <div className="mx-auto w-full max-w-md">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
                S
              </span>
              SHOP<span className="text-teal-600">IFY</span>
            </Link>
            <p className="mt-9 text-sm font-bold uppercase tracking-[.16em] text-teal-600">
              Welcome back
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight">
              Sign in to your account
            </h2>
            <p className="mt-2 text-gray-500">
              Good to see you again. Let’s get you shopping.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-sm font-semibold"
                >
                  Email address
                </label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 outline-none transition placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-semibold"
                  >
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm font-semibold text-teal-600 hover:text-teal-800"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-16 outline-none transition placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-teal-600 hover:text-teal-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <label className="flex items-center gap-2.5 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 accent-teal-600"
                />
                Remember me
              </label>
              <button
                type="submit"
                className="w-full rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-teal-100 transition hover:bg-teal-700"
              >
                Sign in <span aria-hidden="true">→</span>
              </button>
            </form>
            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                or
              </span>
              <span className="h-px flex-1 bg-gray-200" />
            </div>
            <button
              type="button"
              className="w-full rounded-xl border border-gray-200 px-6 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Continue with Google
            </button>
            <p className="mt-7 text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="font-semibold text-teal-600 hover:text-teal-800"
              >
                Register now
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;

