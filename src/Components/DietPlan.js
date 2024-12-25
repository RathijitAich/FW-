import React from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "./DietPlan.css";
import oatmeal from "../Images/oatmeal.jpg";
import chickenSalad from "../Images/chicken_salad.jpg";
import smoothie from "../Images/smoothie.jpg";
import salmonQuinoa from "../Images/salmon_quinoa.jpg";

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

const DietPlan = () => {
  const location = useLocation(); // Access location to retrieve state
  const { dietPlan } = location.state || {}; // Get the dietPlan from state (or default to a generic one)

  // Default diet plan (if no state is passed)
  const defaultDietPlan = {
    name: "Diet Plan",
    meals: [
      {
        time: "Morning",
        food: "Oatmeal with Almonds",
        calories: 250,
        protein: 10,
        carbs: 45,
        fat: 6,
        image: oatmeal, // Image for Oatmeal
      },
      {
        time: "Noon",
        food: "Grilled Chicken Salad",
        calories: 350,
        protein: 30,
        carbs: 20,
        fat: 15,
        image: chickenSalad, // Image for Chicken Salad
      },
      {
        time: "Afternoon",
        food: "Fruit Smoothie with Whey Protein",
        calories: 200,
        protein: 20,
        carbs: 30,
        fat: 5,
        image: smoothie, // Image for Smoothie
      },
      {
        time: "Night",
        food: "Baked Salmon with Quinoa",
        calories: 400,
        protein: 35,
        carbs: 40,
        fat: 18,
        image: salmonQuinoa, // Image for Salmon with Quinoa
      },
    ],
  };

  const data = dietPlan || defaultDietPlan; // Use the passed dietPlan or fall back to the default

  // Prepare data for the chart (calories, protein, carbs, fat)
  const chartData = {
    labels: data.meals.map((meal) => meal.time), // Meal times as labels
    datasets: [
      {
        label: "Calories",
        data: data.meals.map((meal) => meal.calories),
        backgroundColor: "#FF5733", // Orange color for Calories
        borderColor: "#FF5733",
        borderWidth: 1,
      },
      {
        label: "Protein (g)",
        data: data.meals.map((meal) => meal.protein),
        backgroundColor: "#4CAF50", // Green color for Protein
        borderColor: "#4CAF50",
        borderWidth: 1,
      },
      {
        label: "Carbs (g)",
        data: data.meals.map((meal) => meal.carbs),
        backgroundColor: "#3F51B5", // Blue color for Carbs
        borderColor: "#3F51B5",
        borderWidth: 1,
      },
      {
        label: "Fat (g)",
        data: data.meals.map((meal) => meal.fat),
        backgroundColor: "#FFC107", // Yellow color for Fat
        borderColor: "#FFC107",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="diet-plan">
      <h3>{data.name}</h3>
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
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {data.meals.map((meal, index) => (
            <tr key={index}>
              <td>{meal.time}</td>
              <td>{meal.food}</td>
              <td>{meal.calories}</td>
              <td>{meal.protein}</td>
              <td>{meal.carbs}</td>
              <td>{meal.fat}</td>
              <td>
                <img src={meal.image} alt={meal.food} className="meal-img" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DietPlan;
