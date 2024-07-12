import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div></div>;
    }

    return user ? <Navigate to={`/profile/${user.id}`} replace /> : children;
};

export default PrivateRoute;
