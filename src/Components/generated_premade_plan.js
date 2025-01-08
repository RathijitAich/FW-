// import React, { useEffect, useState } from "react";

// import { useLocation } from "react-router-dom";

// export const GeneratedPremadePlan = () => {
//   const location = useLocation();
//   const { selectedPlan } = location.state || {}; // Get workout plan name from location state
//   const [workouts, setWorkouts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredWorkouts, setFilteredWorkouts] = useState([]);

//   // Fetch workouts when the selected plan changes (this will be passed from WorkoutPlan)
//   useEffect(() => {
//     if (selectedPlan) {
//       fetchWorkouts(selectedPlan);
//     }
//   }, [selectedPlan]);

//   const fetchWorkouts = async (workoutPlanName) => {

//     console.log("workoutPlanName", workoutPlanName);//the plan that is selected
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/consists_of?workoutPlanName=${workoutPlanName}`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();

//       console.log("data", data);// the workouts that are in the plan

//       setWorkouts(data); // Set workouts data to state

//       // Initially set the filtered workouts to all fetched workouts
//       setFilteredWorkouts(data);
//     } catch (error) {
//       console.error("Error fetching workouts:", error);
//     }
//   };

//   // const handleSearchChange = (e) => {
//   //   setSearchQuery(e.target.value);
//   // };

//   // const handleSearch = () => {
//   //   const lowercasedQuery = searchQuery.toLowerCase();
//   //   const filtered = workouts.filter(
//   //     (workout) =>
//   //       workout.workoutName.toLowerCase().includes(lowercasedQuery) ||
//   //       workout.workoutDescription.toLowerCase().includes(lowercasedQuery)
//   //   );
//   //   setFilteredWorkouts(filtered);
//   // };

//   const handleSortByName = () => {
//     const sorted = [...filteredWorkouts].sort((a, b) =>
//       a.workoutName.localeCompare(b.workoutName)
//     );
//     setFilteredWorkouts(sorted);
//   };

//   return (
//     <div>

//       <h1 className="text-center mt-5" style={{ color: "cyan" }}>
//         {selectedPlan ? `Workout Plan: ${selectedPlan}` : "Premade Workout Plan"}
//       </h1>

//       {/* Search and Sort Section */}
//       <div className="container mb-4">
//         {/* <input
//           type="text"
//           placeholder="Search for a workout"
//           className="form-control"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         /> */}
//         {/* <button className="btn btn-primary mt-2" onClick={handleSearch}>
//           Search
//         </button> */}
//         <button
//           className="btn btn-secondary mt-2 ms-2"
//           onClick={handleSortByName}
//         >
//           Sort by Name
//         </button>
//       </div>

//       {/* Workouts List Section */}
//       <div className="container">
//         {filteredWorkouts.length > 0 ? (
//           filteredWorkouts.map((workout, index) => (
//             <div className="card mb-4 shadow-sm" key={index}>
//               <div className="row g-0">
//                 {/* Image Section */}
//                 <div className="col-md-4">
//                   <img
//                     src={`/${workout.workoutName
//                       .toLowerCase()
//                       .replace(/\s/g, "_")}.png`} // Generate dynamic image paths
//                     className="img-fluid rounded-start"
//                     alt={workout.workoutName}
//                     style={{ maxHeight: "150px", objectFit: "cover" }}
//                   />
//                 </div>
//                 {/* Content Section */}
//                 <div className="col-md-8">
//                   <div className="card-body">
//                     <h5 className="card-title fw-bold">{workout.workoutName}</h5>
//                     <p className="card-text">{workout.workoutDescription}</p>
//                     <div className="d-flex justify-content-between align-items-center">
//                       <span>
//                         <strong>Type:</strong> {workout.workoutType}
//                         <br />
//                         <strong>Target Muscle:</strong>{" "}
//                         {workout.targetMuscle || "General"}
//                         <br />
//                         <strong>Equipment:</strong>{" "}
//                         {workout.equipmentRequired || "None"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-center">No workouts found!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GeneratedPremadePlan;


import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Box } from '@mui/material';

export const GeneratedPremadePlan = ({ user_id }) => {
  const location = useLocation();
  const { selectedPlan } = location.state || {}; // Get workout plan name from location state
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "info" });

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

      // For each workout, fetch its detailed information
      const detailedWorkouts = await Promise.all(
        data.map(async (workout) => {
          const workoutDetail = await fetchWorkoutDetails(workout.workoutName);
          return { ...workout, ...workoutDetail }; // Merge workout details
        })
      );

      setWorkouts(detailedWorkouts); // Set workouts data to state
      setFilteredWorkouts(detailedWorkouts); // Initially set the filtered workouts to all fetched workouts
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const fetchWorkoutDetails = async (workoutName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/workouts/workout?workoutName=${workoutName}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching workout details:", error);
      return {};
    }
  };

  const handleSortByName = () => {
    const sorted = [...filteredWorkouts].sort((a, b) =>
      a.workoutName.localeCompare(b.workoutName)
    );
    setFilteredWorkouts(sorted);
  };

  const handleSaveWorkoutPlan = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${user_id}/workout_plan?workoutPlanName=${selectedPlan}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedPlan),
        }
      );

      if (response.ok) {
        setSnackbar({ open: true, message: "Workout plan saved successfully!", severity: "success" });
      } else {
        throw new Error(`Failed to save workout plan. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving workout plan:", error);
      setSnackbar({ open: true, message: "Failed to save workout plan.", severity: "error" });
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="container">


      <Box sx={{ mb: 4, mt: 6, width: '100%', backgroundColor: '#275e54c4', p: 2, borderRadius: 2 }}>
        <h2 className="text-center" style={{ color: "cyan"  }}>
          {selectedPlan ? `Workout Plan: ${selectedPlan}` : "Premade Workout Plan"}
        </h2>
      </Box>

      {/* Save Button */}
      <div className="container mb-4">
        <button
          className="btn btn-primary mt-2"
          onClick={handleSaveWorkoutPlan}
          disabled={!selectedPlan}
        >
          Save Workout Plan
        </button>
      </div>

      {/* Search and Sort Section */}
      <div className="container mb-4">
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
                  <div className="card-body" style={{ backgroundColor: "antiquewhite" }}>
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

      {/* Snackbar Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

GeneratedPremadePlan.propTypes = {
  user_id: PropTypes.string.isRequired,
};

export default GeneratedPremadePlan;


