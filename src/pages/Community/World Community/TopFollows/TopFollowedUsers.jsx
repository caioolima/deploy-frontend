import React, { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import styles from "./TopFollowedUsers.module.css"; // Importando estilos do CSS Module

const TopFollowedUsers = ({ topFollowedUsers, t }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topFollowedUsers.length > 0) {
      setLoading(false);
    }
  }, [topFollowedUsers]);

  return (
    <div>
      <h2 className={styles.topLikedTitle}>{t("userMoreFollow")}</h2>
      <hr className={styles.hrTop} />
      <section className={styles.usersContainer}>
        <div className={styles.usersList}>
          {loading ? (
            <p className={styles.loadingMessage}>{t("loading")}</p>
          ) : topFollowedUsers.length > 0 ? (
            topFollowedUsers.map((follower) => (
              <div key={follower.userId} className={styles.userItem}>
                {follower.profileImageUrl ? (
                  <img
                    src={follower.profileImageUrl}
                    alt="Profile"
                    className={styles.profileImage}
                  />
                ) : (
                  <AiOutlineUser className={styles.profileImagenone} />
                )}
                <span className={styles.userName}>{follower.username}</span>
                <p className={styles.followersCount}>
                  {follower.numberOfFollowers}{" "}
                  {follower.numberOfFollowers === 1
                    ? t("follower-user")
                    : t("followers-user")}
                </p>
                <a
                  href={`/profile/${follower.userId}`}
                  className={styles.profileLink}
                >
                  <button className={styles.signButton}>
                    {t("viewProfile")}
                  </button>
                </a>
              </div>
            ))
          ) : (
            <p className={styles.noFollowers}>{t("noFollowers")}</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default TopFollowedUsers;
