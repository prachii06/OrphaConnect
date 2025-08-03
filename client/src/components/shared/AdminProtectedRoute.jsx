import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

const AdminProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [isApprovedAdmin, setIsApprovedAdmin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const checkAdminApproval = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().status === "approved" && docSnap.data.role === "admin"){
          setIsApprovedAdmin(true);
        } else {
          setIsApprovedAdmin(false);
        }
      }
      setCheckingStatus(false);
    };

    if (!loading) {
      checkAdminApproval();
    }
  }, [user, loading]);

  if (loading || checkingStatus) {
    return <div>Loading...</div>;
  }

  if (!user || !isApprovedAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
