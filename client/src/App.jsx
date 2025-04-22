// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Donate from './pages/Donate';
// import Profile from './pages/profile';
// import Register from './pages/Register';
// import UserDashboard from './pages/UserDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import ModeratorDashboard from './pages/ModeratorDashboard';

// // Import nested admin components
// import ManageUsers from './components/admin/ManageUsers';
// import ManageEvents from './components/admin/ManageEvents';
// import ManageDonations from './components/admin/ManageDonations';
// import ViewReports from './components/admin/ViewReports';
// import Settings from './components/admin/Settings';

// function App() {
//   return (
//     <Routes>
//       {/* Top-Level Routes */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/donate" element={<Donate />} />
//       <Route path="/children" element={<Profile />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/user-dashboard" element={<UserDashboard />} />
//       <Route path="/moderator-dashboard" element={<ModeratorDashboard />} />

//       {/* Nested Admin Routes */}
//       <Route path="/admin-dashboard" element={<AdminDashboard />}>
//         <Route path="users" element={<ManageUsers />} />
//         <Route path="events" element={<ManageEvents />} />
//         <Route path="donations" element={<ManageDonations />} />
//         <Route path="reports" element={<ViewReports />} />
//         <Route path="settings" element={<Settings />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;


// import React from 'react';
// import { Routes, Route } from 'react-router-dom';

// import Home from './pages/Home';
// import Login from './pages/Login';
// import Donate from './pages/Donate';
// import Profile from './pages/Profile';
// import Register from './pages/Register';
// import UserDashboard from './pages/UserDashboard';
// import AdminDashboard from './pages/AdminDashboard';
// import ModeratorDashboard from './pages/ModeratorDashboard';

// // Admin routes (corrected paths)
// import ManageUsers from './components/admin/ManageUsers';
// import ManageEvents from './components/admin/ManageEvents';
// import ManageDonations from './components/admin/ManageDonations';
// import ViewReports from './components/admin/ViewReports';
// import Settings from './components/admin/Settings';

// // Moderator routes
// import DonationManagement from './components/moderator/DonationManagement';
// import EducationMonitoring from './components/moderator/EducationMonitoring';
// import ModerationReports from './components/moderator/ModerationReports';

// // User routes
// import MyEvents from './components/user/MyEvents';
// import ManageProfile from './components/user/ManageProfile';
// import Support from './components/user/Support';
// import VolunteerReg from './components/user/VolunteerReg';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/donate" element={<Donate />} />
//       <Route path="/children" element={<Profile />} />
//       <Route path="/register" element={<Register />} />

//       {/* User Dashboard Routes */}
//       <Route path="/user-dashboard" element={<UserDashboard />}>
//         <Route path="donations" element={<MakeDonation />} />
//         <Route path="events" element={<ViewEvents />} />
//         <Route path="profile" element={<ManageProfile />} />
//       </Route>

//       {/* Moderator Dashboard Routes */}
//       <Route path="/moderator-dashboard" element={<ModeratorDashboard />}>
//         <Route path="events" element={<EventModeration />} />
//         <Route path="content" element={<ContentModeration />} />
//         <Route path="reports" element={<Reports />} />
//       </Route>

//       {/* Admin Dashboard Routes */}
//       <Route path="/admin-dashboard" element={<AdminDashboard />}>
//         <Route path="users" element={<ManageUsers />} />
//         <Route path="events" element={<ManageEvents />} />
//         <Route path="donations" element={<ManageDonations />} />
//         <Route path="reports" element={<ViewReports />} />
//         <Route path="settings" element={<Settings />} />
//       </Route>
//     </Routes>
//   );
// }

// export default Appimport React from 'react';


import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Donate from './pages/Donate';
import Profile from './pages/Profile';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ModeratorDashboard from './pages/ModeratorDashboard';

// Admin routes
import ManageUsers from './components/admin/ManageUsers';
import ManageEvents from './components/admin/ManageEvents';
import ManageDonations from './components/admin/ManageDonations';
import ViewReports from './components/admin/ViewReports';
import Settings from './components/admin/Settings';

// Moderator routes
import DonationManagement from './components/moderator/DonationManagement';
import EducationMonitoring from './components/moderator/EducationMonitoring';
import ModerationReports from './components/moderator/ModerationReports';

// User routes
import MyEvents from './components/user/MyEvents';
import ManageProfile from './components/user/ManageProfile';
import Support from './components/user/Support';
import VolunteerReg from './components/user/VolunteerReg';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/children" element={<Profile />} />
      <Route path="/register" element={<Register />} />

      {/* User Dashboard Routes */}
      <Route path="/user-dashboard" element={<UserDashboard />}>
        <Route path="events" element={<MyEvents />} />
        <Route path="profile" element={<ManageProfile />} />
        <Route path="support" element={<Support />} />
        <Route path="volunteer" element={<VolunteerReg />} />
      </Route>

      {/* Moderator Dashboard Routes */}
      <Route path="/moderator-dashboard" element={<ModeratorDashboard />}>
        <Route path="donations" element={<DonationManagement />} />
        <Route path="education" element={<EducationMonitoring />} />
        <Route path="reports" element={<ModerationReports />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route path="/admin-dashboard" element={<AdminDashboard />}>
        <Route path="users" element={<ManageUsers />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="donations" element={<ManageDonations />} />
        <Route path="reports" element={<ViewReports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
