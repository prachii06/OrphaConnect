// import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
// import Donate from './pages/Donation';
import Profile from './pages/Profile';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
// import ModeratorDashboard from './pages/ModeratorDashboard';

// Admin routes
import ManageUsers from './components/admin/ManageUsers';
import ManageEvents from './components/admin/ManageEvents';
import ManageDonations from './components/admin/ManageDonations';
import ViewReports from './components/admin/ViewReports';
import Settings from './components/admin/Settings';
import Requests from './components/admin/Requests';


// User routes
import Events from './components/user/Events';
import ManageProfile from './components/user/ManageProfile';
import Support from './components/user/Support';
import VolunteerReg from './components/user/VolunteerReg';
import Donate from './components/user/Donate';

import AdminProtectedRoute from './components/shared/AdminProtectedRoute';

import HomeButton from './components/HomeButton';

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/donate" element={<Donation/>} /> */}
      <Route path="/children" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/gallery"  element={<Gallery />} />

      {/* User Dashboard Routes */}
      <Route path="/user-dashboard" element={<UserDashboard />}>
        <Route path="events" element={<Events />} />
        <Route path="profile" element={<ManageProfile />} />
        <Route path="support" element={<Support />} />
        <Route path="volunteer" element={<VolunteerReg />} />
        <Route path="donate" element={<Donate />} />
        <Route path="home" element={<HomeButton />} />
      </Route>

     

      {/* Admin Dashboard Routes */}
<Route 
        path="/admin-dashboard" 
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      >
        <Route path="users" element={<ManageUsers />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="donations" element={<ManageDonations />} />
        <Route path="reports" element={<ViewReports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="requests" element={<Requests />} />
      </Route>
    </Routes>
  );
}

export default App;

