import React from 'react';
import styles from './YourInstructor.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faEnvelope, faUser, faPlus  } from '@fortawesome/free-solid-svg-icons';
const YourInstructor = () => {
  return (
    <div className={styles.page}>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <li className={`${styles.navItem} ${styles.active}`}>Instructors</li>
          <li className={styles.navItem}>Curriculum</li>
          <li className={styles.navItem}>Overview</li>
        </ul>
      </nav>
      <div className={styles.content}>
        <h3>Your Instructor</h3>
        <div className={styles.instructorInfo}>
                  <div className={styles.instructorPhoto}>
                        <img src="https://www.teachaway.com/sites/default/files/styles/threshold_992x992/public/college-instructor.jpg?itok=qg77Qirn" alt="Instructor" />
          </div>
          <div className={styles.instructorDetails}>
            <p className={styles.instructorName}>Dina Aly </p>
            <div className={styles.rating}>
                <div className={styles.stars}>⭐️⭐️⭐️⭐️⭐️</div>
              <h6 className={styles.ratingText}>4.75/5</h6>
            </div>
          </div>
              </div>
               <div className={styles.courseStats}>
            <div className={styles.stat}>
              <FontAwesomeIcon icon={faVideo} className={styles.statIcon} />
              <p>42 Courses</p>
            </div>
            <div className={styles.stat}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.statIcon} />
              <p>4 Reviews</p>
            </div>
            <div className={styles.stat}>
              <FontAwesomeIcon icon={faUser} className={styles.statIcon} />
              <p>73 Students</p>
            </div>
           
              </div>
               {/* <div className={styles.SeeMore}>
              <FontAwesomeIcon icon={faPlus} className={styles.statIcon} />
              <p>See More</p>
            </div> */}
        <div className={styles.studentFeedback}>
          <h3>Student Feedback</h3>
          <div className={styles.ratingContainer}>
  <div className={styles.rectangle}>
    <div className={styles.blueFont}>4.4</div>
    <div>⭐️⭐️⭐️⭐️⭐️</div>
    <div className={styles.grayFont}>8 ratings</div>
  </div>
                  <div className={styles.ratingDistribution}>
  <div className={styles.ratingBar}>
    <div className={styles.ratingLabel}>⭐️⭐️⭐️⭐️⭐️</div>
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: '75%' }}></div>
    </div>
    <div className={styles.percentage}>75%</div>
  </div>
  <div className={styles.ratingBar}>
    <div className={styles.ratingLabel}>⭐️⭐️⭐️⭐️✰</div>
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: '14%' }}></div>
    </div>
    <div className={styles.percentage}>14%</div>
  </div>
  <div className={styles.ratingBar}>
    <div className={styles.ratingLabel}>⭐️⭐️⭐️✰✰</div>
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: '0%' }}></div>
    </div>
    <div className={styles.percentage}>0%</div>
  </div>
  <div className={styles.ratingBar}>
    <div className={styles.ratingLabel}>⭐️⭐️✰✰✰</div>
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: '0%' }}></div>
    </div>
    <div className={styles.percentage}>0%</div>
  </div>
  <div className={styles.ratingBar}>
    <div className={styles.ratingLabel}>⭐️✰✰✰✰</div>
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width: '13%' }}></div>
    </div>
    <div className={styles.percentage}>13%</div>
  </div>
</div>

         
        </div>
      </div>
          </div>
          
          </div>
  );
};

export default YourInstructor;
