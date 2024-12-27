import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom


export const EditWorkoutPlans = () => {
  const navigate = useNavigate(); // Correctly use navigate inside the component

  const [selectedPlan, setSelectedPlan] = useState("");  // Plan selected by the user
  const [plans, setPlans] = useState([]);  // State to hold fetched premade plans
  
  // Fetch premade plans from the backend
  const fetchPremadePlans = async () => {
    const params = new URLSearchParams();
    if (selectedPlan) params.append("plan", selectedPlan);

    try {
      const response = await fetch(`http://localhost:8080/api/consists_of?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setPlans(data); // Store the fetched plans in the state
    } catch (error) {
      console.error("Error fetching premade plans:", error);
    }
  };

  // Handle change in plan selection
  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  return (
    <div>
      
      <div className="container py-5">
        <h1 className="text-center text-primary">Edit Workout Plans</h1>

        {/* Premade Plans */}
        <div>
          <h1 className="text-center mt-5 HostGrotesk" style={{ color: "cyan" }}>
            Choose from our premade workout plans tailored just for you!
          </h1>

          <div className="container mt-4">
            <div className="p-4 border rounded" style={{ backgroundColor: "white" }}>
              <h1 className="text-center mt-5" style={{ color: "grey" }}>
                Select Your Premade Plan
              </h1>
              <form>
                {/* Premade Plan Selection */}
                <label className="form-label fw-bold">
                  1. Select your premade plan
                </label>
                <select
                  className="form-select"
                  value={selectedPlan}
                  onChange={handlePlanChange}
                >
                  <option value="" disabled>
                    None
                  </option>
                  <option value="Advanced_High-Intensity_Muscle_gain">
                    Advanced - High Intensity & Muscle Gain
                  </option>
                  <option value="Advanced_High-Intensity_Muscle_loss">
                    Advanced - High Intensity & Muscle Loss
                  </option>
                  <option value="Advanced_High-Intensity_Muscle_Maintain">
                    Advanced - High Intensity & Muscle Maintain
                  </option>
                  <option value="Beginner-FullBody-Maintain_Weight">
                    Beginner - Full Body & Maintain Weight
                  </option>
                  <option value="Beginner-FullBody-Weight_gain">
                    Beginner - Full Body & Weight Gain
                  </option>
                  <option value="Beginner-FullBody-Weight_Looss">
                    Beginner - Full Body & Weight Loss
                  </option>
                  <option value="Intermediate-Strength-Muscle_gain">
                    Intermediate - Strength & Muscle Gain
                  </option>
                  <option value="Intermediate-Strength-Muscle_maintain">
                    Intermediate - Strength & Muscle Maintain
                  </option>
                  <option value="Intermediate-Strength-WeightLoss">
                    Intermediate - Strength & Weight Loss
                  </option>
                </select>

                {/* Button to generate plan */}
                <button
                  type="button"
                  onClick={() => {
                    fetchPremadePlans(); // Trigger the fetch when user selects an option
                    // Navigate and pass the selected plan
                    navigate("/add_remove_workout_trainer", {
                      state: { selectedPlan },
                    });
                  }}
                  className="btn btn-primary mt-3"
                  disabled={!selectedPlan} // Disable the button if no plan is selected
                >
                  Generate Plan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditWorkoutPlans;
