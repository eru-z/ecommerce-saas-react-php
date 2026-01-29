import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Truck,
  Headphones,
  Sparkles,
  Layers,
  Zap,
  Palette,
  Quote,
} from 'lucide-react';

import { mockProducts } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';

export const Home = () => {
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="relative overflow-hidden bg-neutral-950 text-white">

      {/* ================= BACKGROUND GLOWS ================= */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/4 h-[700px] w-[700px] rounded-full bg-blue-600/20 blur-[160px]" />
        <div className="absolute top-1/3 right-0 h-[700px] w-[700px] rounded-full bg-purple-600/20 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-[600px] w-[600px] rounded-full bg-indigo-600/20 blur-[160px]" />
      </div>

      {/* ================= HERO ================= */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pt-40 pb-36">
          <div className="grid lg:grid-cols-12 gap-20 items-center">

            {/* TEXT */}
            <div className="lg:col-span-7 space-y-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs tracking-widest text-white/80">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                CREATIVE COMMERCE PLATFORM
              </div>

              <h1 className="text-[clamp(3.5rem,6vw,5.5rem)] font-bold leading-[0.95] tracking-tight">
                Crafted
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Ecommerce
                </span>
                <br />
                Experiences
              </h1>

              <p className="max-w-xl text-xl text-white/70">
                A portfolio-grade ecommerce system combining design systems,
                performance engineering, and premium UI.
              </p>

              <div className="flex items-center gap-6">
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 px-7 py-4 text-sm font-semibold shadow-lg shadow-indigo-500/30 transition hover:scale-[1.04] hover:shadow-[0_0_40px_rgba(99,102,241,0.6)]"
                >
                  Explore Collection
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-white/60 hover:text-white"
                >
                  View Dashboard →
                </Link>
              </div>
            </div>

            {/* VISUAL */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] border border-white/10 bg-neutral-900">
                <img
                  src={featuredProducts[0]?.image}
                  alt="Featured"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <div className="text-xs uppercase tracking-widest text-white/60">
                    Featured Product
                  </div>
                  <div className="text-xl font-semibold">
                    {featuredProducts[0]?.name}
                  </div>
                </div>
              </div>

              {/* FLOATING CARD */}
              <div className="absolute -bottom-10 -left-10 rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur p-6 shadow-xl">
                <div className="text-sm text-white/60">Average Rating</div>
                <div className="mt-2 flex items-center gap-2 text-lg font-semibold">
                  4.9
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="relative z-10 border-y border-white/10 bg-neutral-900/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-14">
          {[
            { icon: Truck, title: 'Fast Delivery' },
            { icon: ShieldCheck, title: 'Secure Payments' },
            { icon: Headphones, title: '24/7 Support' },
            { icon: Star, title: 'Top Rated UX' },
          ].map(item => (
            <div key={item.title} className="flex items-center gap-5">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-blue-400">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm font-semibold">{item.title}</div>
                <div className="text-sm text-white/50">System-grade quality</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STATS ================= */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-32 grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
          {[
            { value: '10k+', label: 'Users' },
            { value: '250+', label: 'Products' },
            { value: '99.9%', label: 'Uptime' },
            { value: '4.9★', label: 'Rating' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-white/50">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-36">
        <div className="mb-20">
          <h2 className="text-4xl font-bold">Featured Collection</h2>
          <p className="mt-4 max-w-xl text-white/60">
            Products presented as curated design artifacts.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {featuredProducts.map(product => (
            <Link key={product.id} to={`/products/${product.id}`} className="group">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition hover:-translate-y-2 hover:shadow-2xl">
                <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-xs">
                  New
                </div>

                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <div className="text-sm font-semibold">{product.name}</div>
                  <div className="mt-2 flex justify-between text-sm text-white/70">
                    <span>{formatCurrency(product.price)}</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      4.8
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="relative z-10 border-t border-white/10 bg-neutral-900/40">
        <div className="mx-auto max-w-5xl px-6 py-32 text-center">
          <Quote className="mx-auto h-10 w-10 text-indigo-400 mb-6" />
          <p className="text-xl text-white/80 leading-relaxed">
            This project feels like a real product, not a demo.
            Every interaction is intentional and refined.
          </p>
          <div className="mt-6 text-sm text-white/50">
            — Product Designer Feedback
          </div>
        </div>
      </section>

      {/* ================= TECH STACK ================= */}
      <section className="relative z-10 bg-neutral-950 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <h2 className="mb-14 text-3xl font-bold">Built With</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
            {[
              'React',
              'PHP',
              'Tailwind',
              'MySQL',
              'REST API',
              'Modern UI',
            ].map(tech => (
              <div
                key={tech}
                className="rounded-xl border border-white/10 bg-white/5 px-6 py-4 text-center text-sm text-white/70 hover:bg-white/10 transition"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-32 text-center">
          <h2 className="text-3xl font-medium">Designed. Engineered. Shipped.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/60">
            A complete ecommerce experience built as a professional product.
          </p>

          <div className="mt-10">
            <Link
              to="/products"
              className="group inline-flex items-center gap-3 text-sm text-white/70 hover:text-white"
            >
              Start exploring
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
