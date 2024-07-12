import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import styles from "./CommentModal.module.css";
import { useTranslation } from 'react-i18next';

const CommentModal = ({ imageUrl, onClose, user }) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();

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
        <div className={styles.commentInputContainer}>
          <h2 className={styles.commentTitle}>{t("comments")}</h2>
          <div className={styles.commentList}>
            <ul>
              {loading ? (
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
                      alt={t("profile_image_alt", { defaultValue: "Profile image" })}
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
                        {t("comment_time." + getCommentTimeKey(comment.postedAt), {
                          count: getCommentTimeCount(comment.postedAt),
                        })}
                      </span>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
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
        </div>
      </div>
    </div>
  );
};

// Função para obter a chave de tradução para o tempo do comentário
const getCommentTimeKey = (postedAt) => {
  const now = new Date();
  const postedDate = new Date(postedAt);
  const diffInMinutes = Math.round((now - postedDate) / (1000 * 60));
  const diffInHours = Math.round(diffInMinutes / 60);
  const diffInDays = Math.round(diffInHours / 24);
  const diffInWeeks = Math.round(diffInDays / 7);
  const diffInMonths = Math.round(diffInDays / 30);
  const diffInYears = Math.round(diffInDays / 365);

  if (diffInMinutes < 1) return 'lessThanXMinutes';
  if (diffInMinutes < 60) return 'xMinutes';
  if (diffInHours < 24) return 'aboutXHours';
  if (diffInHours < 48) return 'aDay';
  if (diffInDays < 7) return 'xDays';
  if (diffInDays < 30) return 'aboutXWeeks';
  if (diffInDays < 365) return 'xWeeks';
  if (diffInMonths < 12) return 'aboutXMonths';
  return 'xYears';
};

// Função para obter a contagem de tempo do comentário
const getCommentTimeCount = (postedAt) => {
  const now = new Date();
  const postedDate = new Date(postedAt);
  const diffInMinutes = Math.round((now - postedDate) / (1000 * 60));
  const diffInHours = Math.round(diffInMinutes / 60);
  const diffInDays = Math.round(diffInHours / 24);
  const diffInWeeks = Math.round(diffInDays / 7);
  const diffInMonths = Math.round(diffInDays / 30);
  const diffInYears = Math.round(diffInDays / 365);

  return diffInMinutes < 60
    ? diffInMinutes
    : diffInHours < 24
    ? diffInHours
    : diffInDays < 7
    ? diffInDays
    : diffInWeeks < 4
    ? diffInWeeks
    : diffInMonths < 12
    ? diffInMonths
    : diffInYears;
};

export default CommentModal;
