import { Card, CardHeader, CardTitle, CardBody } from '../ui/Card';

export const RevenueChart = ({ data }: { data: any[] }) => {
  const max = Math.max(...data.map(d => d.revenue), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Trend</CardTitle>
      </CardHeader>
      <CardBody>
        <svg viewBox="0 0 100 100" className="h-48 w-full">
          <polyline
            fill="none"
            stroke="url(#grad)"
            strokeWidth="2.5"
            points={data.map((d, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y = 100 - (d.revenue / max) * 100;
              return `${x},${y}`;
            }).join(' ')}
          />
          <defs>
            <linearGradient id="grad">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </CardBody>
    </Card>
  );
};
