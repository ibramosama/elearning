import React, { useState, useEffect } from 'react';
import styles from '../CSS/InstructorProfile.module.css';
import CourseInfoCard from './CourseInfoCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGridHorizontal } from '@fortawesome/free-regular-svg-icons';



const VerticalTabs = () => {
  const [activeTab, setActiveTab] = useState('My Courses');

  useEffect(() => {
    document.getElementById('defaultOpen').click();
  }, []);

  const openTab = (evt, tabName) => {
    const tabcontent = document.getElementsByClassName(styles.tabcontent);
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = 'none';
    }

    const tablinks = document.getElementsByClassName(styles.tablinks);
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
    setActiveTab(tabName);
  };

  return (
    <div>
     
      <div className={styles.tab}>
        <button
          className={`${styles.tablinks} ${activeTab === 'Dashboard' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'Dashboard')}
         
        >
        Dashboard
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'profile' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'profile')}
        >
          profile
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'Enrolled courses' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'Enrolled courses')}
        >
          Enrolled courses
              </button>
               <button
          className={`${styles.tablinks} ${activeTab === 'wishlist' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'wishlist')}
         
        >
       wishlist
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'reviews')}
        >
         reviews
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'my quiz attemps' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'my quiz attemps')}
        >
          my quiz attemps
        </button>
         <button
          className={`${styles.tablinks} ${activeTab === 'Purchase History' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'Purchase History')}
        >
          Purchase History
        </button>

         <button
          className={`${styles.tablinks} ${activeTab === 'My Courses' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'My Courses')}
        >
         My Courses
        </button>
               <button
          className={`${styles.tablinks} ${activeTab === 'Question & Answer' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'Question & Answer')}
         
        >
      Question & Answer
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === 'Assignments' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'Assignments')}
        >
          Assignments
        </button>
        <button
          className={`${styles.tablinks} ${activeTab === ' announcement' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'announcement')}
        >
          announcement
              </button>
               <button
          className={`${styles.tablinks} ${activeTab === 'My Students' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'My Students')}
          id="defaultOpen"
        >
        My Students
        </button>
       
        <button
          className={`${styles.tablinks} ${activeTab === 'Quiz Attempts' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'Quiz Attempts')}
        >
          Quiz Attempts
              </button>
               <button
          className={`${styles.tablinks} ${activeTab === 'withdrawal' ? styles.active : ''}`}
          onClick={(evt) => openTab(evt, 'withdrawal')}
        >
          withdrawal
        </button>
      </div>

      <div id="My Courses" className={styles.tabcontent}>
        <h1>My Courses</h1>
        <CourseInfoCard></CourseInfoCard>
      </div>

      <div id="Dashboard" className={styles.tabcontent}>
        <h3>Dashboard</h3>
        <p>soooooooooooooon Dashboard</p>
      </div>

      <div id="profile" className={styles.tabcontent}>
        <h3>profile</h3>
        <p>soooooooooooooooooooooooon profile</p>
      </div>
       <div id="Enrolled courses" className={styles.tabcontent}>
        <h3>Enrolled courses</h3>
        <p>soooooooooooooon Enrolled courses</p>
      </div>

      <div id="wishlist" className={styles.tabcontent}>
        <h3>wishlist</h3>
        <p>soooooooooooooooooooooooon wishlist</p>
      </div>
      <div id="reviews" className={styles.tabcontent}>
        <h3>reviews</h3>
        <p>soooooooooooooooooooooooon reviews</p>
      </div>
      <div id="my quiz attemps" className={styles.tabcontent}>
        <h3>my quiz attemps</h3>
        <p>soooooooooooooooooooooooon my quiz attemps</p>
      </div>
      <div id="Purchase History" className={styles.tabcontent}>
        <h3>Purchase History</h3>
        <p>soooooooooooooooooooooooon Purchase History</p>
      </div>
      <div id="Question & Answer" className={styles.tabcontent}>
        <h3> Question & Answer</h3>
        <p>soooooooooooooooooooooooon Question & Answer</p>
      </div>
      <div id="announcement" className={styles.tabcontent}>
        <h3>announcement</h3>
        <p>soooooooooooooooooooooooon announcement</p>
      </div>


       <div id="Assignments" className={styles.tabcontent}>
        <h3> Assignments</h3>
        <p>soooooooooooooon  Assignments</p>
      </div>

      <div id="My Students" className={styles.tabcontent}>
        <h3>My Students</h3>
        <p>soooooooooooooooooooooooon My Students</p>
      </div>
       <div id="Quiz Attempts" className={styles.tabcontent}>
        <h3> Quiz Attempts</h3>
        <p>soooooooooooooon  Quiz Attempts</p>
      </div>

      <div id="withdrawal" className={styles.tabcontent}>
        <h3> withdrawal</h3>
        <p>soooooooooooooooooooooooon  withdrawal</p>
      </div>

    </div>
  );
};

export default VerticalTabs;
