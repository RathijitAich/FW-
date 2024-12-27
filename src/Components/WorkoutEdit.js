import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:8080";

export const WorkoutDashboard = () => {
    const [workoutName, setWorkoutName] = useState("");
    const [workoutType, setWorkoutType] = useState("");
    const [targetMuscle, setTargetMuscle] = useState("");
    const [equipmentRequired, setEquipmentRequired] = useState("");
    const [workoutDescription, setWorkoutDescription] = useState("");
    const [adminId, setAdminId] = useState("");

    const handleAddWorkout = async () => {
        const workoutData = {
            workoutName,
            workoutType,
            targetMuscle,
            equipmentRequired,
            workoutDescription,
            workout_admin_id: adminId
        };

        try {
            const response = await axios.post("/api/admin/add-workout", workoutData);
            alert("Workout added successfully!");
            // Clear the form fields
            setWorkoutName("");
            setWorkoutType("");
            setTargetMuscle("");
            setEquipmentRequired("");
            setWorkoutDescription("");
            setAdminId("");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred.";
            alert("Failed to add workout: " + errorMessage);
        }
    };

    const handleRemoveWorkout = async (workoutNameToRemove) => {
        try {
            await axios.delete(`/api/admin/remove-workout/${workoutNameToRemove}`);
            alert("Workout removed successfully!");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred.";
            alert("Failed to remove workout: " + errorMessage);
        }
    };

    return (
        <div>
            
            <div className="container mt-4">
                <h2>Workout Dashboard</h2>

                <div className="card p-4 mt-4">
                    <h3>Add Workout</h3>
                    <div className="mb-3">
                        <label>Workout Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={workoutName}
                            onChange={(e) => setWorkoutName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Workout Type</label>
                        <input
                            type="text"
                            className="form-control"
                            value={workoutType}
                            onChange={(e) => setWorkoutType(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Target Muscle</label>
                        <input
                            type="text"
                            className="form-control"
                            value={targetMuscle}
                            onChange={(e) => setTargetMuscle(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Equipment Required</label>
                        <input
                            type="text"
                            className="form-control"
                            value={equipmentRequired}
                            onChange={(e) => setEquipmentRequired(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Workout Description</label>
                        <textarea
                            className="form-control"
                            value={workoutDescription}
                            onChange={(e) => setWorkoutDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label>Admin ID</label>
                        <input
                            type="text"
                            className="form-control"
                            value={adminId}
                            onChange={(e) => setAdminId(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={handleAddWorkout}>Add Workout</button>
                </div>

                <div className="card p-4 mt-4">
                    <h3>Remove Workout</h3>
                    <div className="mb-3">
                        <label>Workout Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the workout name to remove"
                            onChange={(e) => setWorkoutName(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-danger" onClick={() => handleRemoveWorkout(workoutName)}>
                        Remove Workout
                    </button>
                </div>
            </div>
        </div>
    );
};
export default WorkoutDashboard;
