import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [extraInfo, setExtraInfo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const adminEmail = "prachiigohil06@gmail.com";

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      const userData = {
        uid: user.uid,
        name,
        email,
        role,
        extraInfo,
        createdAt: new Date(),
        approved: false, // default false for non-users
      };

      if (email === adminEmail) {
        userData.role = 'admin';
        userData.approved = true; // Special admin auto-approved
      } else if (role === 'user') {
        userData.approved = true; // Normal users auto-approved
      }

      const userRef = doc(collection(db, 'users'), user.uid);
      await setDoc(userRef, userData);

      if (userData.role === 'admin' && userData.approved) {
        alert('Welcome Admin!');
        navigate('/admin-dashboard');
      } else if (role === 'moderator' || role === 'admin') {
        setSuccessMessage('Your registration request has been sent for approval.');
      } else {
        alert('Registration successful!');
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
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            required 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            required 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" 
          />

          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          >
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>

          {(role === 'user' || role === 'moderator' || role === 'admin') && (
            <input
              type="text"
              placeholder={
                role === 'user'
                  ? "Phone number"
                  : role === 'moderator'
                  ? "Moderation area"
                  : "Admin code"
              }
              value={extraInfo}
              required
              onChange={(e) => setExtraInfo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            />
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

          <motion.button 
            type="submit" 
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all"
          >
            {loading ? 'Registering..' : 'Register'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;