
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { MessageSquare, UserRound, Users, ArrowRight, Menu } from 'lucide-react';
import { useIsMobile } from '../../hooks/use-mobile';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    // Close sidebar on mobile by default
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const role = user?.role;
  
  const navigationItems = [
    {
      name: 'Dashboard',
      icon: <Users className="h-5 w-5" />,
      href: role === 'investor' ? '/dashboard/investor' : '/dashboard/entrepreneur',
    },
    {
      name: 'Messages',
      icon: <MessageSquare className="h-5 w-5" />,
      href: '/messages',
    },
    {
      name: 'Profile',
      icon: <UserRound className="h-5 w-5" />,
      href: role === 'investor' 
        ? `/profile/investor/${user?.id}` 
        : `/profile/entrepreneur/${user?.id}`,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`
          ${isMobile ? 'fixed z-30' : 'relative'} 
          ${sidebarOpen ? (isMobile ? 'translate-x-0' : 'w-64') : (isMobile ? '-translate-x-full' : 'w-16')}
          bg-sidebar transition-all duration-300 h-full
        `}
      >
        <div className="flex flex-col h-full p-3">
          <div className="flex items-center justify-between py-2 mb-6">
            {sidebarOpen && (
              <h1 className="text-xl font-bold text-sidebar-foreground">Business Nexus</h1>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground"
            >
              <ArrowRight className={`h-4 w-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <nav className="space-y-1 flex-1">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center px-2 py-2 rounded-md text-sidebar-foreground hover:bg-sidebar-accent group"
              >
                <div className="mr-3 flex-shrink-0">{item.icon}</div>
                {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-sidebar-border">
            <div className="flex items-center px-2 py-2">
              {sidebarOpen && (
                <div className="flex-1 mr-3">
                  <p className="text-sm font-medium text-sidebar-foreground truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-sidebar-foreground/70 capitalize">
                    {user?.role}
                  </p>
                </div>
              )}
              <button 
                onClick={handleLogout}
                className="p-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80"
              >
                {sidebarOpen ? 'Logout' : '👋'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow z-10">
          <div className="px-4 py-3 flex items-center justify-between">
            {isMobile && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 ml-auto mr-auto">
              {role === 'investor' ? 'Investor Dashboard' : 'Entrepreneur Dashboard'}
            </h2>
            <div className="flex items-center">
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:inline">Welcome, {user?.name}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
