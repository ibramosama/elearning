
import React, { useState } from 'react';
import axios from 'axios';
import './NewCourse.css';
import { useEffect } from "react";

const CreateCourseForm = () => {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [customCategory, setCustomCategory] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('');
  const [courseImage, setCourseImage] = useState(null);
  const [sections, setSections] = useState([{ section: '', videos: [], assignments: [], quizzes: [] }]);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/course/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
  
    if (selectedCategory === 'other') {
      setCustomCategory('');
    }
  };
  
  const handleCustomCategoryChange = (event) => {
    setCustomCategory(event.target.value);
  };
  
  const handleVideoChange = (sectionIndex, videoIndex, event) => {
    const values = [...sections];
    values[sectionIndex].videos[videoIndex][event.target.name] = event.target.value;
    setSections(values);
  };

  const handleAssignmentChange = (sectionIndex, assignmentIndex, event) => {
    const values = [...sections];
    values[sectionIndex].assignments[assignmentIndex][event.target.name] = event.target.value;
    if (event.target.type === 'file') {
      values[sectionIndex].assignments[assignmentIndex].file = event.target.files[0];
    }
    setSections(values);
  };

  
  const handleSectionChange = (index, event) => {
    const { name, value } = event.target;
    const values = [...sections];
    values[index][name] = value;
    setSections(values);
  };
  
  const handleAddSection = () => {
    const values = [...sections];
    values.push({ section: '', videos: [], assignments: [], quizzes: [] });
    setSections(values);
  };

  const handleRemoveSection = (index) => {
    const values = [...sections];
    values.splice(index, 1);
    setSections(values);
  };

  const handleAddVideo = (sectionIndex) => {
    const values = [...sections];
    values[sectionIndex].videos.push({ title: '', video: null });
    setSections(values);
  };

  const handleRemoveVideo = (sectionIndex, videoIndex) => {
    const values = [...sections];
    values[sectionIndex].videos.splice(videoIndex, 1);
    setSections(values);
  };

  const handleAddAssignment = (sectionIndex) => {
    const values = [...sections];
    values[sectionIndex].assignments.push({ title: '', instructions: '', deadline_days: '', file: null });
    setSections(values);
  };

  const handleRemoveAssignment = (sectionIndex, assignmentIndex) => {
    const values = [...sections];
    values[sectionIndex].assignments.splice(assignmentIndex, 1);
    setSections(values);
  };

  const handleQuizChange = (sectionIndex, quizIndex, event) => {
    const values = [...sections];
    values[sectionIndex].quizzes[quizIndex][event.target.name] = event.target.value;
    setSections(values);
  };
 

  const handleAddQuiz = (sectionIndex) => {
    const values = [...sections];
    values[sectionIndex].quizzes.push({ title: '', instructions: '', start_time: '', end_time: '', deadline_days: '' });
    setSections(values);
  };

  const handleRemoveQuiz = (sectionIndex, quizIndex) => {
    const values = [...sections];
    values[sectionIndex].quizzes.splice(quizIndex, 1);
    setSections(values);
  };
  const handleVideoFileChange = (sectionIndex, videoIndex, event) => {
    const file = event.target.files[0];
    const values = [...sections];
    values[sectionIndex].videos[videoIndex].video = file;
    setSections(values);
  };
  
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('duration', duration);
    formData.append('price', price);

    if (category === 'other') {
      formData.append('category.name', customCategory);
    } else {
      formData.append('category.name', category);
    }    

    formData.append('description', description);
    formData.append('level', level);
    formData.append('course_image', courseImage);
  
    sections.forEach((section, sectionIndex) => {
      formData.append(`sections[${sectionIndex}]section`, section.section);
  
      section.videos.forEach((video, videoIndex) => {
        formData.append(`sections[${sectionIndex}]videos[${videoIndex}]title`, video.title);
        if (video.video instanceof File) {
          formData.append(`sections[${sectionIndex}]videos[${videoIndex}]video`, video.video);
        } else {
          // Handle error when video is not uploaded
          console.log("Video not uploaded for section", sectionIndex, "video", videoIndex);
        }      });
  
      section.assignments.forEach((assignment, assignmentIndex) => {
        formData.append(`sections[${sectionIndex}]assignments[${assignmentIndex}]title`, assignment.title);
        formData.append(`sections[${sectionIndex}]assignments[${assignmentIndex}]instructions`, assignment.instructions);
        formData.append(`sections[${sectionIndex}]assignments[${assignmentIndex}]deadline_days`, assignment.deadline_days);
        console.log(assignment.file)
        if (assignment.file instanceof File) {
          formData.append(`sections[${sectionIndex}]assignments[${assignmentIndex}]file`, assignment.file);
        } else {
          // Handle error when file is not uploaded
          console.log("File not uploaded for section", sectionIndex, "assignment", assignmentIndex);
        }      });

        
     
      section.quizzes.forEach((quiz, quizIndex) => {
        formData.append(`sections[${sectionIndex}]quizzes[${quizIndex}]title`, quiz.title);
        formData.append(`sections[${sectionIndex}]quizzes[${quizIndex}]instructions`, quiz.instructions);
        formData.append(`sections[${sectionIndex}]quizzes[${quizIndex}]start_time`, quiz.start_time);
        formData.append(`sections[${sectionIndex}]quizzes[${quizIndex}]end_time`, quiz.end_time);
        formData.append(`sections[${sectionIndex}]quizzes[${quizIndex}]deadline_days`, quiz.deadline_days);
      });
    });
    
    axios
      .post('http://localhost:8000/course/courses/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NTM2MjU5LCJpYXQiOjE2ODg1MTgyNTksImp0aSI6IjFkZDY3MzgwZmZlMTRkMTc4ZWRhYzA2NWIwYTg0N2ZlIiwidXNlcl9pZCI6MywiZW1haWwiOiJpYnJhbS5vc2FtYTE3QGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiJ9.pTcGX2mftSCJ3xLKTnrmph6Z-hFjVbZzQhb2rV_F4i4`,
        },
      })
  
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
<form className="NewCourseForm" onSubmit={handleSubmit}>
  <h1>Create New Course</h1>
