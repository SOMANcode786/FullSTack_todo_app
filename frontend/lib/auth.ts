// Mock authentication utilities for development
// In a real implementation, this would integrate with Better Auth

import { useState, useEffect } from 'react';

interface MockSession {
  user: {
    id: string;
    email: string;
  };
  expires: string;
}

/**
 * Hook to get the current user session
 * @returns Session data if authenticated, null otherwise
 */
export const useAuthSession = () => {
  const [session, setSession] = useState<MockSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedSession = getStoredSession();
    setSession(storedSession);
    setIsLoading(false);

    // Listen for storage changes to update session across tabs
    const handleStorageChange = () => {
      const updatedSession = getStoredSession();
      setSession(updatedSession);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    data: session,
    isLoading
  };
};

/**
 * Function to check if user is authenticated
 * @returns Boolean indicating authentication status
 */
export const isAuthenticated = (): boolean => {
  const session = getStoredSession();
  if (!session) return false;

  // Check if session is expired
  const now = new Date().toISOString();
  return now < session.expires;
};

/**
 * Function to get JWT token from session
 * @returns JWT token string or null
 */
export const getJwtToken = (): string | null => {
  if (typeof window !== 'undefined') {
    // First try to get from cookies if available in browser
    const cookieValue = getCookie('mock-jwt-token');
    if (cookieValue) {
      return cookieValue;
    }

    // Fallback to localStorage
    const sessionData = localStorage.getItem('mock-auth-session');
    if (sessionData) {
      try {
        const session = JSON.parse(sessionData);
        return session.token || session.jwt || localStorage.getItem('mock-jwt-token') || null;
      } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
      }
    }
  }
  return null;
};

/**
 * Function to store session data in both localStorage and cookies
 */
export const setSession = (userData: { id: string; email: string }, token: string) => {
  if (typeof window !== 'undefined') {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 24 hours
    const session: MockSession = {
      user: userData,
      expires
    };

    // Store in localStorage
    localStorage.setItem('mock-auth-session', JSON.stringify(session));
    localStorage.setItem('mock-jwt-token', token);

    // Also set a simple auth flag for quick checks
    localStorage.setItem('isAuthenticated', 'true');

    // Set cookies that the middleware can access
    setCookie('mock-auth-session', JSON.stringify(session), { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
    setCookie('mock-jwt-token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
  }
};

/**
 * Function to clear session data from both localStorage and cookies
 */
export const clearSession = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('mock-auth-session');
    localStorage.removeItem('mock-jwt-token');
    localStorage.removeItem('isAuthenticated'); // Remove the auth flag

    // Clear cookies
    setCookie('mock-auth-session', '', { expires: new Date(0) });
    setCookie('mock-jwt-token', '', { expires: new Date(0) });
  }
};

/**
 * Helper function to get stored session
 */
const getStoredSession = (): MockSession | null => {
  if (typeof window !== 'undefined') {
    // Try to get from cookies first
    let sessionData = getCookie('mock-auth-session');

    // Fallback to localStorage
    if (!sessionData) {
      sessionData = localStorage.getItem('mock-auth-session');
    }

    if (sessionData) {
      try {
        const session = JSON.parse(sessionData);

        // Check if session is expired
        const now = new Date().toISOString();
        if (now >= session.expires) {
          localStorage.removeItem('mock-auth-session');
          localStorage.removeItem('mock-jwt-token');
          setCookie('mock-auth-session', '', { expires: new Date(0) });
          setCookie('mock-jwt-token', '', { expires: new Date(0) });
          return null;
        }

        return session;
      } catch (error) {
        console.error('Error parsing session data:', error);
        return null;
      }
    }
  }
  return null;
};

/**
 * Mock function to simulate login
 */
export const mockLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001';

    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    const userData = { id: data.user_id, email: data.email };
    const token = data.access_token;

    setSession(userData, token);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

/**
 * Mock function to simulate signup
 */
export const mockSignup = async (email: string, password: string): Promise<boolean> => {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8001';

    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    const userData = { id: data.user_id, email: data.email };
    const token = data.access_token;

    setSession(userData, token);
    return true;
  } catch (error) {
    console.error('Signup error:', error);
    return false;
  }
};

/**
 * Mock function to simulate logout
 */
export const mockLogout = async () => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));

  clearSession();
};

/**
 * Helper function to set cookie
 */
function setCookie(name: string, value: string, options: { expires?: Date, path?: string } = {}) {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    cookieString += `; expires=${options.expires.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  } else {
    cookieString += '; path=/';
  }

  // For localhost, we don't set domain
  // If needed for production: cookieString += '; domain=.yourdomain.com';

  document.cookie = cookieString;
}

/**
 * Helper function to get cookie
 */
function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}