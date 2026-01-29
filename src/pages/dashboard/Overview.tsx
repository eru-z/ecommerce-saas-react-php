import {
  DollarSign,
  ShoppingBag,
  Users,
  RotateCcw,
  Package,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

/* =====================================================
   E-COMMERCE DASHBOARD
===================================================== */

export const Overview = () => {
  return (
<div className="bg-[#0b0d10] text-white">
      <div className="mx-auto max-w-[1400px] space-y-6 px-6 py-6">

        {/* HEADER */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            <p className="text-sm text-white/40">
              Store performance overview
            </p>
          </div>

          <Link to="/" className="group">
            <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#14161b] px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5">
              View Storefront
              <ArrowUpRight className="h-4 w-4 text-white/50 transition group-hover:text-white" />
            </button>
          </Link>
        </header>

        {/* KPI STRIP */}
        <section className="grid grid-cols-5 gap-4">
          <KPI title="Revenue" value="$50,240" trend="+12%" icon={<DollarSign />} />
          <KPI title="Orders" value="250" trend="+8%" icon={<ShoppingBag />} />
          <KPI title="Avg Order Value" value="$201" trend="+3%" icon={<TrendingUp />} />
          <KPI title="Customers" value="187" trend="+6%" icon={<Users />} />
          <KPI title="Refunds" value="30" trend="-2%" negative icon={<RotateCcw />} />
        </section>

        {/* MAIN GRID */}
        <section className="grid grid-cols-3 gap-6">
          <OrderSummary />
          <FulfillmentOverview />
          <TopSelling />
        </section>

        {/* BOTTOM GRID */}
        <section className="grid grid-cols-3 gap-6">
          <OrdersByChannel className="col-span-2" />
          <RevenueOverTime />
        </section>

      </div>
    </div>
  );
};


/* =====================================================
   KPI CARD (ECOMMERCE)
===================================================== */

const KPI = ({
  title,
  value,
  trend,
  icon,
  negative = false,
}: {
  title: string;
  value: string;
  trend: string;
  icon: JSX.Element;
  negative?: boolean;
}) => (
  <div className="rounded-xl border border-white/5 bg-[#14161b] p-4">
    <div className="flex items-center justify-between">
      <p className="text-[11px] uppercase tracking-wide text-white/40">
        {title}
      </p>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/15 text-blue-400">
        {icon}
      </div>
    </div>

    <div className="mt-3 flex items-end justify-between">
      <h3 className="text-2xl font-semibold">{value}</h3>
      <span
        className={`text-xs ${
          negative ? 'text-red-400' : 'text-green-400'
        }`}
      >
        {trend}
      </span>
    </div>
  </div>
);

/* =====================================================
   CARD BASE
===================================================== */

const Card = ({
  title,
  subtitle,
  children,
  className = '',
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`rounded-xl border border-white/5 bg-[#14161b] p-5 ${className}`}>
    <div className="mb-4">
      <h3 className="text-sm font-medium text-white/80">{title}</h3>
      {subtitle && (
        <p className="text-xs text-white/40">{subtitle}</p>
      )}
    </div>
    {children}
  </div>
);

/* =====================================================
   ORDER SUMMARY (FULFILLMENT)
===================================================== */

const OrderSummary = () => (
  <Card
    title="Order Summary"
    subtitle="Order fulfillment status"
  >
    <div className="flex justify-between text-center">
      <Donut value={25} label="In Transit" />
      <Donut value={85} label="Delivered" />
      <Donut value={7} label="Cancelled" />
    </div>
  </Card>
);

const Donut = ({ value, label }: { value: number; label: string }) => (
  <div>
    <div className="relative mx-auto h-20 w-20">
      <svg viewBox="0 0 36 36" className="h-full w-full">
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeDasharray={`${value}, 100`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
        {value}%
      </span>
    </div>
    <p className="mt-2 text-xs text-white/50">{label}</p>
  </div>
);

/* =====================================================
   FULFILLMENT RATE
===================================================== */

const FulfillmentOverview = () => (
  <Card
    title="Fulfillment Rate"
    subtitle="Delivered orders"
  >
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-44 w-44">
        <svg viewBox="0 0 36 36" className="h-full w-full">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="4"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
            fill="none"
            stroke="#6366f1"
            strokeWidth="4"
            strokeDasharray="52,100"
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center text-3xl font-semibold">
          52%
        </div>
      </div>

      <p className="mt-4 text-xs text-white/40">
        Orders delivered successfully
      </p>
    </div>
  </Card>
);

/* =====================================================
   TOP SELLING PRODUCTS
===================================================== */

const TopSelling = () => (
  <Card
    title="Top Selling Products"
    subtitle="Best performers today"
  >
    <div className="-mx-5 divide-y divide-white/5">
      {[
        {
          name: 'Premium Wireless Headphones',
          desc: 'High-quality wireless headphones',
          image: '/images/products/headphones.jpg',
        },
        {
          name: 'Smart Watch Pro',
          desc: 'Advanced fitness & health tracking',
          image: '/images/products/watch.jpg',
        },
        {
          name: 'Leather Laptop Bag',
          desc: 'Genuine leather laptop bag',
          image: '/images/products/bag.jpg',
        },
      ].map(product => (
        <div
          key={product.name}
          className="flex items-center gap-4 px-5 py-4 transition hover:bg-white/5"
        >
          {/* PRODUCT IMAGE – CIRCLE */}
          <img
            src={product.image}
            alt={product.name}
            className="h-12 w-12 rounded-full object-cover bg-[#1f2229]"
          />

          {/* PRODUCT INFO */}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">
              {product.name}
            </p>
            <p className="truncate text-xs text-white/40">
              {product.desc}
            </p>
          </div>
        </div>
      ))}
    </div>
  </Card>
);


/* =====================================================
   ORDERS BY CHANNEL / REGION
===================================================== */

const OrdersByChannel = ({ className = '' }: { className?: string }) => (
  <Card
    title="Orders by Channel"
    subtitle="Web / Mobile / POS"
    className={className}
  >
    <div className="flex h-44 items-end justify-center gap-3">
      {[40, 65, 30, 85, 55, 70, 45].map((v, i) => (
        <div
          key={i}
          style={{ height: `${v}%` }}
          className="w-4 rounded-full bg-blue-500"
        />
      ))}
    </div>
  </Card>
);

/* =====================================================
   REVENUE OVER TIME
===================================================== */

const RevenueOverTime = () => (
  <Card
    title="Revenue"
    subtitle="Last 6 months"
  >
    <svg viewBox="0 0 100 40" className="h-44 w-full">
      <path
        d="M0,30 C20,10 40,20 60,10 80,0 100,20 100,30 L100,40 L0,40 Z"
        fill="rgba(59,130,246,0.25)"
      />
    </svg>

    <div className="mt-4 flex justify-between text-xs text-white/30">
      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => (
        <span key={m}>{m}</span>
      ))}
    </div>
  </Card>
);
