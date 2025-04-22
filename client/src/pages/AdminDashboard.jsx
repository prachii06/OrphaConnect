// import React from 'react';
// import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//   return (
//     <div className="flex">
//       <div className="w-1/4 bg-indigo-800 text-white p-5 h-screen">
//         <h2 className="text-xl font-semibold">Admin Dashboard</h2>
//         <ul className="mt-5 space-y-4">
//           <li><Link to="/admin/users" className="hover:text-gray-200">Manage Users</Link></li>
//           <li><Link to="/admin/events" className="hover:text-gray-200">Manage Events</Link></li>
//           <li><Link to="/admin/donations" className="hover:text-gray-200">Manage Donations</Link></li>
//           <li><Link to="/admin/reports" className="hover:text-gray-200">View Reports</Link></li>
//           <li><Link to="/admin/settings" className="hover:text-gray-200">Settings</Link></li>
//         </ul>
//       </div>
//       <div className="flex-1 p-5">
//         {/* This part will show the actual dashboard content */}
//         <h2 className="text-2xl font-semibold">Welcome, Admin</h2>
//         <p className="mt-4">Manage the orphanage, users, donations, events, and more.</p>
//         {/* Add more dynamic content based on the selected sidebar link */}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <div className="w-1/4 bg-indigo-800 text-white p-5 h-screen">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        <ul className="mt-5 space-y-4">
          <li><Link to="users" className="hover:text-gray-200">Manage Users</Link></li>
          <li><Link to="events" className="hover:text-gray-200">Manage Events</Link></li>
          <li><Link to="donations" className="hover:text-gray-200">Manage Donations</Link></li>
          <li><Link to="reports" className="hover:text-gray-200">View Reports</Link></li>
          <li><Link to="settings" className="hover:text-gray-200">Settings</Link></li>
        </ul>
      </div>
      <div className="flex-1 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;

