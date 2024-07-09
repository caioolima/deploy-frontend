import React, { createContext, useState, useContext } from "react";
import { useAuth } from "../hooks/use-auth";
import { useLocation } from "react-router-dom";

const MyContext = createContext("");

const MyContextProvider = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  
  const [isCreateCommunityModalOpen, setIsCreateCommunityModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [biography, setBiography] = useState("");
  const [isBiographyVisible, setBiographyVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [modalFullName, setModalFullName] = useState("");
  const [modalDateOfBirth, setModalDateOfBirth] = useState("");
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [userPhotos, setUserPhotos] = useState([]);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [selectedPublicationIndex, setSelectedPublicationIndex] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [imageURL, setImageURL] = useState("");
  const [userName, setUserName] = useState("");
  const [newBiography, setNewBiography] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentUserProfileImage, setCurrentUserProfileImage] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [selectedPublicationModalOpen, setSelectedPublicationModalOpen] = useState(false);
  const [selectedPhotoPosition, setSelectedPhotoPosition] = useState({ x: 0, y: 0 });
  const [uploadInProgress, setUploadInProgress] = useState(false);
  const [userDataLoaded, setUserDataLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [numberOfFollowers, setNumberOfFollowers] = useState(null);
  const [numberOfFollowing, setNumberOfFollowing] = useState(null);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(false);
  const [previousButtonDisabled, setPreviousButtonDisabled] = useState(false);
  const [selectedImageLoaded, setSelectedImageLoaded] = useState(false);
  const [fadeState, setFadeState] = useState("fade-in");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [caption, setCaption] = useState("");
  const myProfileLink = `/profile/${user && user.id}`;
  const feedLink = `/feed/${user && user.id}`;
  const isMyProfilePage = location.pathname === myProfileLink;

  return (
    <MyContext.Provider
      value={{
        fullName,
        setFullName,
        username,
        setUsername,
        profileImage,
        setProfileImage,
        showModal,
        setShowModal,
        selectedImage,
        setSelectedImage,
        isEditMode,
        setEditMode,
        newUsername,
        setNewUsername,
        biography,
        setBiography,
        isBiographyVisible,
        setBiographyVisible,
        formData,
        setFormData,
        modalFullName,
        setModalFullName,
        modalDateOfBirth,
        setModalDateOfBirth,
        isTextFieldFocused,
        setIsTextFieldFocused,
        phoneNumber,
        setPhoneNumber,
        countryCode,
        setCountryCode,
        newPhoneNumber,
        setNewPhoneNumber,
        newPhone,
        setNewPhone,
        phoneError,
        setPhoneError,
        userPhotos,
        setUserPhotos,
        showPhotoModal,
        setShowPhotoModal,
        selectedPublication,
        setSelectedPublication,
        selectedPublicationIndex,
        setSelectedPublicationIndex,
        isFollowing,
        setIsFollowing,
        isOwnProfile,
        setIsOwnProfile,
        followersCount,
        setFollowersCount,
        imageURL,
        setImageURL,
        userName,
        setUserName,
        newBiography,
        setNewBiography,
        uploadProgress,
        setUploadProgress,
        currentUserProfileImage,
        setCurrentUserProfileImage,
        usernameError,
        setUsernameError,
        selectedPublicationModalOpen,
        setSelectedPublicationModalOpen,
        selectedPhotoPosition,
        setSelectedPhotoPosition,
        uploadInProgress,
        setUploadInProgress,
        userDataLoaded,
        setUserDataLoaded,
        currentImageIndex,
        setCurrentImageIndex,
        numberOfFollowers,
        setNumberOfFollowers,
        numberOfFollowing,
        setNumberOfFollowing,
        nextButtonDisabled,
        setNextButtonDisabled,
        previousButtonDisabled,
        setPreviousButtonDisabled,
        selectedImageLoaded,
        setSelectedImageLoaded,
        fadeState,
        setFadeState,
        isModalOpen,
        setIsModalOpen,
        deleting,
        setDeleting,
        showDeleteModal,
        setShowDeleteModal,
        isCreateCommunityModalOpen,
        setIsCreateCommunityModalOpen,
        myProfileLink,
        feedLink,
        isMyProfilePage,
        caption, 
        setCaption
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

const useMyContext = () => useContext(MyContext);

export { MyContextProvider, useMyContext };
