import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext({});

const axiosInstance = axios.create({
  baseURL: "https://server-repository.onrender.com/",
  // Você pode configurar headers comuns aqui se necessário
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    // Remover o token do localStorage
    localStorage.removeItem("token");

    // Limpar o estado do usuário
    setUser(null);
    setLoading(false);

    // Redirecionar o usuário para a página inicial e limpar o histórico de navegação
    navigate("/home", { replace: true });

    // Limpar o histórico de navegação para garantir que o usuário não possa voltar à página anterior
    window.history.pushState(null, "", "/home");
    window.history.go(0);
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("/profile");
        setUser({ ...response.data, id: response.data._id });
      } catch (error) {
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [handleLogout]);

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        setUser({ id: response.data.userId });
        localStorage.setItem("token", response.data.token);
      }

      return { userId: response.data.userId };
    } catch (error) {
      throw new Error("Falha ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, signIn: handleLogin, signOut: handleLogout, loading }}
    >
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
