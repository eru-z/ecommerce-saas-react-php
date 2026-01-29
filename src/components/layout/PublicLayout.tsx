import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const PublicLayout = () => {
  return (
    <div className="relative min-h-screen bg-neutral-950 text-white flex flex-col overflow-hidden">

      {/* ===== GLOBAL AMBIENT BACKGROUND ===== */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-64 right-0 h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/3 -left-64 h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="relative border-t border-white/10 bg-neutral-950/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-24">

          <div className="grid grid-cols-1 gap-14 md:grid-cols-3">

            {/* BRAND */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold tracking-widest uppercase text-white/80">
                StoreSaaS
              </h3>
              <p className="max-w-sm text-sm leading-relaxed text-white/50">
                A portfolio-grade commerce system designed and engineered
                with clarity, performance, and intention.
              </p>
            </div>

            {/* LINKS */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-white/40">
                Navigation
              </h4>
              <ul className="space-y-2 text-sm">
                {['Home', 'Products', 'Cart', 'Checkout'].map((item) => (
                  <li
                    key={item}
                    className="text-white/60 hover:text-white transition"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-white/40">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-white/60">
                <li>support@storesaas.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>

          </div>

          {/* FOOTER BOTTOM */}
          <div className="mt-20 border-t border-white/10 pt-8 text-center text-xs text-white/40">
            © {new Date().getFullYear()} StoreSaaS — Built with ❤️ by Erudita
          </div>
        </div>
      </footer>
    </div>
  );
};
