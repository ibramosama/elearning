import React, { useState } from 'react';

const CreateCourseForm = () => {
  const [sections, setSections] = useState([{ section: '', videos: [], assignments: [], quizzes: [] }]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedSections = [...sections];
    updatedSections[index] = { ...updatedSections[index], [name]: value };
    setSections(updatedSections);
  };
  

  const handleVideoChange = (sectionIndex, videoIndex, event) => {
    const { name, value } = event.target;
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos[videoIndex][name] = value;
    setSections(updatedSections);
  };

  const handleAssignmentChange = (sectionIndex, assignmentIndex, event) => {
    const { name, value } = event.target;
    const updatedSections = [...sections];
    updatedSections[sectionIndex].assignments[assignmentIndex][name] = value;
    setSections(updatedSections);
  };

  const handleQuizChange = (sectionIndex, quizIndex, event) => {
    const { name, value } = event.target;
    const updatedSections = [...sections];
    updatedSections[sectionIndex].quizzes[quizIndex][name] = value;
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { section: '', videos: [], assignments: [], quizzes: [] }]);
  };

  const handleRemoveSection = (index) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const handleAddVideo = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.push({ title: '', video: '' });
    setSections(updatedSections);
  };

  const handleRemoveVideo = (sectionIndex, videoIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].videos.splice(videoIndex, 1);
    setSections(updatedSections);
  };

  const handleVideoFileChange = (sectionIndex, videoIndex, event) => {
    const files = event.target.files;
    const updatedSections = [...sections];

    if (files && files.length > 0) {
      const videoFile = files[0];
      updatedSections[sectionIndex].videos[videoIndex].videoFile = videoFile;
    } else {
      updatedSections[sectionIndex].videos[videoIndex].videoFile = null;
    }

    setSections(updatedSections);
  };

  const handleAddAssignment = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].assignments.push({ title: '', instructions: '', deadline_days: '' });
    setSections(updatedSections);
  };

  const handleRemoveAssignment = (sectionIndex, assignmentIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].assignments.splice(assignmentIndex, 1);
    setSections(updatedSections);
  };

  const handleAddQuiz = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].quizzes.push({ title: '', instructions: '', start_time: '', end_time: '', deadline_days: '' });
    setSections(updatedSections);
  };

  const handleRemoveQuiz = (sectionIndex, quizIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].quizzes.splice(quizIndex, 1);
    setSections(updatedSections);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your form submission logic here
  };

  return (
    <div className="create-course-form-container">
      <h2>Create Course Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Course Title:</label>
          <input type="text" id="title" name="title" onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Course Duration:</label>
          <input type="number" id="duration" name="duration" onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="price">Course Price:</label>
          <input type="number" id="price" name="price" onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="category">Course Category:</label>
          <input type="text" id="category" name="category" onChange={handleInputChange} required />
        </div>

        {sections.map((section, index) => (
          <div className="section-fields" key={index}>
            <h3>Section {index + 1}</h3>
            <div className="form-group">
              <label htmlFor={`section-${index}`}>Section Title:</label>
              <input
                type="text"
                id={`section-${index}`}
                name="section"
                value={section.section}
                onChange={(event) => handleInputChange(index, event)}
                required
              />
            </div>

            {/* Videos */}
            {section.videos.map((video, videoIndex) => (
              <div className="video-fields" key={videoIndex}>
                <h4>Video {videoIndex + 1}</h4>
                <div className="form-group">
                  <label htmlFor={`video-title-${index}-${videoIndex}`}>Video Title:</label>
                  <input
                    type="text"
                    id={`video-title-${index}-${videoIndex}`}
                    name="title"
                    value={video.title}
                    onChange={(event) => handleVideoChange(index, videoIndex, event)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor={`video-file-${index}-${videoIndex}`}>Video File:</label>
                  <input
                    type="file"
                    id={`video-file-${index}-${videoIndex}`}
                    name="videoFile"
                    onChange={(event) => handleVideoFileChange(index, videoIndex, event)}
                    required
                  />
                </div>
                <button type="button" onClick={() => handleRemoveVideo(index, videoIndex)}>
                  Remove Video
                </button>
              </div>
            ))}

            {/* Add video button */}
            <button type="button" onClick={() => handleAddVideo(index)}>
              Add Video
            </button>

            {/* ... */}

            {/* Remove section button */}
            <button type="button" onClick={() => handleRemoveSection(index)}>
              Remove Section
            </button>
          </div>
        ))}

        {/* Add section button */}
        <button type="button" onClick={handleAddSection}>
          Add Section
        </button>

        {/* Submit button */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateCourseForm;
