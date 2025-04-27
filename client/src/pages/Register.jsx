import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

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

  const adminEmail = "prachiigohil06@gmail.com"; // special admin email

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      //create
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

     //update
      await updateProfile(user, { displayName: name });

      //user data
      const userData = {
        uid: user.uid,
        name,
        email,
        role,
        extraInfo,
        createdAt: new Date(),
      };

      
      if (email === adminEmail) {
        userData.role = 'admin';
        userData.approved = true; 
      } else if (role === 'admin') {
        userData.approved = false; 
      }

     //saving user to firestore
      const userRef = doc(collection(db, 'users'), user.uid);
      await setDoc(userRef, userData);

    
      if (email === adminEmail) {
        alert('Welcome Admin!');
        navigate('/admin-dashboard');
      } else if (role === 'admin') {
        setSuccessMessage('Your registration for admin is sent for approval.');
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

  
  /*
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(collection(db, 'users'), user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        role: user.email === adminEmail ? 'admin' : 'user',
        approved: user.email === adminEmail ? true : undefined,
        createdAt: new Date(),
      });

      if (user.email === adminEmail) {
        alert('Welcome Admin!');
        navigate('/admin-dashboard');
      } else {
        alert('Registration successful!');
        navigate('/login');
      }

    } catch (error) {
      setError(error.message);
    }
  };
  */

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
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

    
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>

         
          {role === 'user' && (
            <input
              type="text"
              placeholder="Phone number"
              value={extraInfo}
              required
              onChange={(e) => setExtraInfo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          )}
          {role === 'moderator' && (
            <input
              type="text"
              placeholder="Moderation area"
              value={extraInfo}
              required
              onChange={(e) => setExtraInfo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          )}
          {role === 'admin' && (
            <input
              type="text"
              placeholder="Admin code"
              value={extraInfo}
              required
              onChange={(e) => setExtraInfo(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          )}

          
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

         
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        
        {/* 
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Register with Google
          </button>
        </div>
        */}
      </div>
    </div>
  );
};

export default Register;


