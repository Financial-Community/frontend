import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ path, element: Component }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route path={path} element={Component} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
