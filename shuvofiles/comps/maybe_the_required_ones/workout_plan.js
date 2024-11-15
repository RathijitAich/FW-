import React, { useState } from "react";
import { Navbar } from "./navbar";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import "./workout_plan.css";

export const WorkoutPlan = () => {
  const navigate = useNavigate(); // Use navigate inside the component
  const [bgColor, setBgColor] = useState("#36454F");
  const [targetMuscles, setTargetMuscles] = useState([]);
  const [equipmentRequired, setEquipmentRequired] = useState("Yes");
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedPlan1, setSelectedPlan1] = useState('');

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };
  const handlePlanChange1 = (event) => {
    setSelectedPlan1(event.target.value);
  };
  const handleColorChange = (event) => {
    setBgColor(event.target.value);
  };

  const handleMuscleChange = (event) => {
    const value = event.target.value;
    setTargetMuscles(
      (prev) =>
        prev.includes(value)
          ? prev.filter((muscle) => muscle !== value)
          : [...prev, value]
    );
  };

  const handleEquipmentChange = (event) => {
    setEquipmentRequired(event.target.value);
  };

  return (
    <div style={{ backgroundColor: bgColor, minHeight: "100vh" }}>
      <Navbar />
      <div className="sourgummy">

      <h1 className="text-center mt-5 HostGrotesk" style={{ color: 'cyan' }}>
  Welcome to the Workout Generator
</h1>
<p className="text-center mt-3 Battambang" style={{ color: 'white', fontSize: '1.2em' }}>
  Our Workout Generator is designed to help you build a personalized fitness routine, whether you're a beginner or a seasoned athlete. 
  Choose from a variety of workout types, target specific muscle groups, and set your fitness goals—all with just a few clicks. 
  Let us take the guesswork out of planning so you can focus on what really matters: achieving your best self!
</p>

</div>


      <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3000"
      data-bs-pause="false"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/gym4.jpg"
            className="d-block w-100 img-fluid"
            alt="First Slide"
            style={{ opacity: 0.5 }} // Set opacity here
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Personalized Workout Plans</h5>
            <p>
              Unlock your full potential with workout plans designed just for you. Whether
              you're a beginner or an advanced athlete, our customized programs adapt to your
              fitness level and goals.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/gym2.jpg"
            className="d-block w-100 img-fluid"
            alt="Second Slide"
            style={{ opacity: 0.5 }} // Set opacity here
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Create Your Own Custom Plan</h5>
            <p>
              Design a workout plan that fits your lifestyle. Input your fitness level,
              preferences, and available time to generate a plan that works for you.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/gym3.jpg"
            className="d-block w-100 img-fluid"
            alt="Third Slide"
            style={{ opacity: 0.5 }} // Set opacity here
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>Detailed Workouts and Progress Tracking</h5>
            <p>
              Follow clear workout instructions with detailed breakdowns, and track your
              progress over time. Stay motivated as you move closer to your fitness goals.
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
{/* 
      <div className="container mt-4">
        <label htmlFor="exampleColorInput" className="form-label">
          Color picker
        </label>
        <input
          type="color"
          className="form-control form-control-color"
          id="exampleColorInput"
          value={bgColor}
          title="Choose your color"
          onChange={handleColorChange}
        />
      </div> */}
      <div>
      <h1 className="text-center mt-5 HostGrotesk" style={{ color: 'cyan' }}>
        Choose from our premade workout plans tailored just for you, or create your own custom plan!
      </h1>

      <div className="container mt-4">
        <div className="p-4 border rounded" style={{ backgroundColor: 'white' }}>
          <h1 className="text-center mt-5" style={{ color: 'grey' }}>
            Select Our Premade Plan Tailored to Your Fitness Level
          </h1>
          <form>
            <div className="mb-3 mt-4">
              <label className="form-label fw-bold Battambang">Choose Your Workout Plan :</label>
              <div> </div>
              <label className="form-label fw-bold">1.Select your fitness level</label>
              
              <select
                className="form-select"
                id="workoutPlan"
                required
                value={selectedPlan1}
                onChange={handlePlanChange1}
              >
                <option value="" disabled>
                  None
                </option>
                <option value="Beginner">Beginner - Full Body Routine</option>
                <option value="Intermediate">Intermediate - Strength & Endurance</option>
                <option value="Advanced">Advanced - High Intensity & Power</option>
                <option value="Custom">Custom - Create Your Own Plan</option>
              </select>
              
              <label className="form-label fw-bold">2.Select your fitness goal</label>
              
              <select
                className="form-select"
                id="workoutPlan"
                required
                value={selectedPlan}
                onChange={handlePlanChange}
              >
                <option value="" disabled>
                  None
                </option>
                <option value="Beginner">1.Weight Gain</option>
                <option value="Intermediate">2.Weight Loss</option>
                <option value="Advanced">3.Maintain Current Weight</option>
                
              </select>
            </div>

            <button
              type="button"
              onClick={() => navigate('/generated_plan')}
              className="btn btn-primary mt-3"
              disabled={!selectedPlan}
            >
              Generate Plan
            </button>
          </form>
        </div>
      </div>
    </div>
<div>
<h1 className="text-center mt-5 HostGrotesk" style={{ color: 'cyan' }}>
 Or create your custom plan below :
</h1>
</div>
{/*
make a div with the class of sourgummy and inside it, add the following elements:

*/}
      <div className="container mt-4">
      <div className="mt-4 p-4 border rounded white-background">
        <h1 className="text-center mt-5 HostGrotesk" style={{ color: 'grey' }}>
  Create Your Custom Plan
</h1>
<p>
  
  
</p>

          <form>
            <div className="mb-3">
              <label className="form-label fw-bold Battambang">1. Target Muscle(s)</label>
              <div>
                {["Chest", "Back", "Legs", "Shoulders", "Arms", "Core"].map(
                  (muscle) => (
                    <div key={muscle} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={muscle}
                        id={muscle}
                        checked={targetMuscles.includes(muscle)}
                        onChange={handleMuscleChange}
                      />
                      <label className="form-check-label" htmlFor={muscle}>
                        {muscle}
                      </label>
                    </div>
                  )
                )}
              </div>
              <div className="mt-2">
                Selected Muscles : {targetMuscles.join(", ") || "None"}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">2. Workout type</label>
              <select className="form-select" id="workoutType" required>
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
                <option value="Flexibility">Flexibility</option>
                <option value="Endurance">Endurance</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">3. Equipments?</label>
              <select
                className="form-select"
                value={equipmentRequired}
                onChange={handleEquipmentChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="No">Give all</option>
              </select>
            </div>

            {/* Navigate to generated_plan on button click */}
            <button
              type="button"
              onClick={() => navigate('/generated_plan')}
              className="btn btn-primary"
            >
              Generate Plan
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
