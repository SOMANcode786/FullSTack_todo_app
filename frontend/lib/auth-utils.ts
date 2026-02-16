// Utility function to check authentication status across the app
export const isAuthenticatedClient = (): boolean => {
  if (typeof window === 'undefined') {
    return false;
  }

  // Check if authentication flag exists
  const authFlag = localStorage.getItem('isAuthenticated');
  if (authFlag !== 'true') {
    return false;
  }

  // Check if session exists and is not expired
  const sessionData = localStorage.getItem('mock-auth-session');
  if (!sessionData) {
    return false;
  }

  try {
    const session = JSON.parse(sessionData);

    // Check if session is expired
    const now = new Date().toISOString();
    if (now >= session.expires) {
      // Session expired, clear it
      localStorage.removeItem('mock-auth-session');
      localStorage.removeItem('mock-jwt-token');
      localStorage.removeItem('isAuthenticated');
      return false;
    }

    return !!session.user?.id;
  } catch (error) {
    console.error('Error parsing session data:', error);
    return false;
  }
};

// Function to get current user ID
export const getCurrentUserId = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const sessionData = localStorage.getItem('mock-auth-session');
  if (!sessionData) {
    return null;
  }

  try {
    const session = JSON.parse(sessionData);
    return session.user?.id || null;
  } catch (error) {
    console.error('Error getting user ID:', error);
    return null;
  }
};