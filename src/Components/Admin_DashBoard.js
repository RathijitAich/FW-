import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Box, Grid, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Admin_DashBoard({ isloggedin_admin, setisloggedin_admin, admin_id, setAdmin_id, admin_password, setAdmin_password }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        if (isloggedin_admin) {
            setisloggedin_admin(false);
        }
        navigate('/Home');
    };

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Box>
            <Box sx={{ my: 4, backgroundColor: 'white', p: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Admin Dashboard
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                    Welcome, Admin
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Admin ID: {admin_id}
                </Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Update Workouts in Database
                        </Typography>
                        <Typography variant="body1">
                            Click here to update workout routines in the database.
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            Update Workouts
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Update Foods in Database
                        </Typography>
                        <Typography variant="body1">
                            Click here to update food items in the database.
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            Update Foods
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Approve a New Trainer
                        </Typography>
                        <Typography variant="body1">
                            Click here to approve new trainers.
                        </Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                            Approve Trainer
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

Admin_DashBoard.propTypes = {
    isloggedin_admin: PropTypes.bool.isRequired,
    setisloggedin_admin: PropTypes.func.isRequired,
    admin_id: PropTypes.string.isRequired,
    setAdmin_id: PropTypes.func.isRequired,
    admin_password: PropTypes.string.isRequired,
    setAdmin_password: PropTypes.func.isRequired,
};

export default Admin_DashBoard;