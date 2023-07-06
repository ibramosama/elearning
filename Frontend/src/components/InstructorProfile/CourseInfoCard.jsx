import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseInfoCard.css'; // Import the CSS file

const InstructorCourses = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem('access');

  useEffect(() => {
    // Fetch instructor courses
    axios
      .get('http://localhost:8000/course/courses/instructor/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  if (courses.length === 0) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="instructor-courses-container">
      <h2 className="instructor-courses-heading">Instructor Courses</h2>
      <div className="course-list">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-thumbnail">
              <img src={course.course_image} alt={course.title} />
            </div>
            <div className="course-details">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <div className="course-info">
                <p className="course-price">${course.price}</p>
                <p className="course-duration">{course.duration} hours</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstructorCourses;
