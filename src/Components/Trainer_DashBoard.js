import React from "react";
import PropTypes from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import { Box } from '@mui/material';


export default function Trainer_DashBoard({ setisloggedin_trainer, setTrainer_id, setTrainer_password }) {

    // Handle Logout
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear login session data (you can adjust this based on your login mechanism)
        setisloggedin_trainer(false);
        setTrainer_id('');
        setTrainer_password('');

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
                <Box sx={{ mb: 4, mt:6, width: '100%', backgroundColor: '#d2f8f1ed', p: 2, borderRadius: 2 }}>
                    <div className="text-center mb-4">
                        <h1 className="display-4 fw-bold text-primary">Trainer Dashboard</h1>
                        <p className="lead text-muted">Manage workout plans and diet plans efficiently!</p>
                    </div>
                </Box>


                {/* Cards Layout */}
                <div className="row row-cols-1 row-cols-md-2 g-4">

                    {/* Edit Workout Plans Button */}
                    <div className="col">
                        <div className="card shadow border-0 h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold">Edit Workout Plans</h5>
                                <p className="card-text text-muted">
                                    View and modify existing workout plans for users.
                                </p>
                                <Link to="/trainer_dashboard/edit_workout_plan">
                                    <button className="btn btn-primary px-4">Edit Workout Plans</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Edit Diet Plans Button */}
                    <div className="col">
                        <div className="card shadow border-0 h-100">
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold">Edit Diet Plans</h5>
                                <p className="card-text text-muted">
                                    Modify and manage diet plans for users to meet their fitness goals.
                                </p>
                                <Link to="/trainer_dashboard/edit_diet_plans">
                                    <button className="btn btn-success px-4">Edit Diet Plans</button>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer Section
                <div className="mt-5 text-center">
                    <p className="text-muted">&copy; 2024 The Fitness Team | All Rights Reserved</p>
                </div> */}
            </div>
        </div>
    );
};



Trainer_DashBoard.propTypes = {
    setisloggedin_trainer: PropTypes.func.isRequired,
    setTrainer_id: PropTypes.func.isRequired,
    setTrainer_password: PropTypes.func.isRequired,
};


