import React from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";

export default function Admin_DashBoard({setisloggedin_admin}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login session data (you can adjust this based on your login mechanism)
    setisloggedin_admin(false);
    // Redirect to the homepage or login page after logout
    navigate("/Home");
  };

  return (
    <div>
      {/* Logout Button */}
      <div className="container py-3">
        <button
          className="btn btn-danger float-end"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Main Section */}
      <div className="container py-5">
        <div className="text-center mb-4">
          <h1 className="display-4 fw-bold text-primary">Admin Dashboard</h1>
          <p className="lead text-muted">Manage workouts, trainers, and nutrition efficiently!</p>
        </div>

        {/* Cards Layout */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">
          {/* Workout Plan Button */}
          <div className="col">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">Workout Plan</h5>
                <p className="card-text text-muted">
                  View and manage the existing workout plans for users.
                </p>
                <Link to="/login/workout_plan">
                  <button className="btn btn-primary px-4">Go to Workout Plan</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Trainer Management Button */}
          <div className="col">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">Trainer Management</h5>
                <p className="card-text text-muted">
                  Add, edit, or manage trainers' details and schedules.
                </p>
                <Link to="/login/trainer_management">
                  <button className="btn btn-success px-4">Go to Trainer Management</button>
                </Link>
              </div>
            </div>
          </div>

          {/* Add New Workout Button */}
          <div className="col">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">Add or remove Workout</h5>
                <p className="card-text text-muted">
                  Add a new workout routine to the library or remove existing workouts.
                </p>
                <Link to="/workout_dashboard">
                  <button className="btn btn-warning text-white px-4">Add or Remove Workout </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Add New Food Button */}
          <div className="col">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">Add New Food</h5>
                <p className="card-text text-muted">
                  Add nutritional items or food plans for users.
                </p>
                <Link to="/add_food">
                  <button className="btn btn-danger px-4">Add New Food</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-5 text-center">
          <p className="text-muted">&copy; 2024 The Fitness Team | All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

Admin_DashBoard.propTypes = {
  setisloggedin_admin: PropTypes.func.isRequired,
};
