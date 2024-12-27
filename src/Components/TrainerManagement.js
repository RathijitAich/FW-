import React, { useState } from "react";

import axios from "axios";


// Set the base URL for Axios requests
axios.defaults.baseURL = "http://localhost:8080";

export const TrainerManagement = () => {
  // State for Add Trainer
  const [addTrainerData, setAddTrainerData] = useState({
    trainer_id: "",
    trainer_name: "",
    trainer_email: "",
    trainer_password: "",
    trainer_phone: "",
    trainer_admin_id: "",
  });
  const [addTrainerMessage, setAddTrainerMessage] = useState({ text: "", success: false });

  // State for Remove Trainer
  const [removeTrainerId, setRemoveTrainerId] = useState("");
  const [removeTrainerMessage, setRemoveTrainerMessage] = useState({ text: "", success: false });

  // Handle Add Trainer
  const handleAddTrainer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/admin/add-trainer", addTrainerData);
      setAddTrainerMessage({ text: `Trainer Added: ${response.data}`, success: true });
      setAddTrainerData({
        trainer_id: "",
        trainer_name: "",
        trainer_email: "",
        trainer_password: "",
        trainer_phone: "",
        trainer_admin_id: "",
      });
    } catch (error) {
      const errorMessage = error.response?.data || "Failed to add trainer. Please try again.";
      setAddTrainerMessage({ text: errorMessage, success: false });
    }
  };

  // Handle Remove Trainer
  const handleRemoveTrainer = async (e) => {
    console.log(removeTrainerId);
    e.preventDefault();
    try {
      // Encode the trainer ID to ensure special characters like # are sent properly
      const encodedTrainerId = encodeURIComponent(removeTrainerId);
      await axios.delete(`/api/admin/remove-trainer/${encodedTrainerId}`);
      setRemoveTrainerMessage({ text: `Trainer with ID ${removeTrainerId} removed.`, success: true });
      setRemoveTrainerId("");
    } catch (error) {
      const errorMessage = error.response?.data || "Failed to remove trainer. Please try again.";
      setRemoveTrainerMessage({ text: errorMessage, success: false });
    }
  };

  return (
    <div>
     

      {/* Main Section */}
      <div className="container py-5">
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold text-success">Trainer Management</h1>
          <p className="lead text-muted">Add, edit, or manage trainers' details and schedules.</p>
        </div>

        {/* Add Trainer Section */}
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title fw-bold">Add Trainer</h5>
            <form onSubmit={handleAddTrainer}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="trainer_id" className="form-label">Trainer ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="trainer_id"
                      value={addTrainerData.trainer_id}
                      onChange={(e) => setAddTrainerData({ ...addTrainerData, trainer_id: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="trainer_name" className="form-label">Trainer Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="trainer_name"
                      value={addTrainerData.trainer_name}
                      onChange={(e) => setAddTrainerData({ ...addTrainerData, trainer_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="trainer_email" className="form-label">Trainer Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="trainer_email"
                      value={addTrainerData.trainer_email}
                      onChange={(e) => setAddTrainerData({ ...addTrainerData, trainer_email: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="trainer_password" className="form-label">Trainer Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="trainer_password"
                      value={addTrainerData.trainer_password}
                      onChange={(e) => setAddTrainerData({ ...addTrainerData, trainer_password: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="trainer_phone" className="form-label">Trainer Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="trainer_phone"
                      value={addTrainerData.trainer_phone}
                      onChange={(e) => setAddTrainerData({ ...addTrainerData, trainer_phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="trainer_admin_id" className="form-label">Admin ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="trainer_admin_id"
                      value={addTrainerData.trainer_admin_id}
                      onChange={(e) => setAddTrainerData({ ...addTrainerData, trainer_admin_id: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="btn btn-success">Add Trainer</button>
            </form>
            {addTrainerMessage.text && (
              <p className={`mt-3 ${addTrainerMessage.success ? "text-success" : "text-danger"}`}>
                {addTrainerMessage.text}
              </p>
            )}
          </div>
        </div>

        {/* Remove Trainer Section */}
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-bold">Remove Trainer</h5>
            <form onSubmit={handleRemoveTrainer}>
              <div className="mb-3">
                <label htmlFor="remove_trainer_id" className="form-label">Trainer ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="remove_trainer_id"
                  value={removeTrainerId}
                  onChange={(e) => setRemoveTrainerId(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-danger">Remove Trainer</button>
            </form>
            {removeTrainerMessage.text && (
              <p className={`mt-3 ${removeTrainerMessage.success ? "text-success" : "text-danger"}`}>
                {removeTrainerMessage.text}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerManagement;


