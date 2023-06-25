import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import styles from '../CSS/InstructorProfile.module.css';
import Sidebar from '../components/Sidebar';


const Header = () => {
  return (
    <header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="logo">
        <img src="data:image/png;base64,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" alt="Logo" />
      </div>
      <div className="instructor" style={{  display: 'flex', alignItems: 'center' }}>
       <img src="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Instructor" style={{ marginRight: '20px',marginLeft: '80px', width: '100px', height: '100px', borderRadius: '50%' }} />

        <div className="instructor-info">
          <h1>Dina Aly </h1>
          <div className="rating">
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
        </div>
      </div>
     <button className={styles.addCourseBtn}>
      Add a New Course
    </button>

          <div className="collapsed-sidebar">
              <Sidebar></Sidebar>
          </div>
          
      </header>
     
  );
};

export default Header;
