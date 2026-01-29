import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { SettingsProvider } from './contexts/SettingsContext';

import { ProtectedRoute } from './components/ProtectedRoute';

import { DashboardLayout } from './components/layout/DashboardLayout';
import { PublicLayout } from './components/layout/PublicLayout';

import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

import { Overview } from './pages/dashboard/Overview';
import { Products as DashboardProducts } from './pages/dashboard/Products';
import { Orders } from './pages/dashboard/Orders';
import { Customers } from './pages/dashboard/Customers';
import { Profile } from './pages/dashboard/Profile';

import { Home } from './pages/storefront/Home';
import { ProductList } from './pages/storefront/ProductList';
import { ProductDetail } from './pages/storefront/ProductDetail';
import { Cart } from './pages/storefront/Cart';
import { Checkout } from './pages/storefront/Checkout';

function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <AuthProvider>
          <CartProvider>

            <Routes>

              {/* ========== AUTH ========== */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* ========== PUBLIC STOREFRONT ========== */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Route>

              {/* ========== DASHBOARD (PROTECTED) ========== */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Overview />} />
                <Route path="products" element={<DashboardProducts />} />
                <Route path="orders" element={<Orders />} />
                <Route path="customers" element={<Customers />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              {/* ========== FALLBACK ========== */}
              <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>

          </CartProvider>
        </AuthProvider>
      </SettingsProvider>
    </BrowserRouter>
  );
}

export default App;
