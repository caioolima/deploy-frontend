import "./style.css";
import React, { useState, useEffect, useRef } from "react";
import { useMyContext } from "../../../contexts/profile-provider";
import useEventsModals from "../Hooks/useEventsModals";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";
import usePhotoModal from "../Hooks/usePhotoModal";
import useGetdata from "../Hooks/useGetdata";
import { AiOutlineUser } from "react-icons/ai"; // Importando o ícone de usuário padrão
import { useTranslation } from "react-i18next";

const InfoProfile = () => {
  const {
    profileImage,
    username,
    fullName,
    isEditMode,
    userPhotos,
    numberOfFollowers,
    numberOfFollowing,
    biography,
    isOwnProfile,
    isFollowing,
    setNumberOfFollowers,
  } = useMyContext();

  const { handleEditClick, openModal } = useEventsModals();
  const { verifyRelationship, unfollowUser, followUser } = useGetdata();
  const { getFollowers, getFollowing } = useGetdata();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const { userId } = useParams();
  const [isUpdatingFollowers, setIsUpdatingFollowers] = useState(false);
  const { user } = useAuth();
  const isOwner = user && user.id === userId;
  const { t } = useTranslation();
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchFollowersAndFollowing = async () => {
      const fetchedFollowers = await getFollowers();
      const fetchedFollowing = await getFollowing();
      setFollowers(fetchedFollowers);
      setFollowing(fetchedFollowing);
    };
    fetchFollowersAndFollowing();
  }, [getFollowers, getFollowing]);

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowFollowersModal(false);
        setShowFollowingModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const handleShowFollowers = () => {
    if (numberOfFollowers > 0) {
      setShowFollowersModal(true);
      document.body.style.position = "fixed";
    }
  };

  const handleShowFollowing = () => {
    if (numberOfFollowing > 0) {
      setShowFollowingModal(true);
      document.body.style.position = "fixed";
    }
  };

  const handleCloseModal = () => {
    setShowFollowersModal(false);
    setShowFollowingModal(false);
    document.body.style.position = "static";
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num;
  };

  const formattedFollowers = formatNumber(numberOfFollowers);

  useEffect(() => {
    const fetchFollowersAndFollowing = async () => {
      const fetchedFollowers = await getFollowers();
      const fetchedFollowing = await getFollowing();
      setFollowers(fetchedFollowers);
      setFollowing(fetchedFollowing);
    };
    fetchFollowersAndFollowing();
  }, [getFollowers, getFollowing]);

  const handleFollowButtonClick = async () => {
    try {
      setIsUpdatingFollowers(true);

      if (isFollowing) {
        await unfollowUser();
        setNumberOfFollowers((prevCount) => prevCount - 1);
      } else {
        await followUser();
        setNumberOfFollowers((prevCount) => prevCount + 1);
      }

      setIsUpdatingFollowers(false);
      verifyRelationship();
    } catch (error) {
      console.error("Erro ao seguir/deixar de seguir o usuário:", error);
      setIsUpdatingFollowers(false);
    }
  };

  return (
    <div className="profile-header">
      <div
        className="profile-photo-container"
        onClick={isOwner ? openModal : null}
      >
        <div className="profile-photo-frame">
          {profileImage !== null && profileImage !== "" ? (
            <img
              src={profileImage}
              alt={t("User")}
              className={`profile-photo ${
                !profileImage && "loading-animation"
              }`}
            />
          ) : (
            <AiOutlineUser className="profile-icon" /> // Ícone de foto de perfil padrão
          )}
        </div>
      </div>
      <div className="profile-info">
        <div className="user-info">
          <h1>{username}</h1>
          {isOwner && !isEditMode && (
            <button className="edit-button" onClick={handleEditClick}>
              {t("Edit")}
            </button>
          )}
        </div>
        <div className="cont-photos">
          <p className="photo-count">
            {userPhotos.length > 0 ? (
              <strong>{userPhotos.length}</strong>
            ) : (
              <strong>0</strong>
            )}
            {t("Posts")}
          </p>
          {numberOfFollowers !== null && (
            <p className="followers-count" onClick={handleShowFollowers}>
              <strong>{numberOfFollowers}</strong>
              {t("Followers")}
            </p>
          )}
          {numberOfFollowing !== null && (
            <p className="following-count" onClick={handleShowFollowing}>
              <strong>{numberOfFollowing}</strong>
              {t("Following")}
            </p>
          )}
        </div>

        <p className="fullname">{fullName}</p>

        <p className="bio">{biography}</p>

        {!isOwnProfile && user && user.id !== userId && (
          <button
            className={`follow-button ${isFollowing ? "following" : ""}`}
            onClick={() => {
              if (isFollowing) {
                unfollowUser();
                verifyRelationship();
              } else {
                followUser();
                verifyRelationship();
              }
            }}
          >
            {isFollowing ? t("Following") : t("Follow")}
          </button>
        )}
      </div>
      {showFollowersModal && (
        <div className="modal-modal-follow" ref={modalRef}>
          <div className="modal-content-two">
            <span className="closed-follow" onClick={handleCloseModal}>
              &times;
            </span>
            <h3>{t("Followers")}</h3>
            <ul>
              {followers.map((follower) => (
                <li key={follower.id} className="follower-user">
                  <a href={`/profile/${follower._id}`} className="profile-link">
                    <div className="user-avatar">
                      {follower.profileImageUrl ? (
                        <img
                          src={follower.profileImageUrl}
                          alt={follower.username}
                          className="follower-avatar"
                        />
                      ) : (
                        <div className="profile-icon-container">
                          <AiOutlineUser className="profile-icon-profile" />
                        </div>
                      )}
                    </div>
                    <div className="user-details">
                      <span className="username-follower">
                        {follower.username}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {showFollowingModal && (
        <div className="modal-modal-follow" ref={modalRef}>
          <div className="modal-content-two">
            <span className="closed-follow" onClick={handleCloseModal}>
              &times;
            </span>
            <h3>{t("Following")}</h3>
            <ul>
              {following.map((followee) => (
                <li key={followee.id} className="following-user">
                  <a href={`/profile/${followee._id}`} className="profile-link">
                    <div className="user-avatar">
                      {followee.profileImageUrl ? (
                        <img
                          src={followee.profileImageUrl}
                          alt={followee.username}
                          className="followee-avatar"
                        />
                      ) : (
                        <div className="profile-icon-container">
                          <AiOutlineUser className="profile-icon-profile" />
                        </div>
                      )}
                    </div>
                    <div className="user-details">
                      <span className="username-follower">
                        {followee.username}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoProfile;