<div className="course-data">
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)} />
      </div>

      <div>
        <label htmlFor="duration">Duration:</label>
        <input type="number" id="duration" name="duration" value={duration} onChange={(event) => setDuration(event.target.value)} />
      </div>

      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" value={price} onChange={(event) => setPrice(event.target.value)} />
      </div>

      <div>
        <label htmlFor="category">Category:</label>
        <select id="category" name="category" value={category} onChange={handleCategoryChange}>
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
          <option value="other">Other</option>
        </select>

        {category === "other" && (
          <div>
            <input
              type="text"
              name="custom_category"
              placeholder="Enter a custom category"
              value={customCategory}
              onChange={handleCustomCategoryChange}
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={description} onChange={(event) => setDescription(event.target.value)} />
      </div>

      <div>
        <label htmlFor="level">Level:</label>
        <select id="level" name="level" value={level} onChange={(event) => setLevel(event.target.value)}>
          <option value="">Select a level</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label htmlFor="courseImage">Course Image:</label>
        <input type="file" id="courseImage" name="courseImage" onChange={(event) => setCourseImage(event.target.files[0])} />
      </div>
</div>
      {sections.map((section, sectionIndex) => (
      <div key={sectionIndex} className="section-container">
        
          <div>
            <label htmlFor={`section-${sectionIndex}`}>Section {sectionIndex + 1}:</label>
            <input type="text" id={`section-${sectionIndex}`} name="section" value={section.section} onChange={(event) => handleSectionChange(sectionIndex, event)} />
            <button type="button" onClick={() => handleRemoveSection(sectionIndex)}>Remove Section</button>
          </div>

          <div>
            <h4>Videos:</h4>
            {section.videos.map((video, videoIndex) => (
              <div key={videoIndex}>
                <label htmlFor={`video-${sectionIndex}-${videoIndex}-title`}>Title:</label>
                <input type="text" id={`video-${sectionIndex}-${videoIndex}-title`} name="title" value={video.title} onChange={(event) => handleVideoChange(sectionIndex, videoIndex, event)} />
                <label htmlFor={`video-${sectionIndex}-${videoIndex}-video`}>Video:</label>
                <input
                  type="file"
                  name="video"
                  onChange={(event) => handleVideoFileChange(sectionIndex, videoIndex, event)}
                />
                <button type="button" onClick={() => handleRemoveVideo(sectionIndex, videoIndex)}>Remove Video</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddVideo(sectionIndex)}>Add Video</button>
          </div>

          <div>
            <h4>Assignments:</h4>
            {section.assignments.map((assignment, assignmentIndex) => (
              <div key={assignmentIndex}>
                <label htmlFor={`assignment-${sectionIndex}-${assignmentIndex}-title`}>Title:</label>
                <input type="text" id={`assignment-${sectionIndex}-${assignmentIndex}-title`} name="title" value={assignment.title} onChange={(event) => handleAssignmentChange(sectionIndex, assignmentIndex, event)} />
                <label htmlFor={`assignment-${sectionIndex}-${assignmentIndex}-instructions`}>Instructions:</label>
                <textarea id={`assignment-${sectionIndex}-${assignmentIndex}-instructions`} name="instructions" value={assignment.instructions} onChange={(event) => handleAssignmentChange(sectionIndex, assignmentIndex, event)} />
                <label htmlFor={`assignment-${sectionIndex}-${assignmentIndex}-deadline_days`}>Deadline (days):</label>
                <input type="number" id={`assignment-${sectionIndex}-${assignmentIndex}-deadline_days`} name="deadline_days" value={assignment.deadline_days} onChange={(event) => handleAssignmentChange(sectionIndex, assignmentIndex, event)} />
                <label htmlFor={`assignment-${sectionIndex}-${assignmentIndex}-file`}>File:</label>
                <input type="file" id={`assignment-${sectionIndex}-${assignmentIndex}-file`} name="file" onChange={(event) => handleAssignmentChange(sectionIndex, assignmentIndex, event)} />
                <button type="button" onClick={() => handleRemoveAssignment(sectionIndex, assignmentIndex)}>Remove Assignment</button>
              </div>
            ))}
            <button type="button" onClick={() => handleAddAssignment(sectionIndex)}>Add Assignment</button>
          </div>

          <div>
            <h4>Quizzes:</h4>
            {section.quizzes.map((quiz, quizIndex) => (
             <div key={quizIndex}>
             <label htmlFor={`quiz-${sectionIndex}-${quizIndex}-title`}>Title:</label>
             <input type="text" id={`quiz-${sectionIndex}-${quizIndex}-title`} name="title" value={quiz.title} onChange={(event) => handleQuizChange(sectionIndex, quizIndex, event)} />
             <label htmlFor={`quiz-${sectionIndex}-${quizIndex}-instructions`}>Instructions:</label>
             <textarea id={`quiz-${sectionIndex}-${quizIndex}-instructions`} name="instructions" value={quiz.instructions} onChange={(event) => handleQuizChange(sectionIndex, quizIndex, event)} />
             <label htmlFor={`quiz-${sectionIndex}-${quizIndex}-start_time`}>Start Time:</label>
             <input type="datetime-local" id={`quiz-${sectionIndex}-${quizIndex}-start_time`} name="start_time" value={quiz.start_time} onChange={(event) => handleQuizChange(sectionIndex, quizIndex, event)} />
             <label htmlFor={`quiz-${sectionIndex}-${quizIndex}-end_time`}>End Time:</label>
             <input type="datetime-local" id={`quiz-${sectionIndex}-${quizIndex}-end_time`} name="end_time" value={quiz.end_time} onChange={(event) => handleQuizChange(sectionIndex, quizIndex, event)} />
             <label htmlFor={`quiz-${sectionIndex}-${quizIndex}-deadline_days`}>Deadline (days):</label>
             <input type="number" id={`quiz-${sectionIndex}-${quizIndex}-deadline_days`} name="deadline_days" value={quiz.deadline_days} onChange={(event) => handleQuizChange(sectionIndex, quizIndex, event)} />
             <button type="button" onClick={() => handleRemoveQuiz(sectionIndex, quizIndex)}>Remove Quiz</button>
           </div>
           
))}
<button type="button" onClick={() => handleAddQuiz(sectionIndex)}>Add Quiz</button>
</div>
</div>
))}
<button type="button" onClick={handleAddSection}>Add Section</button>

<button type="submit">Create Course</button>
</form>
);
};

export default CreateCourseForm;
