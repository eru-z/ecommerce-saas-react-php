import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard,
  MapPin,
  User,
  CheckCircle,
} from 'lucide-react';

import { useCart } from '../../contexts/CartContext';
import { formatCurrency } from '../../utils/format';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardTitle, CardBody } from '../../components/ui/Card';

export const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();

  try {
    const data = await apiFetch<{ success: boolean; order_id: number }>(
      '/orders/create.php',
      {
        method: 'POST',
        body: JSON.stringify({
          customer: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode,
          },
          items: items.map(i => ({
            product_id: i.product.id,
            name: i.product.name,
            price: i.product.price,
            quantity: i.quantity,
          })),
          totals: { subtotal, shipping, tax, total },
        }),
      }
    );

    if (data.success) {
      clearCart();
      navigate(`/order-success/${data.order_id}`);
    }
  } catch (err) {
    alert('Failed to place order');
  }
};


  return (
    <div className="relative bg-neutral-950 text-white overflow-hidden">

      {/* ===== AMBIENT GLOW ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[520px] w-[520px] rounded-full bg-indigo-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32">

        {/* ===== HEADER ===== */}
        <header className="mb-16 max-w-2xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-widest text-white/70">
            CHECKOUT
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
            Complete your order
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-white/60">
            Secure checkout experience designed for clarity and confidence.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">

            {/* ===== FORMS ===== */}
            <section className="lg:col-span-2 space-y-10">

              {/* CONTACT */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-blue-400" />
                    <CardTitle>Contact information</CardTitle>
                  </div>
                </CardHeader>

                <CardBody className="space-y-4">
                  <Input
                    label="Full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    required
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      label="Email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                </CardBody>
              </Card>

              {/* SHIPPING */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-400" />
                    <CardTitle>Shipping address</CardTitle>
                  </div>
                </CardHeader>

                <CardBody className="space-y-4">
                  <Input
                    label="Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    required
                  />

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="ZIP code"
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                      required
                    />
                  </div>
                </CardBody>
              </Card>

              {/* PAYMENT */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-blue-400" />
                    <CardTitle>Payment details</CardTitle>
                  </div>
                </CardHeader>

                <CardBody className="space-y-4">
                  <Input
                    label="Card number"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, cardNumber: e.target.value })
                    }
                    required
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) =>
                        setFormData({ ...formData, expiryDate: e.target.value })
                      }
                      required
                    />
                    <Input
                      label="CVV"
                      value={formData.cvv}
                      onChange={(e) =>
                        setFormData({ ...formData, cvv: e.target.value })
                      }
                      required
                    />
                  </div>
                </CardBody>
              </Card>
            </section>

            {/* ===== SUMMARY ===== */}
            <aside className="lg:col-span-1">
              <Card className="sticky top-32">
                <CardHeader>
                  <CardTitle>Order summary</CardTitle>
                </CardHeader>

                <CardBody>
                  <div className="space-y-3 mb-6 text-sm text-white/70">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between">
                        <span>
                          {item.product.name} × {item.quantity}
                        </span>
                        <span>
                          {formatCurrency(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-3 text-sm text-white/70 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{formatCurrency(tax)}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-8">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <CheckCircle className="h-5 w-5" />
                    Place order
                  </Button>

                  <p className="mt-4 text-center text-xs text-white/40">
                    Demo checkout · No real payment processed
                  </p>
                </CardBody>
              </Card>
            </aside>
          </div>
        </form>
      </div>
    </div>
  );
};
