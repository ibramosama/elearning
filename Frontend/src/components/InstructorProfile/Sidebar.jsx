import React, { useState } from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {isOpen && (
        <div className={styles.overlay}>
          <button className={styles.closeButton} onClick={handleToggle}>
            Close &times;
          </button>
        </div>
      )}

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <a href="#" className={styles.sidebarLink}>
         Home
        </a>
        <a href="#" className={styles.sidebarLink}>
          Link 2
        </a>
        <a href="#" className={styles.sidebarLink}>
          Link 3
        </a>
      </div>

      <div className={styles.sidebarToggle}>
        <button onClick={handleToggle}>
          {isOpen ? <span>&times;</span> : <span>&#9776;</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
