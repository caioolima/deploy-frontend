import React, { useState, useEffect } from "react";
import styles from "./CommentModal.module.css";
import { useTranslation } from "react-i18next";

const CommentModal = ({ imageUrl, onClose, user }) => {
  const { t } = useTranslation();
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

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
        throw new Error(t("error_fetching_comments"));
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
        throw new Error(t("error_adding_comment"));
      }
      setCommentText("");
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  // Função para calcular o tempo de postagem em português
  const formatTimeAgo = (postedAt) => {
    const now = new Date();
    const postedDate = new Date(postedAt);
    const diffMs = now - postedDate;
    const diffSeconds = Math.round(diffMs / 1000);
    if (diffSeconds < 60) {
      return t("less_than_a_minute_ago");
    } else if (diffSeconds < 3600) {
      const minutes = Math.round(diffSeconds / 60);
      return t("minutes_ago", { minutes });
    } else if (diffSeconds < 86400) {
      const hours = Math.round(diffSeconds / 3600);
      return t("hours_ago", { hours });
    } else {
      const days = Math.round(diffSeconds / 86400);
      return t("days_ago", { days });
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
                <li className={styles.loadingShimmer}></li>
              ) : comments.length === 0 ? (
                <li className={styles.noCommentsMessage}>{t("no_comments")}</li>
              ) : (
                comments.map((comment, index) => (
                  <li key={index} className={styles.commentUserInfo}>
                    <img
                      src={comment.userId.profileImageUrl}
                      alt={t("profile_image")}
                      className={styles.profileImageFeed}
                    />
                    <div className={styles.commentContent}>
                      <div className={styles.usernameComment}>
                        <span className={styles.usernameFeedPublication}>
                          {comment.userId.username}
                        </span>
                      </div>
                      <span className={styles.commentText}>{comment.text}</span>
                      <span className={styles.commentTime}>
                        {formatTimeAgo(comment.postedAt)}
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
              placeholder={t("enter_your_comment")}
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

export default CommentModal;
