'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthSession, mockLogout } from '@/lib/auth';
import { useState } from 'react';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export default function Navbar() {
  const { data: session } = useAuthSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await mockLogout();
    router.push('/login');
  };

  if (!session) return null;

  return (
    <nav className="bg-white/95 dark:bg-dark-surface/95 backdrop-blur-lg border-b border-gray-200 dark:border-dark-border shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/tasks" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-purple rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-all duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gradient">
              TodoApp
            </span>
          </Link>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Email */}
            <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gray-50 dark:bg-dark-surface rounded-lg border border-gray-200 dark:border-dark-border">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-purple rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {session.user.email.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 dark:text-dark-text-muted font-medium">Logged in as</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-dark-text-primary">{session.user.email}</span>
              </div>
            </div>

            {/* Mobile User Icon */}
            <div className="sm:hidden w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-purple rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {session.user.email.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="btn-danger-alt disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? (
                <>
                  <div className="loading-spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
                  <span className="hidden sm:inline font-semibold">Logging out...</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline font-semibold">Logout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
