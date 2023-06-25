import React from 'react';
import styles from '../CSS/InstructorProfile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const CourseInfoCard = () => {
  return (
    <>
     
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img className={styles.courseImage} src="https://images.pexels.com/photos/3419718/pexels-photo-3419718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Course" />
        </div>
        <div className={styles.content}>
          <div className={styles.rating}>
           
          <span className="stars" style={{ color: '#FFD700' }}>
  <FontAwesomeIcon icon={faStar} />
  <FontAwesomeIcon icon={faStar} />
  <FontAwesomeIcon icon={faStar} />
  <FontAwesomeIcon icon={faStar} />
  <FontAwesomeIcon icon={faStar} />
</span>

            <span className="rating-value">4.50</span>
            <span className="rating-count">(12 ratings)</span>
          </div>
          <h3 className={styles.courseName}>Photography Course</h3>
          <p className={styles.status}>Status: Pending</p>
          <p className={styles.duration}>Duration: 1h 5m</p>
          <p className={styles.students}>Students: 0</p>
          <p className={styles.price}>Price: $100.00</p>
          <div className={styles.buttons}>
            <button className={styles.editButton}>Edit</button>
            <button className={styles.deleteButton}>Delete</button>
            <button className={styles.duplicateButton}>Duplicate</button>
          </div>
        </div>
      </div>

      {/* Card 2 */}
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img className={styles.courseImage} src="/path/to/course-image.jpg" alt="Course" />
        </div>
        <div className={styles.content}>
          <div className={styles.rating}>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
          </div>
          <h3 className={styles.courseName}>Photography Course</h3>
          <p className={styles.status}>Status: Pending</p>
          <p className={styles.duration}>Duration: 1h 5m</p>
          <p className={styles.students}>Students: 0</p>
          <p className={styles.price}>Price: $100.00</p>
          <div className={styles.buttons}>
            <button className={styles.editButton}>Edit</button>
            <button className={styles.deleteButton}>Delete</button>
            <button className={styles.duplicateButton}>Duplicate</button>
          </div>
        </div>
      </div>

      {/* Card 3 */}
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img className={styles.courseImage} src="/path/to/course-image.jpg" alt="Course" />
        </div>
        <div className={styles.content}>
          <div className={styles.rating}>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
          </div>
          <h3 className={styles.courseName}>Photography Course</h3>
          <p className={styles.status}>Status: Pending</p>
          <p className={styles.duration}>Duration: 1h 5m</p>
          <p className={styles.students}>Students: 0</p>
          <p className={styles.price}>Price: $100.00</p>
          <div className={styles.buttons}>
            <button className={styles.editButton}>Edit</button>
            <button className={styles.deleteButton}>Delete</button>
            <button className={styles.duplicateButton}>Duplicate</button>
          </div>
        </div>
      </div>

      {/* Card 4 */}
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img className={styles.courseImage} src="/path/to/course-image.jpg" alt="Course" />
        </div>
        <div className={styles.content}>
          <div className={styles.rating}>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
          </div>
          <h3 className={styles.courseName}>Photography Course</h3>
          <p className={styles.status}>Status: Pending</p>
          <p className={styles.duration}>Duration: 1h 5m</p>
          <p className={styles.students}>Students: 0</p>
          <p className={styles.price}>Price: $100.00</p>
          <div className={styles.buttons}>
            <button className={styles.editButton}>Edit</button>
            <button className={styles.deleteButton}>Delete</button>
            <button className={styles.duplicateButton}>Duplicate</button>
          </div>
        </div>
      </div>

      {/* Card 5 */}
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img className={styles.courseImage} src="/path/to/course-image.jpg" alt="Course" />
        </div>
        <div className={styles.content}>
          <div className={styles.rating}>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
            <span className={styles.star}>&#9733;</span>
          </div>
          <h3 className={styles.courseName}>Photography Course</h3>
          <p className={styles.status}>Status: Pending</p>
          <p className={styles.duration}>Duration: 1h 5m</p>
          <p className={styles.students}>Students: 0</p>
          <p className={styles.price}>Price: $100.00</p>
          <div className={styles.buttons}>
            <button className={styles.editButton}>Edit</button>
            <button className={styles.deleteButton}>Delete</button>
            <button className={styles.duplicateButton}>Duplicate</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseInfoCard;
