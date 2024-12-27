import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

export const GeneratedPremadePlan = () => {
  const location = useLocation();
  const { selectedPlan } = location.state || {}; // Get workout plan name from location state
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);

  // Fetch workouts when the selected plan changes (this will be passed from WorkoutPlan)
  useEffect(() => {
    if (selectedPlan) {
      fetchWorkouts(selectedPlan);
    }
  }, [selectedPlan]);

  const fetchWorkouts = async (workoutPlanName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/consists_of?workoutPlanName=${workoutPlanName}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setWorkouts(data); // Set workouts data to state

      // Initially set the filtered workouts to all fetched workouts
      setFilteredWorkouts(data);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = workouts.filter(
      (workout) =>
        workout.workoutName.toLowerCase().includes(lowercasedQuery) ||
        workout.workoutDescription.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredWorkouts(filtered);
  };

  const handleSortByName = () => {
    const sorted = [...filteredWorkouts].sort((a, b) =>
      a.workoutName.localeCompare(b.workoutName)
    );
    setFilteredWorkouts(sorted);
  };

  return (
    <div>
     
      <h1 className="text-center mt-5" style={{ color: "cyan" }}>
        {selectedPlan ? `Workout Plan: ${selectedPlan}` : "Premade Workout Plan"}
      </h1>

      {/* Search and Sort Section */}
      <div className="container mb-4">
        <input
          type="text"
          placeholder="Search for a workout"
          className="form-control"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="btn btn-primary mt-2" onClick={handleSearch}>
          Search
        </button>
        <button
          className="btn btn-secondary mt-2 ms-2"
          onClick={handleSortByName}
        >
          Sort by Name
        </button>
      </div>

      {/* Workouts List Section */}
      <div className="container">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout, index) => (
            <div className="card mb-4 shadow-sm" key={index}>
              <div className="row g-0">
                {/* Image Section */}
                <div className="col-md-4">
                  <img
                    src={`/${workout.workoutName
                      .toLowerCase()
                      .replace(/\s/g, "_")}.png`} // Generate dynamic image paths
                    className="img-fluid rounded-start"
                    alt={workout.workoutName}
                    style={{ maxHeight: "150px", objectFit: "cover" }}
                  />
                </div>
                {/* Content Section */}
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{workout.workoutName}</h5>
                    <p className="card-text">{workout.workoutDescription}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>
                        <strong>Type:</strong> {workout.workoutType}
                        <br />
                        <strong>Target Muscle:</strong>{" "}
                        {workout.targetMuscle || "General"}
                        <br />
                        <strong>Equipment:</strong>{" "}
                        {workout.equipmentRequired || "None"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No workouts found!</p>
        )}
      </div>
    </div>
  );
};

export default GeneratedPremadePlan;
