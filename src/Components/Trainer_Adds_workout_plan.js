import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddWorkoutPlanForm = () => {
  const [workoutPlanName, setWorkoutPlanName] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null); // State to track success or error

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workoutPlanDto = {
      workoutPlanName: workoutPlanName,
      WorkoutPlanTrainerId: trainerId,
    };
    console.log(workoutPlanDto);

    try {
      const response = await axios.post("/api/trainer/add-workout-plan", workoutPlanDto);
      setMessage(response.data);
      setIsSuccess(true); // Mark as success
    } catch (error) {
      setMessage(
        error.response
          ? error.response.data
          : "An error occurred while adding the workout plan."
      );
      setIsSuccess(false); // Mark as error
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        mt: 4,
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#f0f8ff",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Add Workout Plan
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: "#555" }}>
              Fill in the details to add a new diet plan. Go to the <strong>Edit Workout Plan</strong> section to modify existing plans.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Workout Plan Name"
            value={workoutPlanName}
            onChange={(e) => setWorkoutPlanName(e.target.value)}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Trainer ID"
            value={trainerId}
            onChange={(e) => setTrainerId(e.target.value)}
            required
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Add Workout Plan
        </Button>
      </form>
      {message && (
        <Typography
          variant="body1"
          sx={{ mt: 2, color: isSuccess ? "green" : "red" }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AddWorkoutPlanForm;
