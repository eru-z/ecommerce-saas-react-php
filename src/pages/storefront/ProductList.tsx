import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter } from 'lucide-react';

import { mockProducts } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';

export const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['all', ...Array.from(new Set(mockProducts.map(p => p.category)))];

  let filteredProducts = mockProducts.filter(
    product =>
      selectedCategory === 'all' || product.category === selectedCategory
  );

  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="relative bg-neutral-950 text-white overflow-hidden">

      {/* ===== AMBIENT BACKGROUND (same language as Home) ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-48 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/3 -left-48 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32">

        {/* ===== HEADER ===== */}
        <header className="mb-20 max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-widest text-white/70">
            COLLECTION
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Explore the collection
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-white/60">
            Thoughtfully designed products that balance performance,
            material, and modern aesthetics.
          </p>
        </header>

        {/* ===== LAYOUT ===== */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">

          {/* ===== FILTERS ===== */}
          <aside className="lg:col-span-3">
            <div className="
              sticky top-32
              rounded-2xl border border-white/10
              bg-neutral-900/80 backdrop-blur
              p-6
            ">
              <div className="mb-8 flex items-center gap-3">
                <Filter className="h-5 w-5 text-blue-400" />
                <span className="text-xs uppercase tracking-widest text-white/70">
                  Filter & sort
                </span>
              </div>

              {/* CATEGORY */}
              <div className="mb-10 space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-white/40">
                  Category
                </h4>

                <div className="space-y-1">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`
                        w-full rounded-lg px-3 py-2 text-left text-sm capitalize transition
                        ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-white'
                            : 'text-white/50 hover:bg-white/5'
                        }
                      `}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* SORT */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-widest text-white/40">
                  Sort
                </h4>

                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="
                    w-full rounded-lg border border-white/10
                    bg-neutral-900 px-3 py-2
                    text-sm text-white outline-none
                    focus:border-blue-500
                  "
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                </select>
              </div>
            </div>
          </aside>

          {/* ===== PRODUCTS ===== */}
          <section className="lg:col-span-9">

            <div className="mb-10 text-sm text-white/60">
              Showing{' '}
              <span className="font-semibold text-white">
                {filteredProducts.length}
              </span>{' '}
              products
            </div>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-3">

              {filteredProducts.map(product => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group"
                >
                  <article
                    className="
                      relative h-full overflow-hidden
                      rounded-2xl border border-white/10
                      bg-neutral-900/80 backdrop-blur
                      transition-all duration-500
                      hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50
                    "
                  >
                    {/* IMAGE */}
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                          h-full w-full object-cover
                          transition-transform duration-700
                          group-hover:scale-110
                        "
                      />
                    </div>

                    {/* gradient overlay */}
                    <div className="
                      pointer-events-none absolute inset-0
                      bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent
                      opacity-0 transition
                      group-hover:opacity-100
                    " />

                    {/* CONTENT */}
                    <div className="
                      absolute bottom-0 left-0 right-0
                      p-6 space-y-3
                      translate-y-8 opacity-0
                      transition-all duration-300
                      group-hover:translate-y-0 group-hover:opacity-100
                    ">
                      <span className="text-xs uppercase tracking-widest text-blue-400">
                        {product.category}
                      </span>

                      <h3 className="text-lg font-medium">
                        {product.name}
                      </h3>

                      <p className="text-sm leading-relaxed text-white/60 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xl font-semibold">
                          {formatCurrency(product.price)}
                        </span>

                        <span className="flex items-center gap-1 text-sm text-white/70">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          4.8
                        </span>
                      </div>

                      {product.stock < 20 && (
                        <p className="text-xs text-red-400">
                          Only {product.stock} left
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              ))}

            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
