import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust path if needed

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      // Firestore query: only fetch admin users who are NOT approved
      const q = query(
        collection(db, 'users'),
        where('role', '==', 'admin'),
        where('approved', '==', false)
      );

      const snapshot = await getDocs(q);
      const pendingRequests = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setRequests(pendingRequests);
    } catch (error) {
      console.error('Error fetching admin requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const userRef = doc(db, 'users', id);
      await updateDoc(userRef, { approved: true });

      alert('Admin request approved!');
      fetchRequests(); // Refresh the list after approving
    } catch (error) {
      console.error('Error approving admin:', error);
      alert('Error approving admin.');
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">Pending Admin Requests</h2>

      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-600">No pending admin requests.</p>
      ) : (
        <div className="w-full max-w-2xl space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
              <div>
                <p className="font-semibold">{req.name}</p>
                <p className="text-sm text-gray-500">{req.email}</p>
              </div>
              <button
                onClick={() => handleApprove(req.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
