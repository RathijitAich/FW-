import React, { useState } from "react";

import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

import "./workout_plan.css";

export const WorkoutPlan = () => {
  const navigate = useNavigate(); // Use navigate inside the component
  const [bgColor, setBgColor] = useState("#36454F");
  const [targetMuscles, setTargetMuscles] = useState([]);
  const [equipmentRequired, setEquipmentRequired] = useState("Dumbbells");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [selectedPlan1, setSelectedPlan1] = useState("");
  const [workoutType, setWorkoutType] = useState("Strength"); // Added workoutType state
  const [plans, setPlans] = useState([]); // Added plans state
  const [workouts, setWorkouts] = useState([]); // Added workouts state

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handlePlanChange1 = (event) => {
    setSelectedPlan1(event.target.value);
  };


// Fetch premade plans from the backend
const fetchPremadePlans = async () => {
  const params = new URLSearchParams();
  if (selectedPlan) params.append("plan", selectedPlan);

  try {
    const response = await fetch(`http://localhost:8080/api/consists_of?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;  // Return the data to be used later
  } catch (error) {
    console.error("Error fetching premade plans:", error);
    throw error;
  }
};
  const handleColorChange = (event) => {
    setBgColor(event.target.value);
  };

  const handleMuscleChange = (event) => {
    const value = event.target.value;
    setTargetMuscles((prev) =>
      prev.includes(value)
        ? prev.filter((muscle) => muscle !== value)
        : [...prev, value]
    );
  };

  const handleEquipmentChange = (event) => {
    setEquipmentRequired(event.target.value);
  };

  const handleWorkoutTypeChange = (event) => {
    setWorkoutType(event.target.value);
  };

  // const fetchWorkouts = async () => {
  //   const params = new URLSearchParams();
  //   if (targetMuscles.length > 0) params.append("targetMuscles", targetMuscles.join(","));
  //   if (workoutType) params.append("workoutType", workoutType);
  //   if (equipmentRequired) params.append("equipmentRequired", equipmentRequired);

  //   try {
  //     const response = await fetch(`http://localhost:5000/api/workouts?${params.toString()}`);
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     const data = await response.json(); // Ensure the response is JSON
  //     setWorkouts(data);
  //     navigate("/generated_plan", { state: { workouts: data } });
  //   } catch (error) {
  //     console.error("Error fetching workouts:", error.message);
  //     alert("Failed to fetch workouts. Please check the server or endpoint.");
  //   }
  // };
  const fetchWorkouts = async () => {


    console.log("Target Muscles:", targetMuscles);
    console.log("Workout Type:", workoutType);
    console.log("Equipment Required:", equipmentRequired);


    const params = new URLSearchParams();
    if (targetMuscles.length > 0)
      params.append("targetMuscles", targetMuscles.join(","));
    if (workoutType) params.append("workoutType", workoutType);
    if (equipmentRequired)
      params.append("equipmentRequired", equipmentRequired);

    try {
      // Ensure the correct backend URL (make sure your backend is running)
      const response = await fetch(
        `http://localhost:8080/api/workouts?${params.toString()}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Try to parse the response as JSON
      const data = await response.json();

      console.log(data);

      // Assuming you have a state to store the fetched data
      setWorkouts(data);
      navigate("/workout_plan/generated_plan", {
        state: { workouts: data },
      });
    } catch (error) {
      console.error("Error fetching workouts:", error);
      alert("Failed to fetch workouts. Please check the server or endpoint.");
    }
  };
  // const fetchPremadePlans = async (fitnessLevel, goal) => {
  //   const params = new URLSearchParams();
  
  //   // Add parameters to URLSearchParams
  //   if (fitnessLevel) params.append("fitnessLevel", fitnessLevel);
  //   if (goal) params.append("goal", goal);
  
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/consists_of?${params.toString()}`);
      
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  
  //     const data = await response.json();
  //     return data;  // Return the data to be used later
  //   } catch (error) {
  //     console.error("Error fetching premade plans:", error);
  //     throw error;
  //   }
  // };
  
  return (
    <div style={{ backgroundColor: bgColor, minHeight: "100vh" }}>
      
      <div className="sourgummy">
        <h1 className="text-center mt-5 HostGrotesk" style={{ color: "cyan" }}>
          Welcome to the Workout Generator
        </h1>
        <p
          className="text-center mt-3 Battambang"
          style={{ color: "white", fontSize: "1.2em" }}
        >
          Our Workout Generator is designed to help you build a personalized
          fitness routine, whether you're a beginner or a seasoned athlete.
          Choose from a variety of workout types, target specific muscle groups,
          and set your fitness goals—all with just a few clicks. Let us take the
          guesswork out of planning so you can focus on what really matters:
          achieving your best self!
        </p>
      </div>

      {/* Carousel Section */}
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
          {/* Carousel Items */}
          {[
            {
              src: "/gym4.jpg",
              heading: "Personalized Workout Plans",
              text: "Unlock your full potential with workout plans designed just for you.",
            },
            {
              src: "/gym2.jpg",
              heading: "Create Your Own Custom Plan",
              text: "Design a workout plan that fits your lifestyle.",
            },
            {
              src: "/gym3.jpg",
              heading: "Detailed Workouts and Progress Tracking",
              text: "Follow clear workout instructions and track your progress.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <img
                src={item.src}
                className="d-block w-100 img-fluid"
                alt={item.heading}
                style={{ opacity: 0.5 }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{item.heading}</h5>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

       {/* Premade Plans */}
       <div>
        <h1 className="text-center mt-5 HostGrotesk" style={{ color: "cyan" }}>
          Choose from our premade workout plans tailored just for you!
        </h1>

        <div className="container mt-4">
          <div className="p-4 border rounded" style={{ backgroundColor: "white" }}>
            <h1 className="text-center mt-5" style={{ color: "grey" }}>
              Select Your Premade Plan
            </h1>
            <form>
              {/* Premade Plan Selection */}
              <label className="form-label fw-bold">
                1. Select your premade plan
              </label>
              <select
                className="form-select"
                value={selectedPlan}
                onChange={handlePlanChange}
              >
                <option value="" disabled>
                  None
                </option>
                <option value="Advanced_High-Intensity_Muscle_gain">
                  Advanced - High Intensity & Muscle Gain
                </option>
                <option value="Advanced_High-Intensity_Muscle_loss">
                  Advanced - High Intensity & Muscle Loss
                </option>
                <option value="Advanced_High-Intensity_Muscle_Maintain">
                  Advanced - High Intensity & Muscle Maintain
                </option>
                <option value="Beginner-FullBody-Maintain_Weight">
                  Beginner - Full Body & Maintain Weight
                </option>
                <option value="Beginner-FullBody-Weight_gain">
                  Beginner - Full Body & Weight Gain
                </option>
                <option value="Beginner-FullBody-Weight_Looss">
                  Beginner - Full Body & Weight Loss
                </option>
                <option value="Intermediate-Strength-Muscle_gain">
                  Intermediate - Strength & Muscle Gain
                </option>
                <option value="Intermediate-Strength-Muscle_maintain">
                  Intermediate - Strength & Muscle Maintain
                </option>
                <option value="Intermediate-Strength-WeightLoss">
                  Intermediate - Strength & Weight Loss
                </option>
              </select>

              <button
                type="button"
                onClick={() => {
                  fetchPremadePlans(); // Trigger fetch when user selects an option
                  navigate("/generated_premade_plan", {
                    state: { selectedPlan },
                  });
                }}
                className="btn btn-primary mt-3"
                disabled={!selectedPlan} // Disable button if no plan is selected
              >
                Generate Plan
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Custom Plan */}
      <div>
        <h1 className="text-center mt-5 HostGrotesk" style={{ color: "cyan" }}>
          Or create your custom plan below:
        </h1>

        <div className="container mt-4">
          <div className="mt-4 p-4 border rounded white-background">
            <h1
              className="text-center mt-5 HostGrotesk"
              style={{ color: "grey" }}
            >
              Create Your Custom Plan
            </h1>

            <form>
              {/* Target Muscles */}
              <label className="form-label fw-bold Battambang">
                1. Target Muscle(s)
              </label>
              {[
                "Shoulders",
                "Full Body",
                "Biceps",
                "Core",
                "Legs",
                "Hips",
                "Calves",
                "Chest",
                "Lower Back",
                "Abdominals",
                "Back",
                "Hamstrings",
                "Glutes",
                "Hip Flexors",
                "Neck",
                "Obliques",
                "Quadriceps",
                "Spine",
                "Triceps",
              ].map((muscle) => (
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
              ))}
              <div className="mt-2">
                Selected Muscles: {targetMuscles.join(", ") || "None"}
              </div>
              {/* Workout Type */}
              <label className="form-label fw-bold mt-3">2. Workout Type</label>
              <select
                className="form-select"
                value={workoutType}
                onChange={handleWorkoutTypeChange}
              >
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
                <option value="Flexibility">Flexibility</option>
                <option value="Endurance">Endurance</option>
              </select>

              {/* Equipment */}
              <label className="form-label fw-bold mt-3">3. Equipment?</label>
              <select
                className="form-select"
                value={equipmentRequired}
                onChange={handleEquipmentChange}
              >
                <option value="Dumbbells">Dumbbells</option>
                <option value="Ropes">Ropes</option>
                <option value="None">None</option>
                <option value="Plyo Box">Plyo Box</option>
                <option value="Barbell">Barbell</option>
                <option value="Cable Machine">Cable Machine</option>
                <option value="Pull-Up Bar">Pull-Up Bar</option>
                <option value="Kettlebell">Kettlebell</option>
                <option value="Medicine Ball">Medicine Ball</option>
                <option value="Parallel Bars">Parallel Bars</option>
                <option value="Wall">Wall</option>
              </select>

              <button
                type="button"
                onClick={fetchWorkouts}
                className="btn btn-primary mt-3"
              >
                Generate Plan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default WorkoutPlan;