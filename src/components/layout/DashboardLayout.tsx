import { useState } from 'react';
import { Menu, Bell } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // ✅ ADD THIS

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30">
          <div className="border-b border-white/10 bg-gradient-to-r from-neutral-900 via-neutral-900/95 to-neutral-900/90 backdrop-blur">
            <div className="flex items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-neutral-400 transition hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </button>

              <div className="hidden sm:block text-sm tracking-wide text-neutral-400">
                Dashboard
              </div>

              <div className="ml-auto flex items-center gap-5">
                <button className="relative text-neutral-400 transition hover:text-white">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                </button>

                {/* PROFILE ICON */}
<button
  onClick={() => navigate('/dashboard/profile')}
  className="
    h-8 w-8 rounded-full
    bg-gradient-to-br from-blue-600 to-indigo-600
    text-xs font-semibold
    flex items-center justify-center
    text-white
    transition hover:opacity-90
  "
>
  A
</button>

              </div>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="relative px-5 py-8 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-[size:24px_24px]" />
          <div className="relative">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
