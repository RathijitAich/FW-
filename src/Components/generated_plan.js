import React from "react";

import { useLocation } from "react-router-dom";

export const GeneratedPlan = () => {
  const location = useLocation();
  const workouts = location.state?.workouts || [];

  return (
    <div>
      
      
      <h1 className="text-center mt-5">Workouts</h1>

      <div className="container">
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
            <div className="card mb-4 shadow-sm" key={index}>
              <div className="row g-0">
                {/* Image Section */}
                <div className="col-md-4">
                  <img
                    src={`/${workout.workoutName
                      .toLowerCase()
                      .replace(/\s/g, "_")}.png`} // Convert to lowercase and replace spaces
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
                        <strong>Target Muscle:</strong> {workout.targetMuscle || "General"}
                        <br />
                        <strong>Equipment:</strong> {workout.equipmentRequired || "None"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No workouts found. Please try again.</p>
        )}
      </div>
    </div>
  );
};
export default GeneratedPlan;