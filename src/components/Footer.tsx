import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-zinc-800">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 md:flex-row md:justify-between">
        
        {/* Brand */}
        <div>
          <Link
            href="/"
            className="text-2xl font-bold tracking-wider"
          >
            VANTA
          </Link>

          <p className="mt-3 max-w-xs text-sm text-zinc-400">
            Timeless fashion designed for everyday wear.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="mb-4 font-semibold">Shop</h3>

          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link
                href="/products"
                className="transition-colors hover:text-white"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                href="/categories"
                className="transition-colors hover:text-white"
              >
                Categories
              </Link>
            </li>

            <li>
              <Link
                href="/wishlist"
                className="transition-colors hover:text-white"
              >
                Wishlist
              </Link>
            </li>

            <li>
              <Link
                href="/cart"
                className="transition-colors hover:text-white"
              >
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-4 font-semibold">Company</h3>

          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link
                href="/about"
                className="transition-colors hover:text-white"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className="transition-colors hover:text-white"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-zinc-500 md:flex-row">
          <p>© 2026 Vanta Studio. All rights reserved.</p>

          <p>Built with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}