'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loadingAuthCheck } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    if (!loadingAuthCheck) {
      // **Conditional Check: Allow access to /login page even if not authenticated**
      if (!isAuthenticated && pathname !== '/login' && pathname !== '/admin/login') { // Adjust '/admin/login' if your login route is different
        router.push('/admin/login'); // Redirect to login if NOT authenticated and NOT on login page
      }
      // If user is authenticated, no need to redirect, just let them access the page
      // If user is NOT authenticated BUT is on the login page, allow access to login page
    }
  }, [isAuthenticated, router, loadingAuthCheck, pathname]); // Include pathname in dependency array

  if (loadingAuthCheck) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Render children only if authenticated OR if it's the login page (no redirect needed for login page itself)
  if (!isAuthenticated && (pathname === '/login' || pathname === '/admin/login')) { // Adjust '/admin/login' if needed
    return <>{children}</>; // Render login page even if not authenticated
  }

  if (!isAuthenticated) {
    return null; // Don't render anything for other protected pages if not authenticated (redirect already handled)
  }


  return <>{children}</>; // Render children for authenticated users on protected pages
};

export default ProtectedRoute;