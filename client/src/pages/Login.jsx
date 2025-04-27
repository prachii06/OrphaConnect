import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase'; 
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      //checking user in database
      const userRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        
        // If user is admin and approved
        if (userData.role === 'admin' && userData.approved === true) {
          navigate('/admin-dashboard');  
        } else if (userData.role === 'user') {
          navigate('/user-dashboard'); 
        } else {
          setError('You are not approved yet or not registered as a user.');
        }
      } else {
        setError('User not found!');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleGoogleSignIn = async () => {
  //   const provider = new GoogleAuthProvider();
  //   try {
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;

  //     // Check user in Firestore (users collection)
  //     const userRef = doc(db, 'users', user.uid);
  //     const docSnap = await getDoc(userRef);

  //     if (docSnap.exists()) {
  //       const userData = docSnap.data();

  //       // If user is admin and approved
  //       if (userData.role === 'admin' && userData.approved === true) {
  //         navigate('/admin-dashboard');  // Admin Dashboard
  //       } else if (userData.role === 'user') {
  //         navigate('/user-dashboard');  // User Dashboard
  //       } else {
  //         setError('You are not approved yet or not registered as a user.');
  //       }
  //     } else {
  //       setError('User not found!');
  //     }
  //   } catch (err) {
  //     setError('Google login failed. Please try again.');
  //     console.error(err.message);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <span
            className="text-indigo-600 hover:underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register
          </span>
        </p>

        {/* <div className="mt-6 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Login with Google
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Login;



