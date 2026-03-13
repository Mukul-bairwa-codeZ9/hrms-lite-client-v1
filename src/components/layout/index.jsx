import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { Toaster } from 'react-hot-toast';

const pageMeta = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your organization' },
  '/employees': { title: 'Employees', subtitle: 'Manage your workforce' },
  '/attendance': { title: 'Attendance', subtitle: 'Track daily attendance' },
};

const Layout = () => {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] || { title: 'HRMS Lite' };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <Header title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
};

export default Layout;