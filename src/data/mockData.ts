import { Product, Order, Customer, DashboardStats } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation and 30-hour battery life.',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 45,
    status: 'active',
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracking, heart rate monitoring, and smartphone notifications on your wrist.',
    price: 399.99,
    image: 'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 32,
    status: 'active',
  },
  {
    id: '3',
    name: 'Leather Laptop Bag',
    description: 'Genuine leather laptop bag with multiple compartments and adjustable shoulder strap.',
    price: 129.99,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Accessories',
    stock: 58,
    status: 'active',
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches, perfect for gaming and productivity.',
    price: 159.99,
    image: 'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 27,
    status: 'active',
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
    price: 49.99,
    image: 'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 91,
    status: 'active',
  },
  {
    id: '6',
    name: 'USB-C Hub',
    description: '7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery.',
    price: 79.99,
    image: 'https://images.pexels.com/photos/4526414/pexels-photo-4526414.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 64,
    status: 'active',
  },
  {
    id: '7',
    name: 'Phone Stand',
    description: 'Adjustable aluminum phone stand compatible with all smartphones and tablets.',
    price: 29.99,
    image: 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Accessories',
    stock: 120,
    status: 'active',
  },
  {
    id: '8',
    name: 'Portable Charger',
    description: '20000mAh power bank with fast charging and dual USB outputs.',
    price: 59.99,
    image: 'https://images.pexels.com/photos/4526411/pexels-photo-4526411.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    stock: 73,
    status: 'active',
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
    },
    items: [
      {
        productId: '1',
        productName: 'Premium Wireless Headphones',
        quantity: 1,
        price: 299.99,
      },
    ],
    total: 299.99,
    status: 'delivered',
    createdAt: '2024-01-20T10:30:00Z',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customer: {
      name: 'Michael Chen',
      email: 'michael.chen@example.com',
    },
    items: [
      {
        productId: '2',
        productName: 'Smart Watch Pro',
        quantity: 1,
        price: 399.99,
      },
      {
        productId: '5',
        productName: 'Wireless Mouse',
        quantity: 1,
        price: 49.99,
      },
    ],
    total: 449.98,
    status: 'shipped',
    createdAt: '2024-01-21T14:15:00Z',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customer: {
      name: 'Emily Rodriguez',
      email: 'emily.r@example.com',
    },
    items: [
      {
        productId: '3',
        productName: 'Leather Laptop Bag',
        quantity: 1,
        price: 129.99,
      },
    ],
    total: 129.99,
    status: 'processing',
    createdAt: '2024-01-22T09:45:00Z',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customer: {
      name: 'David Park',
      email: 'david.park@example.com',
    },
    items: [
      {
        productId: '4',
        productName: 'Mechanical Keyboard',
        quantity: 1,
        price: 159.99,
      },
      {
        productId: '5',
        productName: 'Wireless Mouse',
        quantity: 1,
        price: 49.99,
      },
      {
        productId: '7',
        productName: 'Phone Stand',
        quantity: 1,
        price: 29.99,
      },
    ],
    total: 239.97,
    status: 'pending',
    createdAt: '2024-01-23T16:20:00Z',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-005',
    customer: {
      name: 'Lisa Anderson',
      email: 'lisa.a@example.com',
    },
    items: [
      {
        productId: '8',
        productName: 'Portable Charger',
        quantity: 2,
        price: 59.99,
      },
    ],
    total: 119.98,
    status: 'delivered',
    createdAt: '2024-01-19T11:00:00Z',
  },
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 123-4567',
    totalOrders: 5,
    totalSpent: 1249.95,
    joinedAt: '2023-10-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    phone: '+1 (555) 234-5678',
    totalOrders: 3,
    totalSpent: 899.97,
    joinedAt: '2023-11-20T00:00:00Z',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@example.com',
    phone: '+1 (555) 345-6789',
    totalOrders: 7,
    totalSpent: 1899.93,
    joinedAt: '2023-09-05T00:00:00Z',
  },
  {
    id: '4',
    name: 'David Park',
    email: 'david.park@example.com',
    phone: '+1 (555) 456-7890',
    totalOrders: 2,
    totalSpent: 569.98,
    joinedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    phone: '+1 (555) 567-8901',
    totalOrders: 4,
    totalSpent: 749.96,
    joinedAt: '2023-12-01T00:00:00Z',
  },
];

export const mockDashboardStats: DashboardStats = {
  totalSales: 48750.25,
  ordersCount: 127,
  productsCount: 8,
  customersCount: 342,

  revenueTrend: 12.5,
  ordersTrend: 8.2,
  customersTrend: 15.3,
};

export const mockSalesData = [
  { month: 'Jan', sales: 4200 },
  { month: 'Feb', sales: 3800 },
  { month: 'Mar', sales: 5100 },
  { month: 'Apr', sales: 4600 },
  { month: 'May', sales: 6200 },
  { month: 'Jun', sales: 5800 },
];
