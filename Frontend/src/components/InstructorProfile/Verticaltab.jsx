import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faGraduationCap, faHeart, faStar, faHistory, faChalkboardTeacher, faBell, faMoneyBillAlt, faQuestionCircle, faFileAlt, faUsers, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './LeftSidebar.module.css';
import CourseInfoCard from './CourseInfoCard';

const LeftSidebar = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleResize = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      {isSidebarVisible && (
        <div className={styles.leftSidebar}>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'dashboard' ? styles.active : ''}`}
            onClick={() => handleTabClick('dashboard')}
          >
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span>Dashboard</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'profile' ? styles.active : ''}`}
            onClick={() => handleTabClick('profile')}
          >
            <FontAwesomeIcon icon={faUser} />
            <span>My Profile</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'courses' ? styles.active : ''}`}
            onClick={() => handleTabClick('courses')}
          >
            <FontAwesomeIcon icon={faGraduationCap} />
            <span>Enrolled Courses</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'wishlist' ? styles.active : ''}`}
            onClick={() => handleTabClick('wishlist')}
          >
            <FontAwesomeIcon icon={faHeart} />
            <span>Wishlist</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => handleTabClick('reviews')}
          >
            <FontAwesomeIcon icon={faStar} />
            <span>Reviews</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'quiz-attempts' ? styles.active : ''}`}
            onClick={() => handleTabClick('quiz-attempts')}
          >
            <FontAwesomeIcon icon={faHistory} />
            <span>My Quiz Attempts</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'purchase-history' ? styles.active : ''}`}
            onClick={() => handleTabClick('purchase-history')}
          >
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <span>Purchase History</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'instructor' ? styles.active : ''}`}
            onClick={() => handleTabClick('instructor')}
          >
            <FontAwesomeIcon icon={faChalkboardTeacher} />
            <span> INSTRUCTOR</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'my-courses' ? styles.active : ''}`}
            onClick={() => handleTabClick('my-courses')}
          >
            <FontAwesomeIcon icon={faGraduationCap} />
            <span>My Courses</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'announcements' ? styles.active : ''}`}
            onClick={() => handleTabClick('announcements')}
          >
            <FontAwesomeIcon icon={faBell} />
            <span>Announcements</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'withdrawals' ? styles.active : ''}`}
            onClick={() => handleTabClick('withdrawals')}
          >
            <FontAwesomeIcon icon={faMoneyBillAlt} />
            <span>Withdrawals</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'quiz-attempts-instructor' ? styles.active : ''}`}
            onClick={() => handleTabClick('quiz-attempts-instructor')}
          >
            <FontAwesomeIcon icon={faHistory} />
            <span>Quiz Attempts</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'qna' ? styles.active : ''}`}
            onClick={() => handleTabClick('qna')}
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
            <span>Question & Answer</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'assignments' ? styles.active : ''}`}
            onClick={() => handleTabClick('assignments')}
          >
            <FontAwesomeIcon icon={faFileAlt} />
            <span>Assignments</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'my-students' ? styles.active : ''}`}
            onClick={() => handleTabClick('my-students')}
          >
            <FontAwesomeIcon icon={faUsers} />
            <span>My Students</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'settings' ? styles.active : ''}`}
            onClick={() => handleTabClick('settings')}
          >
            <FontAwesomeIcon icon={faCog} />
            <span>Settings</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'logout' ? styles.active : ''}`}
            onClick={() => handleTabClick('logout')}
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </div>
        </div>
      )}
      <div className={styles.mainContent}>
        {activeTab === 'my-courses' && <CourseInfoCard />}
        {/* Render other components based on activeTab */}
      </div>
    </div>
  );
};

export default LeftSidebar;
