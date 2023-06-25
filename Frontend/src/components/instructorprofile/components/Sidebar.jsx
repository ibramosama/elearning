import React, { useState } from 'react';
import styles from '../CSS/InstructorProfile.module.css';
const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openNav = () => {
    setSidebarOpen(true);
  };

  const closeNav = () => {
    setSidebarOpen(false);
  };

  return (
    <div>
      <div
        id="mySidebar"
        className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}
      >
        <a href="javascript:void(0)" className={styles.closebtn} onClick={closeNav}>
          &times;
        </a>
        <a href="#">Home</a>
        <a href="#">Services</a>
        <a href="#">Clients</a>
        <a href="#">Contact</a>
      </div>

      <div id="main">
        <button className={styles.openbtn} onClick={openNav}>
          &#9776;
        </button>
        
      </div>
    </div>
  );
};

export default Sidebar;
