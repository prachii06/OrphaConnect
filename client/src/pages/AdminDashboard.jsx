import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-indigo-800 text-white p-5 h-full">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        <ul className="mt-5 space-y-4">
          <li><Link to="users" className="hover:text-gray-200">Manage Users</Link></li>
          <li><Link to="events" className="hover:text-gray-200">Manage Events</Link></li>
          <li><Link to="donations" className="hover:text-gray-200">Manage Donations</Link></li>
          <li><Link to="reports" className="hover:text-gray-200">View Reports</Link></li>
          <li><Link to="settings" className="hover:text-gray-200">Settings</Link></li>
          <li><Link to="requests" className="hover:text-gray-200">Requests</Link></li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-5 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;

