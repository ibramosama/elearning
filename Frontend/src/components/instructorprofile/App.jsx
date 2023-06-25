import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InstructorProfile from '../src/components/InstructorProfile';


const App = () => {
  return (
    <Router>
      <div className="app">
       
        <Routes>
          <Route path="/" element={<InstructorProfile />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

