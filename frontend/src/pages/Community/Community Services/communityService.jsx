export const checkMembership = async (userId, communityId) => {
    try {
      const response = await fetch(`https://connecter-server-033a278d1512.herokuapp.com/communities/comunidade/verificar/${userId}/${communityId}`);
      if (response.ok) {
        const { message } = await response.json();
        return message === 'Usuário está na comunidade';
      } else {
        throw new Error("Erro ao verificar a associação do usuário com a comunidade");
      }
    } catch (error) {
      console.error("Erro ao verificar a associação do usuário com a comunidade:", error);
      throw error;
    }
  };
  
  export const joinCommunity = async (userId, communityId) => {
    try {
      const response = await fetch(`https://connecter-server-033a278d1512.herokuapp.com/communities/comunidade/entrar/${userId}/${communityId}`, {
        method: "POST",
      });
      if (response.ok) {
        return true;
      } else {
        throw new Error("Falha ao entrar na comunidade");
      }
    } catch (error) {
      console.error("Erro ao entrar na comunidade:", error);
      throw error;
    }
  };
  