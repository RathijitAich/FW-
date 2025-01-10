import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./DietPlan.css";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useState } from "react";


import PropTypes from "prop-types";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);





const DietPlan = ({ globalState, setGlobalState,user_id }) => {


  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });



  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };



  const handleSavedietPlan = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${user_id}/diet_plan?dietPlanName=${globalState.dietPlan}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(globalState.dietPlan),
        }
      );
  
      if (response.ok) {
        setSnackbar({ open: true, message: "Diet plan saved successfully!", severity: "success" });
      } else {
        throw new Error(`Failed to save Diet plan. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error saving diet plan:", error);
      setSnackbar({ open: true, message: "Failed to save diet plan.", severity: "error" });
    }
  };

  

  useEffect(() => {
    // Fetch user's diet plan data on component mount
    const fetchDietPlan = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${user_id}/diet_plan`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch diet plan data");
        }

        const data = await response.json(); // Assuming the backend returns a JSON response
        console.log("this is the fetched data", data);
        // Update globalState with the fetched data
        setGlobalState((prevState) => ({
          ...prevState,
          foodData: data,
           // Assuming dietPlanName exists in IncludesEntity
        }));
      } catch (error) {
        console.error("Error fetching diet plan:", error);
      }
    };

    fetchDietPlan();
  }, [user_id]);
  
  const foodData = globalState.foodData; // Access foodData from globalState
  
  // Ensure foodData is available and contains enough items
  const defaultFoodData = foodData?.length >= 12 ? foodData : [];

  // console.log("writing defaultFoodData", defaultFoodData);

  //extract dietplan from global state


  

  // Extract only the food part from each entry
  const foods = defaultFoodData.map((item) => item.food);

  // Split foodData into meals
  const meals = [
    { time: "Breakfast", foods: foods.slice(0, 3) },
    { time: "Lunch", foods: foods.slice(3, 6) },
    { time: "Dinner", foods: foods.slice(6, 9) },
    { time: "Snacks", foods: foods.slice(9, 12) },
  ];

  // Aggregate data for the chart
  const chartData = {
    labels: meals.map((meal) => meal.time), // Meal times as labels
    datasets: [
      {
        label: "Calories",
        data: meals.map((meal) =>
          meal.foods.reduce((sum, food) => sum + food.calorie, 0)
        ),
        backgroundColor: "#FF5733", // Orange color for Calories
        borderColor: "#FF5733",
        borderWidth: 1,
      },
      {
        label: "Protein (g)",
        data: meals.map((meal) =>
          meal.foods.reduce((sum, food) => sum + food.protein, 0)
        ),
        backgroundColor: "#4CAF50", // Green color for Protein
        borderColor: "#4CAF50",
        borderWidth: 1,
      },
      {
        label: "Carbs (g)",
        data: meals.map((meal) =>
          meal.foods.reduce((sum, food) => sum + food.carbohydrate, 0)
        ),
        backgroundColor: "#3F51B5", // Blue color for Carbs
        borderColor: "#3F51B5",
        borderWidth: 1,
      },
      {
        label: "Fat (g)",
        data: meals.map((meal) =>
          meal.foods.reduce((sum, food) => sum + food.fat, 0)
        ),
        backgroundColor: "#FFC107", // Yellow color for Fat
        borderColor: "#FFC107",
        borderWidth: 1,
      },
    ],
  };

  return (

    
    <div className="diet-plan">

      {/* Save Button */}
    {/* <div className="container mb-4">
    <button
      className="btn btn-primary mt-1"
      onClick={handleSavedietPlan}
      // disabled={!selectedPlan}
    >
      Save Diet Plan
    </button>
    </div> */}

      <h3>Diet Plan </h3>
      <div className="chart-container">
        {/* Bar chart displaying calories, protein, carbs, and fat */}
        <Bar
          data={chartData}
          options={{ responsive: true, scales: { y: { beginAtZero: true } } }}
        />
      </div>

      {/* Meal Details in Table Format */}
      <table className="meal-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Food Name</th>
            <th>Calories</th>
            <th>Protein (g)</th>
            <th>Carbohydrate (g)</th>
            <th>Fat (g)</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal, index) =>
            meal.foods.map((food, idx) => (
              <tr key={`${index}-${idx}`}>
                <td>{idx === 0 ? meal.time : ""}</td>
                <td>{food.foodName}</td>
                <td>{food.calorie}</td>
                <td>{food.protein}</td>
                <td>{food.carbohydrate}</td>
                <td>{food.fat}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

       {/* Snackbar for feedback */}
       <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

DietPlan.propTypes = {
  globalState: PropTypes.object.isRequired,
  setGlobalState: PropTypes.func.isRequired,
  user_id: PropTypes.string.isRequired,
};

export default DietPlan;
