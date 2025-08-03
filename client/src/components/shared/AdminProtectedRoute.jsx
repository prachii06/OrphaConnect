

import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase';

const AdminProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult(true); // Force refresh
        // This is the critical check for the secure claim
        if (idTokenResult.claims.admin === true) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
      setIsChecking(false);
    };

    if (!loading) {
      checkAdminStatus();
    }
  }, [user, loading]);

  if (loading || isChecking) {
    return <div>Loading...</div>; 
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  // If they are an admin, show the page
  return children;
};

export default AdminProtectedRoute;