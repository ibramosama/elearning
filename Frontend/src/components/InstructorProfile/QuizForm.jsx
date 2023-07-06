import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuizForm.css';

const QuizForm = () => {
  const [quizData, setQuizData] = useState({
    title: '',
    instructions: '',
    start_time: '',
    end_time: '',
    deadline_days: '',
    course: '',
    questions: [
      {
        question_text: '',
        options: [
          { option_text: '', is_correct: false },
          { option_text: '', is_correct: false },
          { option_text: '', is_correct: false },
          { option_text: '', is_correct: false },
        ],
      },
    ],
  });
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const token = localStorage.getItem('access');

  useEffect(() => {
    // Fetch courses
    axios
      .get('http://localhost:8000/course/instructors/courses/approved/', {
        headers: {
          Authorization: `Bearer ${token}`, // Add the Authorization header
        },
      })
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [token]);

  const handleInputChange = (e, questionIndex, optionIndex) => {
    const { name, value } = e.target;

    if (name === 'course') {
      setQuizData((prevData) => ({
        ...prevData,
        [name]: value,
      }));

      // Fetch sections
      axios
        .get(`http://localhost:8000/course/courses/${value}/sections/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setSections(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (name === 'question_text') {
      const questions = [...quizData.questions];
      questions[questionIndex].question_text = value;
      setQuizData((prevData) => ({
        ...prevData,
        questions,
      }));
    } else if (name === 'option_text') {
      const questions = [...quizData.questions];
      questions[questionIndex].options[optionIndex].option_text = value;
      setQuizData((prevData) => ({
        ...prevData,
        questions,
      }));
    } else if (name === 'is_correct') {
      const questions = [...quizData.questions];
      questions[questionIndex].options[optionIndex].is_correct = e.target.checked;
      setQuizData((prevData) => ({
        ...prevData,
        questions,
      }));
    }
  };

  const handleAddQuestion = () => {
    const questions = [...quizData.questions];
    questions.push({
      question_text: '',
      options: [
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
        { option_text: '', is_correct: false },
      ],
    });
    setQuizData((prevData) => ({
      ...prevData,
      questions,
    }));
  };

  const handleRemoveQuestion = (questionIndex) => {
    const questions = [...quizData.questions];
    questions.splice(questionIndex, 1);
    setQuizData((prevData) => ({
      ...prevData,
      questions,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8000/Assign/quizzes/', quizData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <div className="container1">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
  type="text"
  id="title"
  name="title"
  value={quizData.title}
  onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
/>

          <label htmlFor="instructions">Instructions:</label>
          <textarea
  id="instructions"
  name="instructions"
  value={quizData.instructions}
  onChange={(e) => setQuizData({ ...quizData, instructions: e.target.value })}
></textarea>

          <label htmlFor="start_time">Start Time:</label>
          <input
  type="time"
  id="start_time"
  name="start_time"
  value={quizData.start_time}
  onChange={(e) => setQuizData({ ...quizData, start_time: e.target.value })}
/>

          <label htmlFor="end_time">End Time:</label>
          <input
  type="time"
  id="end_time"
  name="end_time"
  value={quizData.end_time}
  onChange={(e) => setQuizData({ ...quizData, end_time: e.target.value })}
/>

          <label htmlFor="deadline_days">Deadline Days:</label>
          <input
  type="number"
  id="deadline_days"
  name="deadline_days"
  value={quizData.deadline_days}
  onChange={(e) => setQuizData({ ...quizData, deadline_days: e.target.value })}
/>

          <label htmlFor="course">Course:</label>
          <select
            id="course"
            name="course"
            value={quizData.course}
            onChange={handleInputChange}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          <label htmlFor="section">Section:</label>
          <select
            id="section"
            name="section"
            value={quizData.section}
            onChange={handleInputChange}
          >
            <option value="">Select a section</option>
            {sections.map((section) => (
              <option key={section.id} value={section.id}>
                {section.section}
              </option>
            ))}
          </select>

          {quizData.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="question">
              <label htmlFor={`question-${questionIndex}`}>
                Question {questionIndex + 1}:
              </label>
              <input
                type="text"
                id={`question-${questionIndex}`}
                name="question_text"
                value={question.question_text}
                onChange={(e) => handleInputChange(e, questionIndex)}
              />

              <label>Options:</label>
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="option">
                  <input
                    type="text"
                    name="option_text"
                    value={option.option_text}
                    onChange={(e) => handleInputChange(e, questionIndex, optionIndex)}
                  />
                  <label>
                    Correct
                    <input
                      type="checkbox"
                      name="is_correct"
                      checked={option.is_correct}
                      onChange={(e) => handleInputChange(e, questionIndex, optionIndex)}
                    />
                  </label>
                </div>
              ))}

              <button type="button" onClick={() => handleRemoveQuestion(questionIndex)}>
                Remove Question
              </button>
            </div>
          ))}
          
          <button type="button" onClick={handleAddQuestion}>
            Add Question
          </button>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default QuizForm;
