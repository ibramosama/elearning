import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faGraduationCap, faHeart, faStar, faHistory, faChalkboardTeacher, faBell, faMoneyBillAlt, faQuestionCircle, faFileAlt, faUsers, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styles from './LeftSidebar.module.css';
import CourseInfoCard from './CourseInfoCard';
import  UserProfile  from './InstructorInfo';
import QuizForm from './QuizForm';

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
            className={`${styles.sidebarItem} ${activeTab === 'reviews' ? styles.active : ''}`}
            onClick={() => handleTabClick('reviews')}
          >
            <FontAwesomeIcon icon={faStar} />
            <span>Reviews</span>
          </div>
          <div
            className={`${styles.sidebarItem} ${activeTab === 'َQuiz' ? styles.active : ''}`}
            onClick={() => handleTabClick('َQuiz')}
          >
            <FontAwesomeIcon icon={faHistory} />
            <span>َCreate Quiz</span>
          </div>

          <div
            className={`${styles.sidebarItem} ${activeTab === 'my-courses' ? styles.active : ''}`}
            onClick={() => handleTabClick('my-courses')}
          >
            <FontAwesomeIcon icon={faGraduationCap} />
            <span>My Courses</span>
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
        {activeTab === 'profile' && <UserProfile />}     
        {activeTab === 'َQuiz' && <QuizForm />}     

         </div>
    </div>
  );
};

export default LeftSidebar;
