import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {Box} from "@mui/material";

const CurrentWorkoutPlan = ({ user_id }) => {
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        // Fetch the user details using user_id
        const userResponse = await fetch(
          `http://localhost:8080/api/users/${encodeURIComponent(user_id)}`
        );

        if (!userResponse.ok) {
          throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }

        const userData = await userResponse.json();
        console.log(userData);
        
        // Assuming the user object has a `workoutPlanName` field
        const userWorkoutPlanName = userData.workoutPlan;
        console.log("this is a", typeof userWorkoutPlanName);
        //convert the name to string
        

        if (userWorkoutPlanName) {
          // Fetch the workout plan based on the user's workout plan name
          await fetchWorkouts(userWorkoutPlanName.workoutPlanName);
        } else {
          setError("No workout plan assigned to this user.");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    const fetchWorkouts = async (workoutPlanName) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/consists_of?workoutPlanName=${workoutPlanName}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // For each workout, fetch detailed information
        const detailedWorkouts = await Promise.all(
          data.map(async (workout) => {
            const workoutDetail = await fetchWorkoutDetails(workout.workoutName);
            return { ...workout, ...workoutDetail };
          })
        );

        setWorkouts(detailedWorkouts);
        setWorkoutPlan({ workoutPlanName: workoutPlanName }); // Set the workout plan name
      } catch (error) {
        console.error("Error fetching workouts:", error);
        setError("Failed to fetch workouts.");
      }
    };

    const fetchWorkoutDetails = async (workoutName) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/workouts/workout?workoutName=${encodeURIComponent(workoutName)}`
        );

        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error("Error fetching workout details:", error);
        return {};
      }
    };

    fetchWorkoutPlan();
  }, [user_id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div>

      

      <div className="container mt-4">
      <Box sx={{ mb: 4, mt: 6, width: '100%', backgroundColor: '#275e54c4', p: 2, borderRadius: 2 }}>
      <h2 className="text-center " style={{ color: "cyan" }}>
        {workoutPlan?.workoutPlanName
          ? `Current Workout Plan: ${workoutPlan.workoutPlanName}`
          : "No Workout Plan Assigned"}
      </h2>
      </Box>

        
        {workouts.length > 0 ? (
          workouts.map((workout, index) => (
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
                  <div className="card-body" style={{ backgroundColor: "antiquewhite" }}>
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
          <p className="text-center">No workouts found!</p>
        )}
      </div>
    </div>
  );
};

CurrentWorkoutPlan.propTypes = {
  user_id: PropTypes.string.isRequired,
};

export default CurrentWorkoutPlan;
