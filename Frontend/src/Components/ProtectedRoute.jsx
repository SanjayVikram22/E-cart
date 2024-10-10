import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const storedEmail = localStorage.getItem("email");

  if (storedEmail !== "admin@gmail.com" && storedEmail !== "cbmsanjay2004@gmail.com") {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
