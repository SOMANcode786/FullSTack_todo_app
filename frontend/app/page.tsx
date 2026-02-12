import Link from 'next/link';
import LandingNavbar from '@/components/Navbar/LandingNavbar';

export default function HomePage() {
  return (
    <div className="min-h-screen animated-gradient">
      <LandingNavbar />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center animate-fadeIn">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl">
              <span className="block mb-2">Organize Your Life</span>
              <span className="block text-yellow-300 animate-pulse">
                With TodoApp
              </span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">
              A secure, full-featured todo application with authentication and task management.
              Organize your work efficiently and securely with our intuitive interface.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/signup"
                className="px-10 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-lg font-bold rounded-2xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 shadow-2xl transform hover:scale-105 flex items-center justify-center"
              >
                Get Started Free
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/login"
                className="px-10 py-5 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white text-lg font-bold rounded-2xl hover:bg-white/20 transition-all duration-300 shadow-xl flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Powerful Features
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Everything you need to stay organized and productive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature Card 1 */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/30 transform hover:scale-105 transition-all duration-500 animate-fadeIn">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Secure Authentication</h3>
            <p className="text-gray-600 text-lg">
              Your data is protected with JWT-based authentication. Login securely and manage your tasks with confidence.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/30 transform hover:scale-105 transition-all duration-500 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Task Management</h3>
            <p className="text-gray-600 text-lg">
              Create, update, and organize your tasks effortlessly. Mark tasks as complete and track your progress.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/30 transform hover:scale-105 transition-all duration-500 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
            <p className="text-gray-600 text-lg">
              Built with modern technologies for blazing fast performance. Your tasks load instantly, every time.
            </p>
          </div>

          {/* Feature Card 4 */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/30 transform hover:scale-105 transition-all duration-500 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Responsive Design</h3>
            <p className="text-gray-600 text-lg">
              Works perfectly on all devices. Manage your tasks on desktop, tablet, or mobile with ease.
            </p>
          </div>

          {/* Feature Card 5 */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/30 transform hover:scale-105 transition-all duration-500 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Beautiful UI</h3>
            <p className="text-gray-600 text-lg">
              Enjoy a modern, intuitive interface with smooth animations and gradient designs that make work fun.
            </p>
          </div>

          {/* Feature Card 6 */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-white/30 transform hover:scale-105 transition-all duration-500 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Data Privacy</h3>
            <p className="text-gray-600 text-lg">
              Your tasks are private and isolated. Only you can see and manage your personal todo list.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border-2 border-white/30 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Get Organized?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their tasks efficiently with TodoApp.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl transform hover:scale-105"
          >
            Start Free Today
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
