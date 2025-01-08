import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import img1 from "../Images/diet1.jpg";
import img2 from "../Images/diet2.jpg";
import img3 from "../Images/diet3.jpg";
//navigate
import {useNavigate} from 'react-router-dom';

const images = [
  { src: img1, text: "Welcome to Healthy Living" },
  { src: img2, text: "Customized Nutrition Plans" },
  { src: img3, text: "Achieve Your Health Goals" },
];

const DietPlanner = ({ user_id, globalState, setGlobalState }) => {
  const navigate = useNavigate();
  const [imageIndex, setImageIndex] = useState(0);
  const [formData, setFormData] = useState({
    bmi: "",
    goal: "lose",
    dietType: "veg",
    healthConditions: [],
  });
  const [dietPlan, setDietPlan] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/${encodeURIComponent(user_id)}` 
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          if (data.height && data.weight) {
            const heightInMeters = data.height / 100;
            const bmi = (data.weight / (heightInMeters * heightInMeters)).toFixed(2);
            setFormData((prev) => ({ ...prev, bmi })); 
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user_id]);

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

      return { ...prevState, healthConditions: newHealthConditions };
    });
  };

  const generateDietPlan = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/diet-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send the form data to the backend
      });
  
      if (response.ok) {
        const data = await response.text(); // Use .text() because the backend returns a plain string
        console.log(data);
        setDietPlan(data); // Store the string response in the dietPlan state

        setGlobalState((prevState) => ({
          ...prevState,
          dietPlan: data, // Set the diet plan
        }));

        fetchFoodsByDietPlan(data); // Fetch foods included in the diet plan
      } else {
        console.error("Failed to generate diet plan");
      }
    } catch (error) {
      console.error("Error generating diet plan:", error);
    }
  };

  const fetchFoodsByDietPlan = async (dietPlanName) => {
    try {
      const response = await fetch(`http://localhost:8080/api/include?dietPlanName=${dietPlanName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const foods = await response.json();
        console.log("Foods included in the diet plan:", foods);
        // Use the fetched food data (e.g., display it in the UI)

        setGlobalState((prevState) => ({
          ...prevState,
          foodData: foods,
        }));

        //write in console the state of the global state
        console.log("writing the state",globalState);

        navigate('/diet-plan');


      } else {
        console.error("Failed to fetch foods for the diet plan");
        
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };




  return (
    <div>
      <div
        style={{
          width: "80%",
          height: "450px",
          overflow: "hidden",
          margin: "20px auto",
          position: "relative",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transition: "opacity 2s ease-in-out",
              opacity: index === imageIndex ? 1 : 0,
              zIndex: index === imageIndex ? 1 : -1,
            }}
          >
            <img
              src={image.src}
              alt="Diet-related"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "10%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
                padding: "15px 30px",
                fontSize: "28px",
                fontFamily: "Arial Black, Gadget, sans-serif",
                borderRadius: "12px",
                textAlign: "center",
                fontWeight: "900",
                letterSpacing: "1.5px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              {image.text}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#d6e5e7",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Create Your Diet Plan</h2>

        <label>
          BMI:
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleInputChange}
            placeholder="Enter your BMI"
            style={{
              width: "160%",
              padding: "8px",
              margin: "5px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          Goal:
          <select
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
            style={{
              width: "193%",
              padding: "8px",
              margin: "5px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
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
            style={{
              width: "165%",
              padding: "8px",
              margin: "5px 0",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          >
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
        </label>

        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#f4f4f4",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <p>Select Health Condition:</p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {[
              "Diabetes",
              "High Pressure",
              "Heart Problem",
              "None",
            ].map((condition) => (
              <div
                key={condition}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <label>{condition}</label>
                <input
                  type="checkbox"
                  value={condition}
                  checked={formData.healthConditions.includes(condition)}
                  onChange={handleHealthConditionChange}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={generateDietPlan}
          style={{
            backgroundColor: "#28a745",
            color: "#fff",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            padding: "8px",
            marginTop: "20px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Generate Diet Plan
        </button>
      </div>
    </div>
  );
};

DietPlanner.propTypes = {
  user_id: PropTypes.string.isRequired,
  globalState: PropTypes.object.isRequired,
  setGlobalState: PropTypes.func.isRequired,
};

export default DietPlanner;
//hellosdfdsf s