import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingCart,
  Store,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items } = useCart();
  const location = useLocation();

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (path: string) =>
    location.pathname === path;

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 z-50 w-full">
        {/* glass surface */}
        <div className="backdrop-blur-xl bg-neutral-950/70 border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex h-20 items-center justify-between">

              {/* LOGO */}
              <Link
                to="/"
                className="group flex items-center gap-3"
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30">
                  <Store className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-semibold tracking-widest uppercase">
                  Erudita
                </span>
              </Link>

              {/* DESKTOP NAV */}
              <div className="hidden md:flex items-center gap-10">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'Products', to: '/products' },
                ].map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative text-sm transition ${
                      isActive(link.to)
                        ? 'text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {link.label}

                    {/* underline */}
                    <span
                      className={`absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-blue-400 to-purple-400 transition ${
                        isActive(link.to)
                          ? 'opacity-100'
                          : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </Link>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-6">

                {/* CART */}
                <Link
                  to="/cart"
                  className="relative group"
                >
                  <ShoppingCart className="h-6 w-6 text-white/70 transition group-hover:text-white" />

                  {cartItemCount > 0 && (
                    <span
                      className="
                        absolute -top-2 -right-2
                        flex h-5 w-5 items-center justify-center
                        rounded-full text-[10px] font-bold text-white
                        bg-gradient-to-br from-blue-500 to-purple-500
                        shadow-lg shadow-indigo-500/40
                        animate-pulse
                      "
                    >
                      {cartItemCount}
                    </span>
                  )}
                </Link>

                {/* LOGIN */}
                <Link
                  to="/login"
                  className="hidden md:inline-flex text-sm text-white/60 transition hover:text-white"
                >
                  Login
                </Link>

                {/* MOBILE MENU BUTTON */}
                <button
                  onClick={() => setMobileMenuOpen(true)}
                  className="md:hidden text-white/70 hover:text-white transition"
                >
                  <Menu className="h-7 w-7" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div
        className={`fixed inset-0 z-50 transition ${
          mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* backdrop */}
        <div
          className={`absolute inset-0 bg-neutral-950/80 backdrop-blur transition-opacity ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* panel */}
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm
            bg-neutral-900 border-l border-white/10
            transition-transform duration-300
            ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex h-20 items-center justify-between px-6">
            <span className="text-sm uppercase tracking-widest text-white/60">
              Navigation
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/70 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="px-6 py-10 space-y-8">
            {[
              { label: 'Home', to: '/' },
              { label: 'Products', to: '/products' },
              { label: 'Cart', to: '/cart' },
              { label: 'Login', to: '/login' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-2xl font-medium text-white/80 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
