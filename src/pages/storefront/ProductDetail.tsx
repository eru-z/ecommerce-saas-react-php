import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Truck,
  ShieldCheck,
} from 'lucide-react';

import { mockProducts } from '../../data/mockData';
import { formatCurrency } from '../../utils/format';
import { Button } from '../../components/ui/Button';
import { useCart } from '../../contexts/CartContext';

export const ProductDetail = () => {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-semibold">Product not found</h1>
          <Link to="/products">
            <Button>Back to products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="relative bg-neutral-950 text-white overflow-hidden">

      {/* ===== AMBIENT GLOW ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32">

        {/* ===== PRODUCT ===== */}
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/80 backdrop-blur">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
          </div>

          {/* DETAILS */}
          <div className="flex flex-col">

            <span className="mb-6 inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-widest text-white/70">
              {product.category.toUpperCase()}
            </span>

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="mt-6 flex items-center gap-4 text-sm text-white/60">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span>4.8 · 124 reviews</span>
            </div>

            {/* PRICE */}
            <div className="mt-8 text-4xl font-semibold">
              {formatCurrency(product.price)}
            </div>

            {/* DESCRIPTION */}
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/60">
              {product.description}
            </p>

            {/* META */}
            <div className="mt-10 space-y-4 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-400" />
                <span>In stock · {product.stock} available</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-blue-400" />
                <span>Free shipping over $50</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-400" />
                <span>1-year warranty included</span>
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex items-center rounded-xl border border-white/10 bg-neutral-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-white/70 hover:text-white transition"
                >
                  −
                </button>
                <span className="px-6 py-2 text-sm font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="px-4 py-2 text-white/70 hover:text-white transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={handleAddToCart}
                size="lg"
                disabled={addedToCart}
                className="flex-1"
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to cart
                  </>
                )}
              </Button>

              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>

              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* ===== RELATED ===== */}
        {relatedProducts.length > 0 && (
          <section className="mt-40">
            <h2 className="mb-14 text-3xl font-semibold tracking-tight">
              Related products
            </h2>

            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link key={item.id} to={`/products/${item.id}`} className="group">
                  <div
                    className="
                      relative overflow-hidden rounded-2xl
                      border border-white/10
                      bg-neutral-900/80 backdrop-blur
                      transition-all duration-500
                      hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50
                    "
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          h-full w-full object-cover
                          transition-transform duration-700
                          group-hover:scale-110
                        "
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 to-transparent opacity-0 group-hover:opacity-100 transition" />

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-sm font-medium">
                        {item.name}
                      </h3>
                      <span className="mt-1 block text-sm font-semibold text-white">
                        {formatCurrency(item.price)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
