import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const ManageUsers = () => {
  const [supportQueries, setSupportQueries] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    const fetchSupportQueries = async () => {
      const querySnapshot = await getDocs(collection(db, 'supportQueries'));
      const queriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSupportQueries(queriesData);
    };

    const fetchVolunteers = async () => {
      const snapshot = await getDocs(collection(db, 'volunteers'));
      const volunteerData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVolunteers(volunteerData);
    };

    fetchSupportQueries();
    fetchVolunteers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {/* Support Queries Section */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Support Queries</h3>
        <div className="space-y-4">
          {supportQueries.length === 0 ? (
            <p>No support queries available.</p>
          ) : (
            supportQueries.map((query) => (
              <div key={query.id} className="p-4 border rounded-lg shadow">
                <p className="font-semibold">{query.name}</p>
                <p>{query.message}</p>
                <p className="text-sm text-gray-600">
                  Submitted on:{" "}
                  {new Date(query.timestamp.seconds * 1000).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Manage Volunteers Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">Manage Volunteers</h3>
        <div className="space-y-4">
          {volunteers.length === 0 ? (
            <p>No volunteers have registered yet.</p>
          ) : (
            volunteers.map((vol) => (
              <div key={vol.id} className="p-4 border rounded-lg shadow bg-white">
                <p><span className="font-semibold">Name:</span> {vol.name}</p>
                <p><span className="font-semibold">Email:</span> {vol.email}</p>
                <p><span className="font-semibold">Phone:</span> {vol.phone}</p>
                <p><span className="font-semibold">Skills:</span> {vol.skills}</p>
                <p><span className="font-semibold">Availability:</span> {vol.availability}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
