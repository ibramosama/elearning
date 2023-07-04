import React from 'react';
import styles from './Review.module.css';

const Review = ({ name, photo, timeAgo, stars, comment }) => {
  return (
    <div className={styles.review}>
      <div className={styles.reviewInfo}>
        <img src={photo} alt="User" className={styles.userPhoto} />
        <span className={styles.userName}>{name}</span>
        <span className={styles.timeAgo}>{timeAgo}</span>
      </div>
      <div className={styles.stars}>
        {[...Array(4)].map((_, index) => (
          <span key={index} className={styles.goldStar}>★</span>
        ))}
        <span className={styles.whiteStar}>★</span>
      </div>
      <div className={styles.comment}>{comment}</div>
    </div>
  );
};

export default Review;

