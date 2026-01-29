export const getTotalRevenue = (data: any[]) =>
  data.reduce((sum, m) => sum + m.revenue, 0);

export const getTotalOrders = (data: any[]) =>
  data.reduce((sum, m) => sum + m.orders, 0);

export const getAOV = (revenue: number, orders: number) =>
  revenue / Math.max(orders, 1);
