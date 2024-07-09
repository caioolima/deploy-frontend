import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

const axiosInstance = axios.create({
    baseURL: "https://connecter-server-033a278d1512.herokuapp.com/"
    // Você pode configurar headers comuns aqui se necessário
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const navigate = useNavigate();
    
    const handleLogout = useCallback(() => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/home");
    }, [navigate]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchUserProfile = async () => {
            try {
                const response = await axiosInstance.get("/profile");

                setUser({ ...response.data, id: response.data._id });
            } catch (error) {
                handleLogout();
            }
        };

        if (token) {
            axiosInstance.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;
            fetchUserProfile();
        } else {
            setUser(null);
        }
    }, [handleLogout]);

    const handleLogin = async ({ email, password }) => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                email,
                password
            });

            if (response.data.token) {
                setUser({ id: response.data.userId });
                localStorage.setItem("token", response.data.token);
            }

            return { userId: response.data.userId };
        } catch (error) {
            throw new Error(
                "Falha ao fazer login. Verifique suas credenciais."
            );
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, signIn: handleLogin, signOut: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}