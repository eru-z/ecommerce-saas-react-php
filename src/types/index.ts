export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'store_owner';
  storeId?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  status: 'active' | 'draft';
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  joinedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DashboardStats {
  totalSales: number;
  ordersCount: number;
  productsCount: number;
  customersCount: number;

  // ✅ ADD THESE — REQUIRED BY DASHBOARD
  revenueTrend: number;
  ordersTrend: number;
  customersTrend: number;
}
