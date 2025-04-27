// import React, { useState } from 'react';
// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import {GoogleAuthProvider} from 'firebase/auth';
// import { collection, doc, setDoc } from 'firebase/firestore';
// import { auth, db } from '../firebase'; // Adjust the import path as necessary
// import { useNavigate } from 'react-router-dom';

// const Register = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user');
//   const [extraInfo, setExtraInfo] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       // 1. Create user with email and password
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
      

//       // 2. Set display name
//       await updateProfile(user, { displayName: name });

//       // 3. Save additional user data in Firestore
//       const userRef = doc(collection(db, 'users'), user.uid);
//       await setDoc(userRef, {
//         uid: user.uid,
//         name,
//         email,
//         role,
//         extraInfo,
//         createdAt: new Date(),
//       });

//       alert('Registration successful!');
//       navigate('/login');
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignIin = async () => {
//     const provider = new GoogleAuthProvider();
//     try{
//       const result = await signInWithPopup(auth,provider);
//       const user = result.user;

//       //to save user info 
//       const userRef = doc(collection(db,'users'),user.uid);
//       await setDoc(userRef, {
//         uid : user.uid,
//         name: user.displayName,
//         email: user.email,
//         role: 'user',
//         createdAt: new Date(),

//       });
//       alert("google signin successfull");
//       navigate('/login')
//     }catch(error){
//       setError(error.message);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-indigo-100 px-4">
//       <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Register</h2>
//         <form onSubmit={handleRegister} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             required
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             required
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             required
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//           />

//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg"
//           >
//             <option value="user">User</option>
//             <option value="moderator">Moderator</option>
//             <option value="admin">Admin</option>
//           </select>

//           {role === 'user' && (
//             <input
//               type="text"
//               placeholder="Phone number"
//               value={extraInfo}
//               required
//               onChange={(e) => setExtraInfo(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg"
//             />
//           )}

//           {role === 'moderator' && (
//             <input
//               type="text"
//               placeholder="Moderation area"
//               value={extraInfo}
//               required
//               onChange={(e) => setExtraInfo(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg"
//             />
//           )}

//           {role === 'admin' && (
//             <input
//               type="text"
//               placeholder="Admin code"
//               value={extraInfo}
//               required
//               onChange={(e) => setExtraInfo(e.target.value)}
//               className="w-full px-4 py-2 border rounded-lg"
//             />
//           )}

//           {error && <p className="text-red-600 text-sm">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
//           >
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
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

  const adminEmail = "prachiigohil06@gmail.com";

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // 1. Create user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update profile
      await updateProfile(user, { displayName: name });

      // 3. Prepare user data
      const userData = {
        uid: user.uid,
        name,
        email,
        role,
        extraInfo,
        createdAt: new Date(),
      };

      // 4. If admin, add approved: false
      if (role === 'admin') {
        userData.approved = false;
      }

      // 5. Save to Firestore
      const userRef = doc(collection(db, 'users'), user.uid);
      await setDoc(userRef, userData);

      // 6. Handle success
      if (role === 'admin') {
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

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if email matches admin
      if (user.email === adminEmail) {
        alert('Registration successful!');
        navigate('/login');
      } else {
        setSuccessMessage('Your registration for admin is sent for approval.');
      }

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-4">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Name */}
          <input
            type="text"
            placeholder="Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />

          {/* Role */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Admin</option>
          </select>

          {/* Extra Info depending on Role */}
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

          {/* Error/Success Messages */}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Google Sign-In */}
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700"
          >
            Register with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;


