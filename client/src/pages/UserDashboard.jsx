import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className="flex">
      <div className="w-1/4 bg-indigo-800 text-white p-5 h-screen">
        <h2 className="text-xl font-semibold">User Dashboard</h2>
        <ul className="mt-5 space-y-4">
          <li><Link to="events" className="hover:text-gray-200">My Events</Link></li>
          <li><Link to="profile" className="hover:text-gray-200">Manage Profile</Link></li>
          <li><Link to="support" className="hover:text-gray-200">Support</Link></li>
          <li><Link to="volunteer" className="hover:text-gray-200">Volunteer Registration</Link></li>
        </ul>
      </div>
      <div className="flex-1 p-5">
        {/* Display nested content here based on the selected link */}
        <h2 className="text-2xl font-semibold">Welcome, User</h2>
        <p className="mt-4">Participate in events, manage your profile, offer support, or register as a volunteer.</p>
        <Outlet /> {/* Nested route content will appear here */}
      </div>
    </div>
  );
};

export default UserDashboard;
