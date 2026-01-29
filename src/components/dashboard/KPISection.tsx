import { DollarSign, ShoppingBag, Activity } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { formatCurrency } from '../../utils/format';
import { getAOV, getTotalOrders, getTotalRevenue } from '../../utils/analytics';

export const KPISection = ({ data }: { data: any[] }) => {
  const revenue = getTotalRevenue(data);
  const orders = getTotalOrders(data);

  return (
    <section className="grid gap-6 md:grid-cols-3">
      <StatCard
        title="Revenue (12m)"
        value={formatCurrency(revenue)}
        icon={<DollarSign className="h-6 w-6 text-indigo-400" />}
      />
      <StatCard
        title="Orders (12m)"
        value={orders}
        icon={<ShoppingBag className="h-6 w-6 text-indigo-400" />}
      />
      <StatCard
        title="Avg Order Value"
        value={formatCurrency(getAOV(revenue, orders))}
        icon={<Activity className="h-6 w-6 text-indigo-400" />}
      />
    </section>
  );
};
