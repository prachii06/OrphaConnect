

import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const developerAdminEmail = import.meta.env.VITE_ADMIN_EMAIL;
  const developerAdminPwd = import.meta.env.VITE_ADMIN_PWD;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const isDeveloperAdmin = (email === developerAdminEmail && password === developerAdminPwd);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });

      let userData;

      if (isDeveloperAdmin) {
        userData = {
          uid: user.uid,
          name,
          email,
          phoneNumber,
          role: 'admin',
          status: 'approved',
          createdAt: serverTimestamp(),
        };
      } else {
        const isRequestingAdmin = role === 'admin';
        userData = {
          uid: user.uid,
          name,
          email,
          phoneNumber,
          role: 'user',
          status: isRequestingAdmin ? 'pending_approval' : 'approved',
          createdAt: serverTimestamp(),
        };
      }

      await setDoc(doc(db, 'users', user.uid), userData);
      await signOut(auth);

      if (isDeveloperAdmin) {
        alert('Admin registered successfully. Please log in.');
        navigate('/login');
      } else if (role === 'admin') {
        setSuccessMessage('Registered! Admin request sent. Await approval.');
      } else {
        alert('Registration successful! Please log in.');
        navigate('/login');
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100 px-4">
      <HomeButton />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Phone number"
            value={phoneNumber}
            required
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="user">User</option>
            <option value="admin">Request Admin Access</option>
          </select>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
