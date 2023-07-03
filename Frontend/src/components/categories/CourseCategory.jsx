import React, { useState } from "react"
import { course_category } from "./CategoryData"
// import "./category.css"
import styles from "./category.module.css"
export const CourseCategory = () => {
  const [menuItems, setMenuItem] = useState(course_category)

  const filterItems = (category) => {
    const newItems = course_category.filter((item) => item.category === category)
    setMenuItem(newItems)

    // for all data show
    if (category === "All") {
      setMenuItem(course_category)
      return
    }
    
  }
  return (
    <>
      <section className={styles.course_category}>
        <div className={styles.scontainer}>
          <div className={styles.button}>
            <button onClick={() => filterItems("All")} className={styles.btn1}>
            All
            </button>
            <button onClick={() => filterItems("Trending")} className={styles.btn1}>
            Trending
            </button>
            <button onClick={() => filterItems("Popularity")} className={styles.btn1}>
            Popularity
            </button>
            <button onClick={() => filterItems("Featured")} className={styles.btn1}>
            Featured
            </button>
            <button onClick={() => filterItems("Arts & Design")} className={styles.btn1}>
            Arts & Design
            </button>
          
          </div>

          <div className={`${styles.content} ${styles.grid2}`}>
            {menuItems.map((items) => (
              <div className={styles.box} key={items.id}>
                <div className={styles.img}>
                  <img src={items.image} alt='' />
                </div>
                <div className={styles.title}>
                  <h4>{items.level}</h4>
                  <p>{items.title}</p> 
                  <h3>{items.instructorName}</h3>
                  {items.rate.map((icon) => (
                  <span>{icon}</span>
                  ))}
                </div>
                <label>PRICE {items.price}</label>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

