import React, { useState, useEffect } from 'react';
import styles from '../CSS/InstructorProfile.module.css';
import CourseInfoCard from './CourseInfoCard';

const VerticalTabs = () => {
  const [activeTab, setActiveTab] = useState('London');

  useEffect(() => {
    document.getElementById('defaultOpen').click();
  }, []);

  const openCity = (evt, cityName) => {
    const tabcontent = document.getElementsByClassName(styles.tabcontent);
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }

    const tablinks = document.getElementsByClassName(styles.tablinks);
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(cityName).style.display = 'block';
    evt.currentTarget.className += ' active';
    setActiveTab(cityName);
  };

  return (
    <div>
     
      <div className={styles.tab}>
        <button
          className={`${styles.tablinks} ${activeTab === 'London' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'London')}
         
        >
        Dashboard
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'Paris' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'Paris')}
        >
          profile
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'Tokyo' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'Tokyo')}
        >
          Enrolled courses
              </button>
               <button
          className={`${styles.tablinks} ${activeTab === 'London' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'London')}
         
        >
       wishlist
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'Paris' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'Paris')}
        >
         reviews
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'Tokyo' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'Tokyo')}
        >
          my quiz attemps
              </button>
               <button
          className={`${styles.tablinks} ${activeTab === 'London' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'London')}
         
        >
       My Courses
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'Paris' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'Paris')}
        >
          purshace history
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'Tokyo' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'Tokyo')}
        >
          announcement
              </button>
               <button
          className={`${styles.tablinks} ${activeTab === 'London' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'London')}
          id="defaultOpen"
        >
        withdrawal
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'Paris' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'Paris')}
        >
          profile
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'Tokyo' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'Tokyo')}
        >
          Enrolled courses
              </button>
               <button
          className={`${styles.tablinks} ${activeTab === 'Tokyo' ? styles.active : ''}`}
          onClick={(evt) => openCity(evt, 'Tokyo')}
        >
          Enrolled courses
        </button>
      </div>

      <div id="London" className={styles.tabcontent}>
        <h1>My Courses</h1>
        <CourseInfoCard></CourseInfoCard>
      </div>

      <div id="Paris" className={styles.tabcontent}>
        <h3>Paris</h3>
        <p>Paris is the capital of France.</p>
      </div>

      <div id="Tokyo" className={styles.tabcontent}>
        <h3>Tokyo</h3>
        <p>Tokyo is the capital of Japan.</p>
      </div>
    </div>
  );
};

export default VerticalTabs;
