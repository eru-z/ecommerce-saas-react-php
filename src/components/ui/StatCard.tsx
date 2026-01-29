import { ReactNode } from 'react';
import { Card, CardBody } from './Card';

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export const StatCard = ({ title, value, icon, trend }: StatCardProps) => {
  return (
    <Card>
      <CardBody className="flex items-center justify-between gap-6">
        {/* TEXT */}
        <div className="space-y-1">
          <p className="text-xs uppercase tracking-widest text-white/70">
            {title}
          </p>

          <p className="text-3xl font-semibold tracking-tight text-white">
            {value}
          </p>

          {trend && (
            <p
              className={`text-xs mt-2 ${
                trend.isPositive
                  ? 'text-emerald-400'
                  : 'text-rose-400'
              }`}
            >
              <span className="font-medium">{trend.value}</span>
              <span className="text-white/60"> from last month</span>
            </p>
          )}
        </div>

        {/* ICON */}
        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-xl
            bg-neutral-800/70
            text-white
            transition
            group-hover:scale-105
          "
        >
          {icon}
        </div>
      </CardBody>
    </Card>
  );
};
