// Import necessary dependencies
import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Alert, MenuItem } from "@mui/material";

function AddFoodForm() {
  const [formData, setFormData] = useState({
    foodName: "",
    calorie: "",
    protein: "",
    fat: "",
    carbohydrate: "",
    food_admin_Id: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/api/admin/add-food", formData);
      setMessage(response.data.message || "Food added successfully!");
      setFormData({
        foodName: "",
        calorie: "",
        protein: "",
        fat: "",
        carbohydrate: "",
        food_admin_Id: "",
      });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred while adding food.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const handleRemoveFood = async (foodNameToRemove) => {
    try {
      await axios.delete(`http://localhost:8080/api/admin/remove-food/${foodNameToRemove}`);
      setMessage("Food removed successfully!");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "An error occurred while removing food.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 700, margin: "20px auto", padding: 3, boxShadow: 4, borderRadius: 3, backgroundColor: "#efe1bced" }}>
      <Typography variant="h4" component="h1" gutterBottom textAlign="center">
        Add Food
      </Typography>

      <Typography variant="body1" gutterBottom textAlign="center" sx={{ mb: 2 }}>
        Add "1" before the food name if it is used for breakfast, "2" for lunch, "3" for dinner, and "4" for snacks.
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom textAlign="center">
        For example: 1Apple, 2Banana, 3Chicken, 4Bread
        </Typography>

      {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Food Name"
          name="foodName"
          value={formData.foodName}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Calorie"
          name="calorie"
          type="number"
          value={formData.calorie}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Protein (g)"
          name="protein"
          type="number"
          value={formData.protein}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Fat (g)"
          name="fat"
          type="number"
          value={formData.fat}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Carbohydrate (g)"
          name="carbohydrate"
          type="number"
          value={formData.carbohydrate}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Admin ID"
          name="food_admin_Id"
          value={formData.food_admin_Id}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Add Food
        </Button>
      </form>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom textAlign="center">
          Remove Food
        </Typography>

        <TextField
          label="Food Name"
          name="foodNameToRemove"
          placeholder="Enter the food name to remove"
          onChange={(e) => setFormData({ ...formData, foodNameToRemove: e.target.value })}
          fullWidth
          required
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => handleRemoveFood(formData.foodNameToRemove)}
        >
          Remove Food
        </Button>
      </Box>
    </Box>
  );
}

export default AddFoodForm;
