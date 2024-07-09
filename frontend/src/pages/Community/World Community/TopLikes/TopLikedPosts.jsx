import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from "./TopLikedPosts.module.css"; 
import { AiOutlineUser } from "react-icons/ai"; 
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const TopLikedPosts = ({ topLikedPosts, t }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (topLikedPosts.length > 0) {
      setLoading(false);
    }
  }, [topLikedPosts]);

   // Componente para seta personalizada anterior
   const CustomPrevArrow = ({ onClick }) => (
    <div className={`${styles.customArrow} ${styles.prev}`} onClick={onClick}>
      <FaLongArrowAltLeft />
    </div>
  );

  // Componente para seta personalizada seguinte
  const CustomNextArrow = ({ onClick }) => {
    return (
      <div className={`${styles.customArrow} ${styles.next}`} onClick={onClick}>
        <FaLongArrowAltRight />
      </div>
    );
  };
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Mostra 3 itens por vez
    slidesToScroll: 1,
    arrows: true,
    prevArrow:  <CustomPrevArrow />,
    nextArrow:<CustomNextArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2, // Ajusta para 2 itens em telas menores
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Ajusta para 1 item em telas muito pequenas
        },
      },
    ],
  };

  return (
    <div className={styles.topLikedContainer}>
      <h2 className={styles.topLikedTitle}>{t("topLikedPosts")}</h2>
      <hr className={styles.hrTop} />
      {loading ? (
        <p className={styles.loadingMessage}>{t("loading")}</p>
      ) : topLikedPosts.length > 0 ? (
        <div className={styles.postWrapper}>
          <Slider {...sliderSettings}>
            {topLikedPosts.map((post) => (
              <div key={post.url} className={styles.postItem}>
                <img
                  src={post.url}
                  alt="Top Liked Post"
                  className={styles.postImage}
                />
                <div className={styles.postDetails}>
                  {post.user && post.user.profileImageUrl ? (
                    <img
                      src={post.user.profileImageUrl}
                      alt="Profile"
                      className={styles.profileImage}
                    />
                  ) : (
                    <a href={`/profile/${post.userId}`}>
                      <AiOutlineUser className={styles.profileImagenone} />
                    </a>
                  )}
                  <p className={styles.postUser}>{post.user ? post.user.username : "Unknown"}</p>
                  <p className={styles.postLikes}>
                    {t("numberOfLikes")}: {post.likeCount}
                  </p>
                  <a href={`/profile/${post.userId}`} className={styles.postLink}>
                    <button className={styles.postButton}>
                      {t("viewProfile")}
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <p className={styles.noPostsMessage}>{t("noPostsAvailable")}</p>
      )}
    </div>
  );
};

export default TopLikedPosts;
