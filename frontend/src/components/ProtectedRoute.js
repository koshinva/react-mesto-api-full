import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ loggedIn, children, ...props }) {
  return loggedIn ? children : <Navigate to="/sign-up" />;
}

export default ProtectedRoute;
