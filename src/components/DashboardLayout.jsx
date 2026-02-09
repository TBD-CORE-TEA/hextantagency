import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineCube,
  HiOutlineClipboardList,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineBell,
  HiOutlineSearch,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineChevronDown,
  HiOutlineCreditCard,
  HiOutlineQuestionMarkCircle
} from 'react-icons/hi';

// Custom Hexagon icon component
const HexagonIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.18l6 3.33v6.98l-6 3.33-6-3.33V7.51l6-3.33z"/>
  </svg>
);

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: HiOutlineHome },
  { name: 'Agents', path: '/dashboard/agents', icon: HiOutlineCube },
  { name: 'Tasks & Workflows', path: '/dashboard/tasks', icon: HiOutlineClipboardList },
  { name: 'Monitoring & Logs', path: '/dashboard/monitoring', icon: HiOutlineChartBar },
];

const bottomNavItems = [
  { name: 'Settings', path: '/dashboard/settings', icon: HiOutlineCog },
  { name: 'Billing', path: '/dashboard/billing', icon: HiOutlineCreditCard },
  { name: 'Help & Support', path: '/dashboard/support', icon: HiOutlineQuestionMarkCircle },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();

  // Mock user data
  const user = {
    name: 'David Chen',
    email: 'david@company.com',
    avatar: null,
    plan: 'Pro'
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path.includes('/agents/')) return 'Agent Details';
    if (path.includes('/agents')) return 'Agents';
    if (path.includes('/tasks')) return 'Tasks & Workflows';
    if (path.includes('/monitoring')) return 'Monitoring & Logs';
    if (path.includes('/settings')) return 'Settings';
    if (path.includes('/billing')) return 'Billing';
    if (path.includes('/support')) return 'Help & Support';
    return 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
            <Link to="/" className="flex items-center gap-2">
              <div className="relative">
                <HexagonIcon className="w-6 h-6 text-cyan-500" />
                <div className="absolute inset-0 blur-sm bg-cyan-500/30 rounded-full" />
              </div>
              <span className="text-lg font-bold text-white">Hextant<span className="text-cyan-400">AI</span></span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-gray-400 hover:text-white transition-colors"
            >
              <HiOutlineX className="text-xl" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`
                }
              >
                <item.icon className="text-xl" />
                <span>{item.name}</span>
              </NavLink>
            ))}

            <div className="pt-4 mt-4 border-t border-gray-800">
              {bottomNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  <item.icon className="text-xl" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
          </nav>

          {/* User Profile Card */}
          <div className="p-3 border-t border-gray-800">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.plan} Plan</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
              >
                <HiOutlineMenu className="text-xl" />
              </button>
              <h1 className="text-lg font-semibold text-white">{getPageTitle()}</h1>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg border border-gray-700 focus-within:border-cyan-500 transition-colors">
                <HiOutlineSearch className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-48"
                />
                <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs text-gray-500 bg-gray-700 rounded">
                  ⌘K
                </kbd>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <HiOutlineBell className="text-xl" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <HiOutlineChevronDown className={`hidden md:block text-gray-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-xl z-50 py-2">
                      <div className="px-4 py-3 border-b border-gray-800">
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/dashboard/settings"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <HiOutlineUser className="text-lg" />
                          Profile Settings
                        </Link>
                        <Link
                          to="/dashboard/billing"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <HiOutlineCreditCard className="text-lg" />
                          Billing
                        </Link>
                      </div>
                      <div className="border-t border-gray-800 pt-1">
                        <Link
                          to="/login"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-gray-800 transition-colors"
                        >
                          <HiOutlineLogout className="text-lg" />
                          Sign Out
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
