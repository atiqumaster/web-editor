import React, { useMemo } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
      // Memoize the user check to prevent unnecessary re-renders
      const user = useSelector((state) => state.auth.user);
      const isAuthenticated = useMemo(() => Boolean(user), [user]);
  
      return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
