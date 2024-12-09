import React, { useEffect } from "react";
import Header from "../../components/Header/header"; // Atualize o caminho para Header.js
import Form from "../../components/Form/form"; // Atualize o caminho para Form.js
import Footer from "../../components/Footer/footer.jsx";
import { useAuth } from "../../hooks/use-auth";
import { useNavigate } from "react-router-dom";
function HomeScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    console.log("Tentativa de login");
  };
  useEffect(() => {
    if (user) {
      // Se o usuário estiver logado, redirecione para o perfil
      navigate(`/profile/${user.id}`, { replace: true });
    }
  }, [user, navigate]);
  return (
    <div className="container-home">
      <div className="content">
        <Header />
        <Form onSubmit={handleLogin} buttonText="Entrar" />
      </div>
      <Footer />
    </div>
  );
}

export default HomeScreen;
