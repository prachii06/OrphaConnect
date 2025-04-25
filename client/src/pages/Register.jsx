// import React, { useState } from 'react';
// import { motion } from 'framer-motion';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('');
//   const [extraInfo, setExtraInfo] = useState('');

//   const handleRegister = (e) => {
//     e.preventDefault();
//     console.log('Registering:', name, email, password, role, extraInfo);
//     // Add your backend/fetch call here
//   };

//   const handleRoleChange = (e) => {
//     setRole(e.target.value);
//     setExtraInfo(''); // Reset extra info when the role changes
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-indigo-100 px-4">
//       <motion.div
//         className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">Create an Account</h2>

//         <form onSubmit={handleRegister} className="space-y-5">
//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
//             <input
//               type="text"
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Your full name"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               placeholder="Create a password"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Select Role</label>
//             <select
//               value={role}
//               onChange={handleRoleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             >
//               <option value="">Select a role</option>
//               <option value="user">User</option>
//               <option value="admin">Admin</option>
//               <option value="moderator">Moderator</option>
//             </select>
//           </div>

//           {role === 'user' && (
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">Phone Number</label>
//               <input
//                 type="text"
//                 value={extraInfo}
//                 onChange={(e) => setExtraInfo(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Your phone number"
//               />
//             </div>
//           )}

//           {role === 'admin' && (
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">Admin Code</label>
//               <input
//                 type="text"
//                 value={extraInfo}
//                 onChange={(e) => setExtraInfo(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter admin code"
//               />
//             </div>
//           )}

//           {role === 'moderator' && (
//             <div>
//               <label className="block mb-1 text-sm font-medium text-gray-700">Moderation Area</label>
//               <input
//                 type="text"
//                 value={extraInfo}
//                 onChange={(e) => setExtraInfo(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Specify moderation area"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
//           >
//             Register
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;




import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase'; // Adjust the import path as necessary
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Set display name
      await updateProfile(user, { displayName: name });

      // 3. Save additional user data in Firestore
      const userRef = doc(collection(db, 'users'), user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name,
        email,
        role,
        extraInfo,
        createdAt: new Date(),
      });

      alert('Registration successful!');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
