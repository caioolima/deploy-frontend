import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // Tempo de atraso em milissegundos (1000ms = 1 segundo)

        return () => clearTimeout(timer);
    }, []);

    return isLoading ?<div></div> : (user ? <Navigate to={`/profile/${user.id}`} replace /> : children);
};

export default PrivateRoute;