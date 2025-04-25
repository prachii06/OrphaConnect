import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // import your Firebase configuration

const ViewReports = () => {
  const [events, setEvents] = useState([]);
  const [donations, setDonations] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      // Fetch events data
      const eventsSnapshot = await getDocs(collection(db, 'events'));
      const eventsData = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);

      // Fetch donations data
      const donationsSnapshot = await getDocs(collection(db, 'donations'));
      const donationsData = donationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonations(donationsData);

      // Fetch users data
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    };

    fetchData();
  }, []);

  // Calculate event registrations
  const totalRegistrations = events.reduce((acc, event) => acc + (event.registrations?.length || 0), 0);

  // Calculate total donation amount
  const totalDonations = donations.reduce((acc, donation) => acc + donation.amount, 0);

  // Display the report data
  return (
    <div className="p-8 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Reports</h2>

      {/* Event Stats Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Event Stats</h3>
          <p className="text-xl text-gray-600 mb-2">Total Events: <span className="font-bold text-indigo-600">{events.length}</span></p>
          <p className="text-xl text-gray-600">Total Registrations: <span className="font-bold text-indigo-600">{totalRegistrations}</span></p>
        </div>

        {/* Donation Stats Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Donation Stats</h3>
          <p className="text-xl text-gray-600 mb-2">Total Donations: <span className="font-bold text-indigo-600">${totalDonations}</span></p>
          <p className="text-xl text-gray-600">Total Donors: <span className="font-bold text-indigo-600">{donations.length}</span></p>
        </div>

        {/* User Stats Card */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">User Stats</h3>
          <p className="text-xl text-gray-600">Total Users: <span className="font-bold text-indigo-600">{users.length}</span></p>
        </div>
      </div>

      {/* Detailed Events Table */}
      <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
        <h3 className="text-2xl font-semibold text-gray-700 p-6">Detailed Event Report</h3>
        <div className="overflow-x-auto p-6">
          <table className="min-w-full text-left table-auto border-collapse">
            <thead>
              <tr className="bg-indigo-100">
                <th className="py-2 px-4 text-sm font-semibold text-gray-600">Event Name</th>
                <th className="py-2 px-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="py-2 px-4 text-sm font-semibold text-gray-600">Total Registrations</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} className="hover:bg-indigo-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{event.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{event.date}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{event.registrations?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Donations List */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Donation Details</h3>
        <ul className="space-y-4">
          {donations.map(donation => (
            <li key={donation.id} className="flex justify-between items-center p-4 border-b">
              <span className="text-lg text-gray-800">{donation.donorName} donated</span>
              <span className="text-xl font-semibold text-indigo-600">${donation.amount}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewReports;
