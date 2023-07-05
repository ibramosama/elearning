import React, { useState } from 'react';
import styles from './ReviewForm.module.css';

const ReviewForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [saveInfo, setSaveInfo] = useState(false);
  const [rating, setRating] = useState(5); // Default rating is 5

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSaveInfoChange = (event) => {
    setSaveInfo(event.target.checked);
  };

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send data to the backend using an API call 
    
    const formData = {
      name,
      email,
      comment,
      saveInfo,
      rating
    };

    // axios.post('/api/submitReview', formData)
    //   .then(response => {
   
    //   })
    //   .catch(error => {
   
    //   });

    // Reset form fields
    setName('');
    setEmail('');
    setComment('');
    setSaveInfo(false);
    setRating(5); // Reset rating to default
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClassName =
        i <= rating ? styles.filledStar : styles.emptyStar;
      stars.push(
        <span
          key={i}
          className={starClassName}
          onClick={() => handleRatingClick(i)}
        >
          ⭐️
        </span>
      );
    }
    return stars;
  };

  return (
    <div className={styles.reviewForm}>
      <h3>Writing a Review</h3>
      <button className={styles.button}>Writing a Review</button>
      <h5>
        Your Rating*: <span className={styles.stars}>{renderStars()}</span>
      </h5>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            type="text"
            placeholder="Your Name"
            className={styles.input}
            value={name}
            onChange={handleNameChange}
          />
          <input
            type="email"
            placeholder="Your Email"
            className={styles.input}
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <textarea
          placeholder="Your Comment"
          className={styles.textarea}
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
        <div className={styles.checkbox}>
          <input
            type="checkbox"
            id="saveInfo"
            className={styles.checkboxInput}
            checked={saveInfo}
            onChange={handleSaveInfoChange}
          />
          <label htmlFor="saveInfo" className={styles.checkboxLabel}>
            Save my name and email in this browser for next time I comment.
          </label>
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>   </div>
  );
};

export default ReviewForm;

