import { useEffect, useState } from "react";
import { useMyContext } from "../../../contexts/profile-provider";
import { useParams } from "react-router-dom";
import { storage } from "../../../components/Firebase/storage";
import useUploadModal from "./useUploadModal"
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject
} from "firebase/storage";

const usePhotoModal = () => {
    const {
        setShowModal,
        setSelectedImage,
        setUsernameError,
        setPhoneError,
        setProfileImage,
        setCurrentUserProfileImage,
        setUploadProgress,
        setUserPhotos,
        newUsername,
        newBiography
    } = useMyContext();
    
    const [selectedFile, setSelectedFile] = useState(null); // Estado para controlar o arquivo selecionado
    
    const { userId } = useParams();

    const closeModal = () => {
        setShowModal(false);
        setSelectedImage(null); // Limpa o estado selectedImage ao fechar o modal
        setUsernameError("");
        setPhoneError("");
    };

    const handleImageChange = event => {
        // Atualiza o estado com o arquivo selecionado
        setSelectedFile(event.target.files[0]);
    };

    // No hook usePhotoModal

    const changeImage = async () => {
        if (!selectedFile) {
            console.error("Nenhum arquivo selecionado.");
            return;
        }

        try {
            const formData = new FormData();
            const fileName = new Date().getTime() + selectedFile.name;
            formData.append("image", selectedFile, fileName);

            const token = localStorage.getItem("token");
            if (!token || !userId) {
                throw new Error("Token or user ID not found");
            }

            // Atualizar o estado local imediatamente com a URL temporária da imagem
            const temporaryImageUrl = URL.createObjectURL(selectedFile);
            setSelectedImage(temporaryImageUrl);

            const uploadTask = uploadBytesResumable(
                ref(storage, `users/${userId}/profileImage`),
                selectedFile
            );
            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setUploadProgress(progress);
                },
                error => {
                    console.error("Error uploading image:", error);
                },
                async () => {
                    try {
                        const downloadURL = await getDownloadURL(
                            uploadTask.snapshot.ref
                        );
                        setProfileImage(downloadURL);
                        setSelectedImage(downloadURL); // Atualizar o estado com a URL final da imagem

                        // Aqui você tem o URL da imagem, agora você pode enviar isso junto com outros dados do usuário para o backend
                        const updateUserResponse = await fetch(
                            `https://server-repository.onrender.com/users/${userId}/edit`,
                            {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`
                                },
                                body: JSON.stringify({
                                    newUsername,
                                    newBiography,
                                    profileImageUrl: downloadURL // Certifique-se de que downloadURL contém a URL correta da imagem
                                })
                            }
                        );

                        if (updateUserResponse.ok) {
                            console.log(
                                "User profile updated successfully with profile image URL"
                            );

                            // Excluir a imagem do Firebase Storage após o upload ter sido concluído e a URL ter sido enviada para o banco de dados
                            await deleteObject(
                                ref(storage, `users/${fileName}`)
                            );
                            console.log(
                                "Imagem do Firebase Storage excluída com sucesso."
                            );
                        } else {
                            console.error(
                                "Failed to update user profile with profile image URL"
                            );
                        }
                    } catch (error) {
                        console.error("Error getting download URL:", error);
                    }
                }
            );
        } catch (error) {
            console.error("Error uploading image:", error.message);
        }
    };

    // No método de remoção de imagem:
    const removeImage = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(
                `https://server-repository.onrender.com/users/${userId}/profile-image`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.ok) {
                // Remova a imagem do Firebase Storage
                await deleteObject(
                    ref(storage, `users/${userId}/profileImage`)
                );
                // Limpe o cache da imagem removida
                setCurrentUserProfileImage(null);
                // Atualize o estado para refletir a remoção
                setProfileImage(null);
                console.log("Imagem removida com sucesso!");
                closeModal(); // Você pode chamar a função closeModal aqui para fechar o modal após a remoção bem-sucedida
            } else {
                console.error(
                    "Falha ao excluir a imagem no servidor:",
                    response.status
                );
            }
        } catch (error) {
            console.error("Erro ao remover a imagem:", error);
        }
    };

    return {
        closeModal,
        removeImage,
        changeImage,
        handleImageChange
    };
};

export default usePhotoModal;
