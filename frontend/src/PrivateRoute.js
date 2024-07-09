import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/use-auth";

const PrivateRoute = ({ children }) => {
    const { user, isAuthenticating } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    useEffect(() => {
        // Quando a autenticação estiver completa
        if (!isAuthenticating) {
            setIsLoading(false);
        }
    }, [isAuthenticating]);

    // Exibe um placeholder ou mensagem enquanto está verificando a autenticação
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Se o usuário estiver autenticado
    if (user) {
        // Se o usuário está tentando acessar uma rota de perfil e já está autenticado
        if (location.pathname.startsWith('/profile')) {
            // Renderiza o conteúdo da rota protegida
            return children;
        }
        // Se o usuário está autenticado e não está acessando uma página de perfil
        // Redireciona para a página de perfil
        return <Navigate to={`/profile/${user.id}`} replace />;
    }

    // Se o usuário não estiver autenticado, redireciona para a página inicial ou de login
    return <Navigate to="/home" replace />;
};

export default PrivateRoute;
