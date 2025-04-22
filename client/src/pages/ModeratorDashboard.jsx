import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ModeratorDashboard = () => {
  return (
    <div className="flex">
      <div className="w-1/4 bg-indigo-800 text-white p-5 h-screen">
        <h2 className="text-xl font-semibold">Moderator Dashboard</h2>
        <ul className="mt-5 space-y-4">
          <li><Link to="donations" className="hover:text-gray-200">Manage Donations</Link></li>
          <li><Link to="education" className="hover:text-gray-200">Monitor Education</Link></li>
          <li><Link to="reports" className="hover:text-gray-200">View Moderation Reports</Link></li>
        </ul>
      </div>
      <div className="flex-1 p-5">
        {/* Display nested content here based on the selected link */}
        <h2 className="text-2xl font-semibold">Welcome, Moderator</h2>
        <p className="mt-4">Manage donations, monitor education, and view moderation reports.</p>
        <Outlet /> {/* Nested route content will appear here */}
      </div>
    </div>
  );
};

export default ModeratorDashboard;
