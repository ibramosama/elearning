import React from "react"
import styles from "./footer.module.css";
import img from "../../assets/images/dark-logo.png"

const data = [
    {
      title: "About",
      text: [{ list: "About Us" }, { list: "Courses" }, { list: "Instructor" }, { list: "Events" }, { list: "Become A Teacher" }],
    },
    {
      title: "Links",
      text: [{ list: "News & Blogs" }, { list: "Library" }, { list: "Gallery" }, { list: "Partners" }, { list: "Career" }],
    },
    {
      title: "Support",
      text: [{ list: "Documentation" }, { list: "FAQs" }, { list: "Forum" }, { list: "Sitemap" }],
    },
  ]

 export const Footer = () => {
    return (
      <>
        
        <footer  className={styles.footer}>
          <div className={styles.container}>
          
            <div className={styles.box}>
              <div className={styles.logo}>
              <img src={img} alt="Img"/>
              <div className={styles["social-media"]}>
            <a href="www.google.com"><i className="fab fa-facebook-f"></i></a>
            <a href="www.google.com"><i className="fab fa-twitter"></i></a>
            <a href="www.google.com"><i className="fab fa-instagram"></i></a>
          </div>

          <div className={styles["copy-right"]}>
            <p>&copy; 2023 Your Company. All Rights Reserved.</p>
          </div>
                 </div>
                 </div>
  
            {data.map((val) => (
              <div className={styles.box} key={val.title}>
                <h3>{val.title}</h3>
                <ul>
                  {val.text.map((items, index) => (
                    <li key={index}> {items.list} </li>
                  ))}
                </ul>
                
              </div>
            ))}
          </div>
          
        </footer>
        <div className={styles.legal}>
        </div>
      </>
    )
  }
    
