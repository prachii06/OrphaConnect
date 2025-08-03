

import React, { useEffect, useState } from 'react';    
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useAuthState } from 'react-firebase-hooks/auth';
import HomeButton from '../components/HomeButton';

const Login = () => {
  const navigate = useNavigate();
  const [user, loadingUser] = useAuthState(auth); // Detect logged in user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch user role from Firestore when user is logged in
    const fetchUserRole = async () => {
      if (user) {
        const docSnap = await getDoc(doc(db, 'users', user.uid));
        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
        }
      }
    };
    fetchUserRole();
  }, [user]);

  const navigateBasedOnRole = (role) => {
    if (role === 'admin') navigate('/admin-dashboard');
    else if (role === 'moderator') navigate('/moderator-dashboard');
    else if (role === 'user') navigate('/user-dashboard');
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUserRole(null);
    navigate('/login');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;

      const docSnap = await getDoc(doc(db, 'users', loggedInUser.uid));
      if (!docSnap.exists()) {
        setError('User not found.');
        setLoading(false);
        return;
      }

      const userData = docSnap.data();

      if ((userData.role === 'admin' || userData.role === 'moderator') && userData.status !== 'approved') {
        setError('Your account is awaiting approval.');
        setLoading(false);
        return;
      }

      navigateBasedOnRole(userData.role);

    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  // If user already logged in
  if (user && userRole) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-indigo-100 px-4 space-y-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center"
        >
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">You are already logged in.</h2>
          <button
            onClick={() => navigateBasedOnRole(userRole)}
            className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 mr-4"
          >
            Go to Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </motion.div>
      </div>
    );
  }

  // Else show login form
  return (

    <div className="min-h-screen flex items-center justify-center bg-indigo-100 px-4">
      <HomeButton />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
