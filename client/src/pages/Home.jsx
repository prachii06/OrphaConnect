

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(false);

  // Check for the user session on page load
  useEffect(() => {
    const sessionData = JSON.parse(localStorage.getItem('userSession'));

    if (sessionData) {
      const currentTime = new Date().getTime();
      const sessionExpiration = sessionData.timestamp + (24 * 60 * 60 * 1000); // 24 hours expiration time

      if (currentTime <= sessionExpiration) {
        setIsLoggedIn(true);
        setIsSessionValid(true);
      } else {
        localStorage.removeItem('userSession'); // Remove expired session data
        setIsLoggedIn(false);
        setIsSessionValid(false);
      }
    }
  }, []);

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleRegisterClick = () => {
    window.location.href = '/register';
  };

  const handleDashboardClick = () => {
    window.location.href = '/user-dashboard';
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('userSession');
    setIsLoggedIn(false);
    setIsSessionValid(false);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-indigo-100 font-sans">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <img
            src="/logo.png"
            alt="OrphaConnect Logo"
            className="h-10 w-auto object-contain"
          />
          <div className="flex space-x-6">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleDashboardClick}
                  className="bg-indigo-700 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-500 transition"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={handleLogoutClick}
                  className="bg-indigo-700 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-500 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleLoginClick}
                  className="bg-indigo-700 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-500 transition"
                >
                  Login
                </button>
                <button
                  onClick={handleRegisterClick}
                  className="bg-indigo-700 text-white py-2 px-6 rounded-lg font-semibold hover:bg-indigo-500 transition"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center text-center py-20 px-6">
        <motion.h2
          className="text-5xl font-bold text-indigo-700 mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.75 }}
        >
          Welcome to OrphaConnect
        </motion.h2>

        <motion.p
          className="text-xl text-pink-700 italic max-w-xl mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.7 }}
        >
          Helping orphanages stay organized and connected!
        </motion.p>

        <div className="text-center max-w-lg mb-12">
          <p className="text-lg text-gray-700 mb-4">
            At OrphaConnect, we aim to make a lasting impact by connecting people who want to help orphanages,
            children, and families in need. Together, we can create a brighter future!
          </p>
          <p className="text-lg text-gray-600">
            Join us in our mission to provide care, opportunities, and love for every child.
          </p>
        </div>

        <Link to="/gallery" className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Photo Gallery
        </Link>

        <div className="overflow-hidden w-full max-w-xl mt-20">
          <motion.div
            className="flex space-x-12 text-lg italic font-medium text-gray-700 whitespace-nowrap animate-slide-left"
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
          >
            <span>• View and manage orphanage events</span>
            <span>• Join our volunteer team and make an impact</span>
            <span>• Contribute to the brighter future</span>

          </motion.div>
        </div>
      </div>

      <footer className="bg-indigo-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-start space-x-12">
            <div className="flex-1">
              <h2 className="font-semibold text-xl">About Us</h2>
              <p className="mt-2 text-base">
                OrphaConnect is dedicated to improving the lives of orphaned children by connecting them with people who care.
                Our mission is to provide care, opportunities, and a brighter future for every child in need.
              </p>
            </div>

            <div className="flex-1 text-right">
              <h3 className="font-semibold text-lg">
                OrphaConnect exists because of people like you — those who care and want to make a difference. Thank you for your
                continued support as we work towards building a better future for orphaned children.
              </h3>
              <p className="mt-2 text-base">
                "At OrphaConnect, we strive to create a community where every child can thrive. Together, we can make a real difference!"
              </p>
              <p className="mt-4 text-sm">~ Prachi Gohil, Manager of OrphaConnect</p>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center mt-8">
            <p className="text-sm">&copy; 2025 OrphaConnect. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;



