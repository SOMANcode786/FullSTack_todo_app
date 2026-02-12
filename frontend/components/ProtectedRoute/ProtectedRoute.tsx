'use client';

import { useAuthSession } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ children, redirectTo = '/login' }: ProtectedRouteProps) {
  const { data: session } = useAuthSession();
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!session?.user) {
      // Store the attempted route before redirecting
      sessionStorage.setItem('redirectAfterLogin', pathname);
      router.replace(redirectTo);
    } else {
      setChecked(true);
    }
  }, [session, router, redirectTo, pathname]);

  // Show loading indicator while checking authentication status
  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Checking authentication...</div>
      </div>
    );
  }

  // If user is authenticated, render the protected content
  return <>{children}</>;
}