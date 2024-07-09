import { useCallback, useEffect } from "react";
import { useMyContext } from "../../../contexts/profile-provider";
import { useParams, useLocation } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";

const useGetdata = () => {
  const {
    setFullName,
    setUsername,
    setModalFullName,
    setModalDateOfBirth,
    setPhoneNumber,
    setProfileImage,
    setCountryCode,
    setBiography,
    setUserDataLoaded,
    setNumberOfFollowing,
    setNumberOfFollowers,
    userPhotos,
    currentImageIndex,
    setNextButtonDisabled,
    setIsOwnProfile,
    setIsFollowing,
    setPreviousButtonDisabled,
    setIsModalOpen,
    myProfileLink,
    setUserPhotos,
  } = useMyContext();

  const { userId } = useParams();
  const { user } = useAuth();
  const location = useLocation();

  const getDataUser = useCallback(async () => {
    try {
      setUserDataLoaded(false);
      const token = localStorage.getItem("token");
      const storedBiography = localStorage.getItem("biography");

      if (storedBiography) {
        setBiography(storedBiography);
      } else {
        const res = await fetch(`https://connecter-server-033a278d1512.herokuapp.com/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const responseBody = await res.json();
          if (responseBody) {
            setFullName(`${responseBody.firstName} ${responseBody.lastName}`);
            setUsername(responseBody.username);
            setModalFullName(
              `${responseBody.firstName} ${responseBody.lastName}`
            );
            setModalDateOfBirth(responseBody.dob);
            const ddd = extractDDD(responseBody.phone);
            const countryCode = getCountryCodeFromDDD(ddd);
            setCountryCode(countryCode);

            setProfileImage(responseBody.profileImageUrl || "");
            setBiography(responseBody.biography);
            setPhoneNumber(responseBody.phone);
            setUserDataLoaded(true);
          } else {
            console.error(
              "Erro ao obter os dados do usuário: responseBody não definido"
            );
          }
        } else {
          console.error("Erro ao obter os dados do usuário:", res.status);
        }
      }
    } catch (error) {
      console.error("Erro ao obter os dados do usuário:", error);
    }
  }, [
    userId,
    setFullName,
    setUsername,
    setModalFullName,
    setModalDateOfBirth,
    setPhoneNumber,
    setProfileImage,
    setCountryCode,
    setBiography,
    setUserDataLoaded,
  ]);

  const getGalleryImages = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://connecter-server-033a278d1512.herokuapp.com/${userId}/gallery`, // Corrigindo a URL
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        setUserPhotos(data.images || []);
      } else {
        console.error("Falha ao obter as imagens da galeria:", response.status);
      }
    } catch (error) {
      console.error("Erro ao obter as imagens da galeria:", error);
    }
  };
  
  useEffect(() => {
    getGalleryImages();
  }, [setUserPhotos, userId]);
  
  useEffect(() => {
    const fetchFollowingCount = async () => {
      try {
        const response = await fetch(
          `https://connecter-server-033a278d1512.herokuapp.com/user/${userId}/following-count`
        );
        if (response.ok) {
          const data = await response.json();
          setNumberOfFollowing(data.numberOfFollowing);
        } else {
          console.error(
            "Erro ao obter o número de usuários seguidos:",
            response.status
          );
        }
      } catch (error) {
        console.error("Erro ao obter o número de usuários seguidos:", error);
      }
    };

    fetchFollowingCount();
  }, [userId, setNumberOfFollowing]);

  function extractDDD(phoneNumber) {
    return phoneNumber.substring(0, 2);
  }

  function getCountryCodeFromDDD(ddd) {
    switch (ddd) {
      case "11":
        return "BR";
      case "1":
        return "US";
      default:
        return "";
    }
  }

  useEffect(() => {
    if (
      location.pathname === myProfileLink &&
      !localStorage.getItem("profileModalOpened")
    ) {
      setIsModalOpen(true);
      localStorage.setItem("profileModalOpened", "true");
    } else {
      setIsModalOpen(false);
    }
  }, [location.pathname, myProfileLink, setIsModalOpen]);

  useEffect(() => {
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleLogoClick = () => {
    window.location.reload();
  };

  const handleProfileClick = () => {
    window.location.href = user ? `/profile/${user.id}` : "/";
  };

  useEffect(() => {
    const loggedInUserId = localStorage.getItem("userId");
    setIsOwnProfile(loggedInUserId === userId);
  }, [userId, setIsOwnProfile]);

  useEffect(() => {
    const isLastPhoto =
      !userPhotos || userPhotos.length === 0 || currentImageIndex === userPhotos.length - 1;
    setNextButtonDisabled(isLastPhoto);
  }, [userPhotos, currentImageIndex, setNextButtonDisabled]);

  useEffect(() => {
    const isFirstPhoto = !userPhotos || userPhotos.length === 0 || currentImageIndex === 0;
    setPreviousButtonDisabled(isFirstPhoto);
  }, [userPhotos, currentImageIndex, setPreviousButtonDisabled]);

  const verifyRelationship = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!user) {
        console.error("Usuário não definido.");
        return;
      }
      const url = `https://connecter-server-033a278d1512.herokuapp.com/relationship/${user.id}/${userId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsFollowing(data.exists);
      } else {
        console.error(
          "Erro ao verificar a relação de seguimento:",
          response.status
        );
      }
    } catch (error) {
      console.error("Erro ao verificar a relação de seguimento:", error);
    }
  }, [setIsFollowing, user, userId]);

  useEffect(() => {
    if (user) {
      verifyRelationship();
    }
  }, [user, verifyRelationship]);

  const followUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `https://connecter-server-033a278d1512.herokuapp.com/relationship`;

      const data = {
        follower_id: user.id,
        following_id: userId,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsFollowing(true);
        setNumberOfFollowers((prevCount) => prevCount + 1);
        console.log("Começou a seguir o usuário.");
      } else {
        console.error("Erro ao seguir o usuário:", response.status);
      }
    } catch (error) {
      console.error("Erro ao seguir o usuário:", error);
    }
  };

  const unfollowUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = `https://connecter-server-033a278d1512.herokuapp.com/relationship/${user.id}/${userId}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setIsFollowing(false);
        console.log("Parou de seguir o usuário.");
        setNumberOfFollowers((prevCount) => prevCount - 1);
      } else {
        console.error("Erro ao deixar de seguir o usuário:", response.status);
      }
    } catch (error) {
      console.error("Erro ao deixar de seguir o usuário:", error);
    }
  };

  const getFollowers = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://connecter-server-033a278d1512.herokuapp.com/user/${userId}/followers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data.followers;
      } else {
        console.error("Falha ao obter os seguidores:", response.status);
        return [];
      }
    } catch (error) {
      console.error("Erro ao obter os seguidores:", error);
      return [];
    }
  }, [userId]);

  const getFollowing = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://connecter-server-033a278d1512.herokuapp.com/user/${userId}/following`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        return data.following;
      } else {
        console.error("Falha ao obter os usuários seguidos:", response.status);
        return [];
      }
    } catch (error) {
      console.error("Erro ao obter os usuários seguidos:", error);
      return [];
    }
  }, [userId]);

  useEffect(() => {
    localStorage.removeItem("profileImage");
  }, [userId]);

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    const storedUsername = localStorage.getItem("username");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (storedFullName && storedUsername) {
      setFullName(storedFullName);
      setUsername(storedUsername);
      setProfileImage(storedProfileImage);
    }
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }
  }, [setFullName, setProfileImage, setUsername]);

  return {
    getDataUser,
    handleLogoClick,
    handleProfileClick,
    followUser,
    unfollowUser,
    verifyRelationship,
    getGalleryImages,
    getFollowers,
    getFollowing,
  };
};

export default useGetdata;
