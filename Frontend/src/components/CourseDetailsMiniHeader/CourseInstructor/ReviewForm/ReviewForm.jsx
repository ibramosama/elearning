import React, { useContext, useState } from 'react';
import styles from './ReviewForm.module.css';
import {addrating} from '../../../../services/rating.service';
import { AuthContext } from '../../../../context/AuthContext';
import { useParams } from 'react-router-dom';
function ReviewForm() {
  const course_id = useParams()
  const {authUser} =useContext(AuthContext)
  const [formData, setFormData] = useState({rating:'',name: "",email: "",comment: "",user:authUser.user_id,course:course_id.id});
  const handleSubmit = (event) => {
    event.preventDefault();
    
    addrating(formData).then((rating) => {
      console.log(rating)
    }).catch((error) => {
      console.log(error);
    })
    console.log(formData)
};
const handleChange = (event) => {
  const { name, value } = event.target;
  setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
};
const ratingStars = [...document.getElementsByClassName(" rating__star")];
function executeRating(stars) {
  const starClassActive = `${styles.rating__star}  bi bi-star-fill`;
  const starClassInactive = "rating__star bi bi-star ";
  const starsLength = stars.length;
  let i;
  stars.map((star) => {
    star.onclick = () => {
      i = stars.indexOf(star);

      if (star.className===starClassInactive) {
        for (i; i >= 0; --i) stars[i].className = starClassActive;
      } else {
        for (i; i < starsLength; ++i) stars[i].className = starClassInactive;
      }
    };
  });
}
const handel_stars=(val)=>{
  setFormData((prevFormData) => ({ ...prevFormData, ["rating"]: val }));
}
executeRating(ratingStars);
  return ( <div className={`${styles.form_card} ms-3 mb-5`}>
    <form onSubmit={handleSubmit}>
      <div className="rating m-2">
          <span className='me-4'>Rating: </span>
          <i className=" rating__star bi bi-star" onClick={()=>(handel_stars(1))}></i>
          <i className=" rating__star bi bi-star" onClick={()=>(handel_stars(2))}></i>
          <i className=" rating__star bi bi-star" onClick={()=>(handel_stars(3))}></i>
          <i className=" rating__star bi bi-star" onClick={()=>(handel_stars(4))}></i>
          <i className=" rating__star bi bi-star" onClick={()=>(handel_stars(5))}></i>
      </div>
        <div className='d-flex d-fill'>
          <div className="mb-3 flex-fill me-3">
            <input type="text" 
            onChange={handleChange}
            className="form-control" 
            name="name"
            id="exampleFormControlInput1"
            placeholder="your name "/>
          </div>
          <div className="mb-3 flex-fill">
            <input type="email"
            onChange={handleChange} 
            name="email"
            className="form-control" 
            id="exampleFormControlInput1"
            placeholder="name@example.com"/>
          </div>
        </div>
      
        <div className=''>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Comment</label>
            <textarea
            onChange={handleChange} 
            className="form-control" 
            name="comment" 
            id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
        </div>
      <button type="submit" className='btn btn-primary'>Submit</button>
    </form>
  </div> );
}

export default ReviewForm;