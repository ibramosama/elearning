import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Import Link from React Router
import styles from './MyHeader.module.css';
import Sidebar from './Sidebar';

const Header = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access'); // Replace with your actual token

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/user/profile/', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.log('Error: ', response.status);
        }
      } catch (error) {
        console.log('Error: ', error);
      }
    };

    fetchData();
  }, []);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9rjvry6XuCpS0j19VilQb7dRt3bj4nPn3v2V-XoIMC9nsyLrKhh_A10Yg4yR_XQp7yPE&usqp=CAU" alt="Logo" />
      </div>
      <div className={styles.instructor}>
        <img src={profileData.image} alt="Instructor" className={styles.instructorImage} />
        <div className={styles.instructorInfo}>
          <h1>{profileData.first_name + ' ' + profileData.last_name}</h1>
          <div className={styles.rating}>
            <span className={styles.stars} style={{ color: '#FFD700' }}>
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span className={styles.ratingValue}>{profileData.rating}</span>
            <span className={styles.ratingCount}>({profileData.ratingCount} ratings)</span>
          </div>
        </div>
      </div>
      <Link to="/new-course" className={styles.addCourseBtn}>Add a New Course</Link>
      <div className={styles.collapsedSidebar}>
        <Sidebar />
      </div>
    </header>
  );
};

export default Header;
