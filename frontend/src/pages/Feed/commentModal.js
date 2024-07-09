import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import styles from "./CommentModal.module.css";
import { useTranslation } from 'react-i18next';

const CommentModal = ({ imageUrl, onClose, user }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { t } = useTranslation();

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://connecter-server-033a278d1512.herokuapp.com/feedRoutes/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao obter comentários");
      }
      const data = await response.json();
      setComments(data.comments);
      setLoading(false);
      localStorage.setItem(
        `comments-${imageUrl}`,
        JSON.stringify(data.comments)
      );
      localStorage.setItem(`commentsLoaded-${imageUrl}`, "true");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const isCommentsLoaded = localStorage.getItem(`commentsLoaded-${imageUrl}`);
    const storedComments = localStorage.getItem(`comments-${imageUrl}`);
    if (isCommentsLoaded && storedComments) {
      setComments(JSON.parse(storedComments));
      setLoading(false);
    } else {
      fetchComments();
    }
  }, [imageUrl]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmitComment = async () => {
    try {
      const response = await fetch(
        "https://connecter-server-033a278d1512.herokuapp.com/feedRoutes/comment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            imageUrl,
            text: commentText,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Erro ao adicionar comentário");
      }
      setCommentText("");
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.commentModal}>
      <div className={styles.commentModalContent}>
        <span className={styles.closeCommentModal} onClick={onClose}>
          &times;
        </span>
        <div className={styles.commentImageContainer}>
          <img
            src={imageUrl}
            alt={t("comment_image_alt", { defaultValue: "Imagem da postagem" })} // Adicionando suporte para tradução do texto alternativo da imagem
            className={styles.commentImage}
            onLoad={handleImageLoad} // Aciona o estado quando a imagem é carregada
            style={{ display: imageLoaded ? "block" : "none" }} // Oculta a imagem até que seja carregada
          />
          {!imageLoaded && (
            <div
              className={styles.loadingShimmer}
              style={{ height: t("loading_shimmer_height") }} // Altura do shimmer
            ></div>
          )}
        </div>
        <div className={styles.commentInputContainer}>
          <h2 className={styles.commentTitle}>{t("comments")}</h2>
          <div className={styles.commentList}>
            <ul>
              {imageLoaded && // Só renderiza comentários se a imagem estiver carregada
                (loading ? (
                  <li
                    className={styles.loadingShimmer}
                    style={{ height: "600px", marginBottom: "20px" }}
                  ></li>
                ) : comments.length === 0 ? (
                  <li className={styles.noCommentsMessage}>
                    <span>{t("leave_a_comment")}</span>
                  </li>
                ) : (
                  comments.map((comment, index) => (
                    <li
                      key={index}
                      className={`${styles.commentUserInfo} ${
                        comment.userId.id === user.id ? styles.currentUser : ""
                      }`}
                    >
                      <img
                        src={comment.userId.profileImageUrl}
                        alt={t("profile_image_alt", {
                          defaultValue: "Profile",
                        })} // Adicionando suporte para tradução do texto alternativo da imagem de perfil
                        className={styles.profileImageFeed}
                      />
                      <div className={styles.commentContent}>
                        <div className={styles.usernameComment}>
                          <span className={styles.usernameFeedPublication}>
                            {comment.userId.username}
                          </span>
                        </div>
                        <span className={styles.commentText}>
                          {comment.text}
                        </span>
                        <span className={styles.commentTime}>
                          {formatDistanceToNow(new Date(comment.postedAt), {
                            addSuffix: true,
                            locale: ptBR,
                          })}
                        </span>
                      </div>
                    </li>
                  ))
                ))}
            </ul>
          </div>
          {imageLoaded && ( // Só mostra o campo de input e o botão se a imagem estiver carregada
            <div className={styles.commentInputWrapper}>
              <input
                type="text"
                placeholder={t("comment_input_placeholder")}
                value={commentText}
                onChange={handleCommentChange}
                className={styles.commentTextarea}
              />
              <button
                className={styles.submitCommentButton}
                onClick={handleSubmitComment}
                disabled={commentText.trim() === ""}
              >
                {t("publish")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
