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
        foods: [
          {
            food: "Oatmeal with Almonds",
            calories: 150,
            protein: 5,
            carbs: 25,
            fat: 3,
            image: oatmeal,
          },
          {
            food: "Greek Yogurt",
            calories: 100,
            protein: 10,
            carbs: 7,
            fat: 2,
            image: oatmeal,
          },
          {
            food: "Boiled Egg",
            calories: 70,
            protein: 6,
            carbs: 1,
            fat: 5,
            image: oatmeal,
          },
        ],
      },
      {
        time: "Noon",
        foods: [
          {
            food: "Grilled Chicken Salad",
            calories: 200,
            protein: 20,
            carbs: 10,
            fat: 7,
            image: chickenSalad,
          },
          {
            food: "Quinoa",
            calories: 100,
            protein: 4,
            carbs: 18,
            fat: 2,
            image: chickenSalad,
          },
          {
            food: "Steamed Broccoli",
            calories: 50,
            protein: 3,
            carbs: 5,
            fat: 1,
            image: chickenSalad,
          },
        ],
      },
      {
        time: "Afternoon",
        foods: [
          {
            food: "Fruit Smoothie with Whey Protein",
            calories: 150,
            protein: 15,
            carbs: 25,
            fat: 2,
            image: smoothie,
          },
          {
            food: "Mixed Nuts",
            calories: 100,
            protein: 3,
            carbs: 5,
            fat: 9,
            image: smoothie,
          },
          {
            food: "Granola Bar",
            calories: 150,
            protein: 5,
            carbs: 22,
            fat: 6,
            image: smoothie,
          },
        ],
      },
      {
        time: "Night",
        foods: [
          {
            food: "Baked Salmon",
            calories: 250,
            protein: 25,
            carbs: 0,
            fat: 15,
            image: salmonQuinoa,
          },
          {
            food: "Quinoa",
            calories: 100,
            protein: 4,
            carbs: 18,
            fat: 2,
            image: salmonQuinoa,
          },
          {
            food: "Steamed Asparagus",
            calories: 50,
            protein: 2,
            carbs: 5,
            fat: 1,
            image: salmonQuinoa,
          },
        ],
      },
    ],
  };

  const data = dietPlan || defaultDietPlan; // Use the passed dietPlan or fall back to the default

  // Aggregate data for the chart
  const chartData = {
    labels: data.meals.map((meal) => meal.time), // Meal times as labels
    datasets: [
      {
        label: "Calories",
        data: data.meals.map((meal) =>
          meal.foods.reduce((sum, food) => sum + food.calories, 0)
        ),
        backgroundColor: "#FF5733", // Orange color for Calories
        borderColor: "#FF5733",
        borderWidth: 1,
      },
      {
        label: "Protein (g)",
        data: data.meals.map((meal) =>
          meal.foods.reduce((sum, food) => sum + food.protein, 0)
        ),
        backgroundColor: "#4CAF50", // Green color for Protein
        borderColor: "#4CAF50",
        borderWidth: 1,
      },
      {
        label: "Carbs (g)",
        data: data.meals.map((meal) =>
          meal.foods.reduce((sum, food) => sum + food.carbs, 0)
        ),
        backgroundColor: "#3F51B5", // Blue color for Carbs
        borderColor: "#3F51B5",
        borderWidth: 1,
      },
      {
        label: "Fat (g)",
        data: data.meals.map((meal) =>
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
          {data.meals.map((meal, index) =>
            meal.foods.map((food, idx) => (
              <tr key={`${index}-${idx}`}>
                <td>{idx === 0 ? meal.time : ""}</td>
                <td>{food.food}</td>
                <td>{food.calories}</td>
                <td>{food.protein}</td>
                <td>{food.carbs}</td>
                <td>{food.fat}</td>
                <td>
                  <img src={food.image} alt={food.food} className="meal-img" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DietPlan;
