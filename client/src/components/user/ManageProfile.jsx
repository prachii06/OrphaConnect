import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
  updateEmail,
  updatePassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const ManageProfile = () => {
  const [userData, setUserData] = useState({ name: "", phone: "" });
  const [authUser, setAuthUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        setEmail(user.email);

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      if (authUser) {
        let updateData = {
          name: userData.name,
          phone: userData.phone,
        };

        await updateDoc(doc(db, "users", authUser.uid), updateData);
        setStatus("Profile updated successfully");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error updating profile");
    }
  };

  const handleUpdateAuth = async () => {
    try {
      if (authUser) {
        if (email !== authUser.email) {
          await updateEmail(authUser, email);
        }
        if (password.length >= 6) {
          await updatePassword(authUser, password);
        }
        setStatus("Authentication info updated successfully");
      }
    } catch (error) {
      console.log(error);
      setStatus("Error updating email/password");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Manage Profile</h2>

      {/* Removed photo area completely */}

      <label className="block mb-1 text-sm font-medium">Name</label>
      <input
        type="text"
        value={userData.name}
        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-1 text-sm font-medium">Phone</label>
      <input
        type="text"
        value={userData.phone}
        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleUpdateProfile}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6 w-full"
      >
        Update Profile Info
      </button>

      <hr className="my-6" />

      <label className="block mb-1 text-sm font-medium">Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <label className="block mb-1 text-sm font-medium">New Password</label>
      <input
        type="password"
        placeholder="Min. 6 characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      <button
        onClick={handleUpdateAuth}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Update Email & Password
      </button>

      {status && (
        <p className="mt-4 text-sm text-gray-700 font-medium text-center">
          {status}
        </p>
      )}
    </div>
  );
};

export default ManageProfile;
