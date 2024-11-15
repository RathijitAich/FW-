import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { WorkoutPlan } from './workout_plan';
import { GeneratedPlan } from './generated_plan';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path ("/") to "/workout_plan" */}
        <Route path="/" element={<Navigate to="/workout_plan" />} />

        {/* Define the routes for WorkoutPlan and GeneratedPlan */}
        <Route path="/workout_plan" element={<WorkoutPlan />} />
        <Route path="/generated_plan" element={<GeneratedPlan />} />
      </Routes>
    </Router>
  );
}

export default App;
