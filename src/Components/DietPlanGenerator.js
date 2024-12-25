
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./DietPlanGenerator.css";
import img1 from "../Images/diet1.jpg";
import img2 from "../Images/diet2.jpg";
import img3 from "../Images/diet3.jpg";
const images = [
  {
    src: img1,
    text: "Welcome to Healthy Living",
  },
  {
    src: img2,
    text: "Customized Nutrition Plans",
  },
  {
    src: img3,
    text: "Achieve Your Health Goals",
  },
];

const DietPlanner = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    bmi: "",
    goal: "lose",
    dietType: "veg",
    healthConditions: [],
  });

  const defaultDietPlan = {
    name: "Generic Diet Plan",
    meals: [
      {
        time: "Morning",
        food: "Oatmeal with Almonds",
        calories: 250,
        protein: 10,
        carbs: 45,
        fat: 6,
      },
      {
        time: "Noon",
        food: "Grilled Chicken Salad",
        calories: 350,
        protein: 30,
        carbs: 20,
        fat: 15,
      },
      {
        time: "Afternoon",
        food: "Fruit Smoothie with Whey Protein",
        calories: 200,
        protein: 20,
        carbs: 30,
        fat: 5,
      },
      {
        time: "Night",
        food: "Baked Salmon with Quinoa",
        calories: 400,
        protein: 35,
        carbs: 40,
        fat: 18,
      },
    ],
  };

  const [dietPlan, setDietPlan] = useState(defaultDietPlan);

  const generateDietPlan = () => {
    setDietPlan(defaultDietPlan);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleHealthConditionChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const newHealthConditions = checked
        ? [...prevState.healthConditions, value]
        : prevState.healthConditions.filter((condition) => condition !== value);

      return {
        ...prevState,
        healthConditions: newHealthConditions,
      };
    });
  };

  return (
    <div >
      <div className="image-slider">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slider-image-container ${
              index === imageIndex ? "active" : ""
            }`}
          >
            <img src={image.src} alt="Diet-related" className="slider-image" />
            <div className="image-text">{image.text}</div>
          </div>
        ))}
      </div>

      <div className="form-container">
        <h2>Create Your Diet Plan</h2>

        <label>
          BMI:
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleInputChange}
            placeholder="Enter your BMI"
          />
        </label>

        <label>
          Goal:
          <select
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
          >
            <option value="lose">Lose Weight</option>
            <option value="gain">Gain Weight</option>
            <option value="maintain">Maintain Weight</option>
          </select>
        </label>

        <label>
          Diet Type:
          <select
            name="dietType"
            value={formData.dietType}
            onChange={handleInputChange}
          >
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </label>

        <div className="health-condition">
          <p>Select Health Condition:</p>
          <div className="checkbox-container">
            <div className="checkbox-item">
              <label>
                Diabetes
                <input
                  type="checkbox"
                  value="Diabetes"
                  checked={formData.healthConditions.includes("Diabetes")}
                  onChange={handleHealthConditionChange}
                />
              </label>
            </div>
            <div className="checkbox-item">
              <label>
                High Pressure
                <input
                  type="checkbox"
                  value="High Pressure"
                  checked={formData.healthConditions.includes("High Pressure")}
                  onChange={handleHealthConditionChange}
                />
              </label>
            </div>
            <div className="checkbox-item">
              <label>
                Heart Problem
                <input
                  type="checkbox"
                  value="Heart Problem"
                  checked={formData.healthConditions.includes("Heart Problem")}
                  onChange={handleHealthConditionChange}
                />
              </label>
            </div>
            <div className="checkbox-item">
              <label>
                No Condition
                <input
                  type="checkbox"
                  value="None"
                  checked={formData.healthConditions.includes("None")}
                  onChange={handleHealthConditionChange}
                />
              </label>
            </div>
          </div>
        </div>

        <Link
          to={{
            pathname: "/diet-plan",
            state: { dietPlan },
          }}
        >
          <button onClick={generateDietPlan}>Generate Diet Plan</button>
        </Link>
      </div>
    </div>
  );
};

export default DietPlanner;
