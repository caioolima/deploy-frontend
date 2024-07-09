// communityService.js

export const fetchComunidades = async () => {
  try {
    const response = await fetch("https://connecter-server-033a278d1512.herokuapp.com/communities/comunidade/listar");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar comunidades:", error);
    throw error;
  }
};

export const fetchNumeroMembros = async (communityId) => {
  try {
    const response = await fetch(`https://connecter-server-033a278d1512.herokuapp.com/communities/comunidade/contarMembros/${communityId}`);
    const data = await response.json();
    return data.numberOfMembers;
  } catch (error) {
    console.error("Erro ao buscar o número de membros da comunidade:", error);
    throw error;
  }
};

export const fetchTopFollowedUsers = async () => {
  try {
    const response = await fetch("https://connecter-server-033a278d1512.herokuapp.com/user/top-followed");
    const data = await response.json();
    return data.topFollowedUsers;
  } catch (error) {
    console.error("Erro ao buscar os top usuários com mais seguidores:", error);
    throw error;
  }
};

export const fetchTopLikedPosts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("https://connecter-server-033a278d1512.herokuapp.com/gallery/top-liked", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data.topLikedImages;
  } catch (error) {
    console.error("Erro ao buscar as top publicações mais curtidas:", error);
    throw error;
  }
};

export async function fetchComunidadesDoUsuario(userId) {
  try {
    const response = await fetch(`https://connecter-server-033a278d1512.herokuapp.com/communities/comunidade/obterComunidadesDoUsuario/${userId}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar as comunidades do usuário');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}