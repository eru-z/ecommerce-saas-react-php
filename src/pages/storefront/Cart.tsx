import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/format';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';

export const Cart = () => {
  const { items, removeItem, updateQuantity, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <div className="relative bg-neutral-950 text-white overflow-hidden">

      {/* ===== AMBIENT GLOW ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32">

        {/* ===== EMPTY STATE ===== */}
        {items.length === 0 && (
          <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
            <ShoppingBag className="h-20 w-20 text-white/20 mb-6" />
            <h2 className="text-2xl font-semibold mb-3">
              Your cart is empty
            </h2>
            <p className="max-w-md text-white/60 mb-10">
              Looks like you haven’t added anything yet.
              Explore the collection to get started.
            </p>
            <Link to="/products">
              <Button size="lg">
                Browse products
              </Button>
            </Link>
          </div>
        )}

        {/* ===== CONTENT ===== */}
        {items.length > 0 && (
          <>
            <header className="mb-16">
              <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-widest text-white/70">
                CART
              </span>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Shopping cart
              </h1>
            </header>

            <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">

              {/* ===== ITEMS ===== */}
              <section className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <Card key={item.product.id}>
                    <CardBody className="flex flex-col gap-6 sm:flex-row">

                      {/* IMAGE */}
                      <Link to={`/products/${item.product.id}`}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-32 w-full sm:w-32 rounded-xl object-cover"
                        />
                      </Link>

                      {/* DETAILS */}
                      <div className="flex flex-1 flex-col gap-4">

                        <div className="flex justify-between gap-6">
                          <div>
                            <Link to={`/products/${item.product.id}`}>
                              <h3 className="text-lg font-medium hover:text-blue-400 transition">
                                {item.product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-white/50">
                              {item.product.category}
                            </p>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-white/40 hover:text-red-400 transition"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mt-auto flex items-center justify-between">

                          {/* QUANTITY */}
                          <div className="flex items-center rounded-xl border border-white/10 bg-neutral-900">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="px-3 py-2 text-white/60 hover:text-white disabled:opacity-40"
                            >
                              <Minus className="h-4 w-4" />
                            </button>

                            <span className="px-4 text-sm font-medium">
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= item.product.stock}
                              className="px-3 py-2 text-white/60 hover:text-white disabled:opacity-40"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>

                          {/* PRICE */}
                          <span className="text-lg font-semibold">
                            {formatCurrency(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </section>

              {/* ===== SUMMARY ===== */}
              <aside className="lg:col-span-1">
                <Card className="sticky top-32">
                  <CardBody>
                    <h2 className="mb-8 text-lg font-semibold">
                      Order summary
                    </h2>

                    <div className="space-y-4 text-sm text-white/70">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                          {shipping === 0 ? 'Free' : formatCurrency(shipping)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax (10%)</span>
                        <span>{formatCurrency(tax)}</span>
                      </div>

                      {subtotal < 50 && (
                        <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-3 text-xs text-blue-300">
                          Add {formatCurrency(50 - subtotal)} more for free shipping
                        </div>
                      )}
                    </div>

                    <div className="my-8 border-t border-white/10 pt-6">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                      </div>
                    </div>

                    <Link to="/checkout">
                      <Button size="lg" className="w-full">
                        Proceed to checkout
                      </Button>
                    </Link>

                    <Link to="/products">
                      <Button
                        variant="outline"
                        className="mt-3 w-full"
                      >
                        Continue shopping
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </aside>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
