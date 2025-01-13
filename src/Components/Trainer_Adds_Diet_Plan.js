import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";

const AddDietPlanForm = () => {
  const [dietPlanName, setDietPlanName] = useState("");
  const [trainerId, setTrainerId] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null); // State to track success or error

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dietPlanDto = {
      dietPlanName: dietPlanName,
      dietPlanTrainerId: trainerId,
    };
    console.log(dietPlanDto);

    try {
      const response = await axios.post("/api/trainer/add-diet-plan", dietPlanDto);
      setMessage(response.data);
      setIsSuccess(true); // Mark as success
    } catch (error) {
      setMessage(
        error.response
          ? error.response.data
          : "An error occurred while adding the diet plan."
      );
      setIsSuccess(false); // Mark as error
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "0 auto",
        mt: 4,
        p: 4,
        backgroundColor: "#f0f8ff",
        borderRadius: 3,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom color="primary">
        Add Diet Plan
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: "#555" }}>
        Fill in the details to add a new diet plan. Go to the <strong>Edit Diet Plan</strong> section to modify existing plans.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Diet Plan Name"
            value={dietPlanName}
            onChange={(e) => setDietPlanName(e.target.value)}
            required
            variant="outlined"
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Trainer ID"
            value={trainerId}
            onChange={(e) => setTrainerId(e.target.value)}
            required
            variant="outlined"
          />
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.5, fontSize: "1rem" }}
        >
          Add Diet Plan
        </Button>
      </form>
      {message && (
        <Typography
          variant="body1"
          sx={{ mt: 3, color: isSuccess ? "green" : "red", fontWeight: "bold" }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default AddDietPlanForm;
