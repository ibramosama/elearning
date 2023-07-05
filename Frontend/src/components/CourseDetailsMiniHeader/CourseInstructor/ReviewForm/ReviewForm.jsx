import React from 'react';
import styles from './ReviewForm.module.css';

const ReviewForm = () => {
  return (
    <div className={styles.reviewForm}>
      <h3 className={styles.h3_reviewForm}>Writing a Review</h3>
      <button className={styles.button}>Writing a Review</button>
      <h5 className={styles.h5_reviewForm}>Your Rating*: <span className={styles.stars}>⭐️⭐️⭐️⭐️⭐️</span></h5>
      <div className={styles.formGroup}>
        <input type="text" placeholder="Your Name" className={styles.input} />
        <input type="email" placeholder="Your Email" className={styles.input} />
      </div>
      <textarea
        placeholder="Your Comment"
        className={styles.random_textarea}
      ></textarea>
      <div className={styles.checkbox}>
        <input type="checkbox" id="saveInfo" className={styles.checkboxInput} />
        <label htmlFor="saveInfo" className={styles.checkboxLabel}>
          Save my name and email in this browser for next time I comment.
        </label>
      </div>
      <button className={styles.submitButton}>Submit</button>
    </div>
  );
};

export default ReviewForm;
