// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, condition, redirectTo }) => {
  const userLoggedInfo = useSelector(state => state.UserLogued);

  if (!condition(userLoggedInfo)) {
    const redirectPath = redirectTo(userLoggedInfo);
    return <Navigate to={redirectPath} />;
  }

  return children;
};

export default ProtectedRoute;
