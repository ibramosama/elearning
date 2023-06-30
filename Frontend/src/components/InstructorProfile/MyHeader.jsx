import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from './MyHeader.module.css';
import Sidebar from './Sidebar';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9rjvry6XuCpS0j19VilQb7dRt3bj4nPn3v2V-XoIMC9nsyLrKhh_A10Yg4yR_XQp7yPE&usqp=CAU" alt="Logo" />
      </div>
      <div className={styles.instructor}>
        <img src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Instructor" className={styles.instructorImage} />
        <div className={styles.instructorInfo}>
          <h1>Dina Aly</h1>
          <div className={styles.rating}>
            <span className={styles.stars} style={{ color: '#FFD700' }}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className={styles.ratingValue}>4.50</span>
            <span className={styles.ratingCount}>(12 ratings)</span>
          </div>
        </div>
      </div>
      <button className={styles.addCourseBtn}>
        Add a New Course
      </button>
      <div className={styles.collapsedSidebar}>
     
      </div>
    </header>
  );
};

export default Header;
