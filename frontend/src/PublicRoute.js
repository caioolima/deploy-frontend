import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? <Navigate to={`/profile/${user.id}`} /> : children;
};

export default PublicRoute;
