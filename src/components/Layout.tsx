
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, X, Calendar, Clipboard, UploadCloud, FileCheck, Users, UserRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockCredentials } from '@/lib/data/mockAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<"doctor" | "patient">("doctor");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const user = mockCredentials.find(cred => cred.username === username);
    if (user) {
      setUserRole(user.role === "veterinary" ? "doctor" : "patient");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Define menu items based on user role
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <Clipboard className="mr-2 h-5 w-5" /> },
    ...(userRole === "doctor" ? [
      { path: '/appointments', label: 'Appointments', icon: <Calendar className="mr-2 h-5 w-5" /> },
      { path: '/patients', label: 'Patients', icon: <Users className="mr-2 h-5 w-5" /> },
      { path: '/medical-records', label: 'Medical Records', icon: <FileCheck className="mr-2 h-5 w-5" /> },
      { path: '/scanner', label: 'Patient Scanner', icon: <UploadCloud className="mr-2 h-5 w-5" /> }
    ] : [
      { path: '/my-appointments', label: 'My Appointments', icon: <Calendar className="mr-2 h-5 w-5" /> },
      { path: '/my-records', label: 'My Records', icon: <FileCheck className="mr-2 h-5 w-5" /> },
      { path: '/profile', label: 'My Profile', icon: <UserRound className="mr-2 h-5 w-5" /> }
    ])
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 lg:hidden"
          onClick={() => setSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-border transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-semibold text-blue-600">MedIQ</h2>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.path) 
                    ? "bg-blue-100 text-blue-700"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center text-muted-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top nav */}
        <header className="h-14 border-b flex items-center px-4 sm:px-6 bg-white">
          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden" 
            onClick={toggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-4 font-medium text-lg text-blue-600 lg:hidden">MedIQ</div>
          <div className="ml-auto flex items-center space-x-2">
            {/* Add any header controls here */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
