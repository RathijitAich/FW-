import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    Select,
    MenuItem,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    FormControl,
    InputLabel,
    Box,
} from '@mui/material';

const DietPlanEdit = () => {
    const [dietPlans, setDietPlans] = useState([]);
    const [selectedDietPlan, setSelectedDietPlan] = useState('');
    const [foods, setFoods] = useState([]);
    const [foodName, setFoodName] = useState('');

    useEffect(() => {
        // Fetch all diet plans from the backend
        const fetchDietPlans = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/diet-plan/all');
                setDietPlans(response.data);
            } catch (error) {
                console.error('Error fetching diet plans:', error);
            }
        };

        fetchDietPlans();
    }, []);

    const handleSelect = async () => {
        if (selectedDietPlan) {
            try {
                const response = await axios.get('http://localhost:8080/api/include', {
                    params: { dietPlanName: selectedDietPlan },
                });
                setFoods(response.data);
            } catch (error) {
                console.error('Error fetching foods for the selected diet plan:', error);
            }
        } else {
            alert('Please select a diet plan.');
        }
    };

    const handleAddFood = async () => {
        if (!foodName) {
            alert("Please enter a food name to add.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/trainer/add-food-to-diet-plan?dietPlanName=${encodeURIComponent(
                    selectedDietPlan
                )}&foodName=${encodeURIComponent(foodName)}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.ok) {
                alert("Food added successfully!");
                handleSelect();
                setFoodName("");
            } else {
                const error = await response.json();
                throw new Error(error.message || "Failed to add food.");
            }
        } catch (error) {
            console.error("Error adding food:", error);
            alert("Failed to add food. Please try again.");
        }
    };

    const handleRemoveFood = async () => {
        if (!foodName) {
            alert("Please enter a food name to remove.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:8080/api/trainer/remove-food-from-diet-plan?dietPlanName=${encodeURIComponent(
                    selectedDietPlan
                )}&foodName=${encodeURIComponent(foodName)}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.ok) {
                alert("Food removed successfully!");
                handleSelect();
                setFoodName("");
            } else {
                const error = await response.json();
                throw new Error(error.message || "Failed to remove food.");
            }
        } catch (error) {
            console.error("Error removing food:", error);
            alert("Failed to remove food. Please try again.");
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, backgroundColor: '#cdffd4e6', p: 3, borderRadius: 1 }}>
            <Typography variant="h4" gutterBottom>
                Diet Plan Edit
            </Typography>


            <Box mb={3}>
                {/* Instructions Section */}
                <Typography variant="h6" gutterBottom>
                    Instructions
                </Typography>
                <Typography variant="body1" paragraph>
                    - To add a food to the selected diet plan, please include a  prefix before the food name (e.g., <strong>"1Apple"</strong> or <strong>"2Chicken"</strong>) for better categorization.
                </Typography>
                <Typography variant="body1" paragraph>
                    - To remove a food, make sure to delete it by typing the <strong>exact name</strong> as displayed in the list of foods for the selected diet plan.
                </Typography>
            </Box>

            {/* Select Diet Plan */}
            <Box mb={3}>
                <FormControl fullWidth>
                    <Typography variant="h6">Select a Diet Plan:</Typography>
                    <InputLabel id="diet-plan-select-label"></InputLabel>
                    <Select
                        labelId="diet-plan-select-label"
                        value={selectedDietPlan}
                        onChange={(e) => setSelectedDietPlan(e.target.value)}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {dietPlans.map((dietPlan) => (
                            <MenuItem key={dietPlan.dietPlanName} value={dietPlan.dietPlanName}>
                                {dietPlan.dietPlanName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleSelect}
                >
                    Select
                </Button>
            </Box>

            {/* Foods List */}
            <Box mb={3}>
                <Typography variant="h6">Foods Associated with Selected Diet Plan:</Typography>
                <List>
                    {foods.map((food) => (
                        <ListItem key={food.food.foodName}>
                            <ListItemText primary={food.food.foodName} />
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Add or Remove Food */}
            <Box mb={3}>
                <Typography variant="h6">Add or Remove Food</Typography>
                <TextField
                    fullWidth
                    label="Enter Food Name"
                    variant="outlined"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Box display="flex" justifyContent="space-between">
                    <Button variant="contained" color="success" onClick={handleAddFood}>
                        Add Food
                    </Button>
                    <Button variant="contained" color="error" onClick={handleRemoveFood}>
                        Remove Food
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default DietPlanEdit;
