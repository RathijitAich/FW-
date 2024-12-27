import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const AddRemoveWorkoutTrainer = () => {
  const location = useLocation();
  const { selectedPlan } = location.state || {}; // Get workout plan name from location state
  const [workouts, setWorkouts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [newWorkoutName, setNewWorkoutName] = useState(""); // For adding workouts
  const [deleteWorkoutName, setDeleteWorkoutName] = useState(""); // For deleting workouts

  useEffect(() => {
    if (selectedPlan) {
      fetchWorkouts(selectedPlan);
    }
  }, [selectedPlan]);

  const fetchWorkouts = async (workoutPlanName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/trainer/consists_of?workoutPlanName=${encodeURIComponent(workoutPlanName)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Assuming data is an array of Consists_of_Entity
      const formattedData = data.map((item) => ({
        workoutName: item.workout.workoutName,
        workoutDescription: item.workout.description,
      }));

      setWorkouts(formattedData);
      setFilteredWorkouts(formattedData);
    } catch (error) {
      console.error("Error fetching workouts:", error);
      alert("Error fetching workouts. Please try again later.");
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

  const handleAddWorkout = async () => {
    if (!newWorkoutName) {
      alert("Please enter a workout name to add.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/trainer/add_workout_to_plan?workoutPlanName=${encodeURIComponent(
          selectedPlan
        )}&workoutName=${encodeURIComponent(newWorkoutName)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        fetchWorkouts(selectedPlan);
        setNewWorkoutName("");
        alert("Workout added successfully!");
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to add workout.");
      }
    } catch (error) {
      console.error("Error adding workout:", error);
      alert("Failed to add workout. Please try again.");
    }
  };

  const handleRemoveWorkout = async () => {
    if (!deleteWorkoutName) {
      alert("Please enter a workout name to delete.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/trainer/remove_workout_from_plan?workoutPlanName=${encodeURIComponent(
          selectedPlan
        )}&workoutName=${encodeURIComponent(deleteWorkoutName)}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        fetchWorkouts(selectedPlan);
        setDeleteWorkoutName("");
        alert("Workout removed successfully!");
      } else {
        const error = await response.json();
        throw new Error(error.message || "Failed to remove workout.");
      }
    } catch (error) {
      console.error("Error removing workout:", error);
      alert("Failed to remove workout. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="text-center mt-5" style={{ color: "cyan" }}>
        {selectedPlan ? `Workout Plan: ${selectedPlan}` : "Premade Workout Plan"}
      </h1>

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

      <div className="container">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout, index) => (
            <div className="card mb-4 shadow-sm" key={index}>
              <div className="row g-0">
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{workout.workoutName}</h5>
                    <p className="card-text">{workout.workoutDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No workouts found!</p>
        )}
      </div>

      <div className="container mt-4">
        <h3 className="text-center mb-3">Modify Workouts</h3>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Enter workout name to add"
            className="form-control"
            value={newWorkoutName}
            onChange={(e) => setNewWorkoutName(e.target.value)}
          />
          <button className="btn btn-success mt-2" onClick={handleAddWorkout}>
            Add Workout
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Enter workout name to delete"
            className="form-control"
            value={deleteWorkoutName}
            onChange={(e) => setDeleteWorkoutName(e.target.value)}
          />
          <button className="btn btn-danger mt-2" onClick={handleRemoveWorkout}>
            Remove Workout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddRemoveWorkoutTrainer;
