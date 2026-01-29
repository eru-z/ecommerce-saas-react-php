import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  X,
  Store,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Products', href: '/dashboard/products', icon: Package },
    { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
    { name: 'Customers', href: '/dashboard/customers', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* SIDEBAR */}
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-64 transform bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 border-r border-white/10 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* BRAND */}
          <div className="relative px-6 py-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 p-2 shadow-lg">
                <Store className="h-6 w-6 text-white" />
                <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
              </div>

              <div>
                <p className="text-sm uppercase tracking-widest text-neutral-400">
                  System
                </p>
                <p className="text-lg font-semibold tracking-tight text-white">
                  Control
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-neutral-400 hover:text-white lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* NAV */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
                    active
                      ? 'bg-white/10 text-white'
                      : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {/* Active rail */}
                  {active && (
                    <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
                  )}

                  <Icon
                    className={`h-5 w-5 transition ${
                      active
                        ? 'text-blue-400'
                        : 'text-neutral-400 group-hover:text-blue-400'
                    }`}
                  />

                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* FOOTER */}
          <div className="border-t border-white/10 p-4 space-y-3">
            {/* USER */}
            <div className="flex items-center gap-3 rounded-xl bg-white/5 px-3 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-semibold text-white shadow-md">
                {user?.name?.charAt(0) || 'U'}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {user?.name || 'User'}
                </p>
                <p className="truncate text-xs text-neutral-400">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
