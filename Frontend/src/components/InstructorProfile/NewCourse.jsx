import React, { useState } from 'react';
import axios from 'axios';

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    duration: '',
    price: '',
    category: '',
    courseImage: null,
    sections: [],
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, courseImage: file }));
  };

  const handleSectionChange = (e, index) => {
    const { name, value } = e.target;
    const sections = [...formData.sections];
    sections[index] = { ...sections[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, sections }));
  };

  const handleAddSection = () => {
    setFormData((prevData) => ({
      ...prevData,
      sections: [...prevData.sections, { section: '', videos: [], assignments: [], quizzes: [] }],
    }));
  };

  const handleVideoChange = (e, sectionIndex, videoIndex) => {
    const { name, value } = e.target;
    const sections = [...formData.sections];
    const videos = [...sections[sectionIndex].videos];
    videos[videoIndex] = { ...videos[videoIndex], [name]: value };
    sections[sectionIndex].videos = videos;
    setFormData((prevData) => ({ ...prevData, sections }));
  };

  const handleAddVideo = (sectionIndex) => {
    const sections = [...formData.sections];
    sections[sectionIndex].videos.push({ title: '', video: null });
    setFormData((prevData) => ({ ...prevData, sections }));
  };

  const handleAssignmentChange = (e, sectionIndex, assignmentIndex) => {
    const { name, value } = e.target;
    const sections = [...formData.sections];
    const assignments = [...sections[sectionIndex].assignments];
    assignments[assignmentIndex] = { ...assignments[assignmentIndex], [name]: value };
    sections[sectionIndex].assignments = assignments;
    setFormData((prevData) => ({ ...prevData, sections }));
  };

  const handleAddAssignment = (sectionIndex) => {
    const sections = [...formData.sections];
    sections[sectionIndex].assignments.push({ title: '', instructions: '', file: null });
    setFormData((prevData) => ({ ...prevData, sections }));
  };

  const handleQuizChange = (e, sectionIndex, quizIndex) => {
    const { name, value } = e.target;
    const sections = [...formData.sections];
    const quizzes = [...sections[sectionIndex].quizzes];
    quizzes[quizIndex] = { ...quizzes[quizIndex], [name]: value };
    sections[sectionIndex].quizzes = quizzes;
    setFormData((prevData) => ({ ...prevData, sections }));
  };

  const handleAddQuiz = (sectionIndex) => {
    const sections = [...formData.sections];
    sections[sectionIndex].quizzes.push({ title: '', instructions: '', start_time: '', end_time: '' });
    setFormData((prevData) => ({ ...prevData, sections }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'sections') {
        formData[key].forEach((section, index) => {
          for (const sectionKey in section) {
            if (sectionKey === 'videos' || sectionKey === 'assignments' || sectionKey === 'quizzes') {
              section[sectionKey].forEach((item, itemIndex) => {
                for (const itemKey in item) {
                  if (itemKey === 'file' || itemKey === 'video') {
                    formDataToSend.append(`${key}[${index}][${sectionKey}][${itemIndex}][${itemKey}]`, item[itemKey]);
                  } else {
                    formDataToSend.append(`${key}[${index}][${sectionKey}][${itemIndex}][${itemKey}]`, item[itemKey]);
                  }
                }
              });
            } else {
              formDataToSend.append(`${key}[${index}][${sectionKey}]`, section[sectionKey]);
            }
          }
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      await axios.post('http://localhost:8000/course/courses/', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Course created successfully, perform any desired actions
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="create-course-form">
      <h2>Create Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        {/* Add other form fields here */}
        <div className="form-group">
          <label htmlFor="courseImage">Course Image</label>
          <input
            type="file"
            id="courseImage"
            name="courseImage"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Sections</label>
          {formData.sections.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`}>
              <div className="form-group">
                <label htmlFor={`section-${sectionIndex}`}>Section {sectionIndex + 1}</label>
                <input
                  type="text"
                  id={`section-${sectionIndex}`}
                  name={`sections[${sectionIndex}][section]`}
                  value={section.section}
                  onChange={(e) => handleSectionChange(e, sectionIndex)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Videos</label>
                {section.videos.map((video, videoIndex) => (
                  <div key={`video-${sectionIndex}-${videoIndex}`}>
                    <input
                      type="text"
                      name={`sections[${sectionIndex}][videos][${videoIndex}][title]`}
                      placeholder="Title"
                      value={video.title}
                      onChange={(e) => handleVideoChange(e, sectionIndex, videoIndex)}
                      required
                    />
                    <input
                      type="file"
                      name={`sections[${sectionIndex}][videos][${videoIndex}][video]`}
                      accept="video/*"
                      onChange={(e) => handleVideoChange(e, sectionIndex, videoIndex)}
                      required
                    />
                  </div>
                ))}
                <button type="button" onClick={() => handleAddVideo(sectionIndex)}>Add Video</button>
              </div>
              <div className="form-group">
                <label>Assignments</label>
                {section.assignments.map((assignment, assignmentIndex) => (
                  <div key={`assignment-${sectionIndex}-${assignmentIndex}`}>
                    <input
                      type="text"
                      name={`sections[${sectionIndex}][assignments][${assignmentIndex}][title]`}
                      placeholder="Title"
                      value={assignment.title}
                      onChange={(e) => handleAssignmentChange(e, sectionIndex, assignmentIndex)}
                      required
                    />
                    <textarea
                      name={`sections[${sectionIndex}][assignments][${assignmentIndex}][instructions]`}
                      placeholder="Instructions"
                      value={assignment.instructions}
                      onChange={(e) => handleAssignmentChange(e, sectionIndex, assignmentIndex)}
                      required
                    />
                    <input
                      type="file"
                      name={`sections[${sectionIndex}][assignments][${assignmentIndex}][file]`}
                      accept="application/pdf"
                      onChange={(e) => handleAssignmentChange(e, sectionIndex, assignmentIndex)}
                      required
                    />
                  </div>
                ))}
                <button type="button" onClick={() => handleAddAssignment(sectionIndex)}>Add Assignment</button>
              </div>
              <div className="form-group">
                <label>Quizzes</label>
                {section.quizzes.map((quiz, quizIndex) => (
                  <div key={`quiz-${sectionIndex}-${quizIndex}`}>
                    <input
                      type="text"
                      name={`sections[${sectionIndex}][quizzes][${quizIndex}][title]`}
                      placeholder="Title"
                      value={quiz.title}
                      onChange={(e) => handleQuizChange(e, sectionIndex, quizIndex)}
                      required
                    />
                    <textarea
                      name={`sections[${sectionIndex}][quizzes][${quizIndex}][instructions]`}
                      placeholder="Instructions"
                      value={quiz.instructions}
                      onChange={(e) => handleQuizChange(e, sectionIndex, quizIndex)}
                      required
                    />
                    <input
                      type="text"
                      name={`sections[${sectionIndex}][quizzes][${quizIndex}][start_time]`}
                      placeholder="Start Time"
                      value={quiz.start_time}
                      onChange={(e) => handleQuizChange(e, sectionIndex, quizIndex)}
                      required
                    />
                    <input
                      type="text"
                      name={`sections[${sectionIndex}][quizzes][${quizIndex}][end_time]`}
                      placeholder="End Time"
                      value={quiz.end_time}
                      onChange={(e) => handleQuizChange(e, sectionIndex, quizIndex)}
                      required
                    />
                  </div>
                ))}
                <button type="button" onClick={() => handleAddQuiz(sectionIndex)}>Add Quiz</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddSection}>Add Section</button>
        </div>
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourseForm;
