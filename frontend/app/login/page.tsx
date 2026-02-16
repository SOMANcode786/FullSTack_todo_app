'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockLogin } from '@/lib/auth';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Call our mock login function
      const success = await mockLogin(email, password);

      if (success) {
        // Clear any potential cached redirects and then redirect
        sessionStorage.removeItem('redirectAfterLogin');

        // Small delay to ensure session is saved before redirect
        await new Promise(resolve => setTimeout(resolve, 100));

        // Redirect to tasks page on successful login
        window.location.href = '/tasks';
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
      }
    } catch (err) {
      setError('An error occurred during login');
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-md w-full">
        {/* Logo/Brand */}
        <div className="text-center mb-8 animate-fadeIn">
          <div className="mx-auto h-16 w-16 rounded-xl bg-gradient-to-r from-primary-500 to-accent-purple flex items-center justify-center shadow-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">TodoApp</h1>
          <p className="text-white/90 text-lg">Organize your life, one task at a time</p>
        </div>

        {/* Login Card */}
        <div className="card animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-dark-text-primary mb-2">
              Welcome back
            </h2>
            <p className="text-gray-600 dark:text-dark-text-secondary">
              Sign in to your account to continue
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="notification-error animate-slideInRight">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email-address" className="form-label">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="btn-primary w-full flex justify-center items-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner mr-2" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Sign in
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="divider" />

          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-dark-text-secondary">
              Don't have an account?{' '}
              <Link href="/signup" className="font-semibold text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <p className="text-white/80 text-sm">
            Secure authentication • Your data is protected
          </p>
        </div>
      </div>
    </div>
  );
}