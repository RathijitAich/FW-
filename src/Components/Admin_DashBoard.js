import React from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { Box } from '@mui/material';

export default function Admin_DashBoard({ setisloggedin_admin, setAdmin_id, setAdmin_password }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear login session data (you can adjust this based on your login mechanism)
    setisloggedin_admin(false);
    setAdmin_id('');
    setAdmin_password('');

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
        <Box sx={{ mb: 4, mt: 6, width: '100%', backgroundColor: '#d2f8f1ed', p: 2, borderRadius: 2 }}>
          <div className="text-center mb-4">
          <h1 className="display-4 fw-bold text-primary">Admin Dashboard</h1>
          <p className="lead text-muted">Manage workouts, trainers, and nutrition efficiently!</p>
          </div>
        </Box>

        {/* Cards Layout */}
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 g-4">

          {/* Trainer Management Button */}
          <div className="col">
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <h5 className="card-title fw-bold">Trainer Management</h5>
                <p className="card-text text-muted">
                  Add, edit, or manage trainers' details and schedules.
                </p>
                <Link to="/trainer_management">
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

       
      </div>
    </div>
  );
}

Admin_DashBoard.propTypes = {
  setisloggedin_admin: PropTypes.func.isRequired,
  setAdmin_id: PropTypes.func.isRequired,
  setAdmin_password: PropTypes.func.isRequired,
};
