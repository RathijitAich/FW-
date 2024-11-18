import React, { useState, useEffect } from 'react';
import { Container, Paper, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Userprofile({ isloggedin, user_id, username, password }) {
    const navigate = useNavigate();

  


    
        const [userData, setUserData] = useState({
            user_id: '',
            username: '',
            gender: '',
            healthCondition: '',
            height: '',
            weight: '',
            password: '',
        });



        useEffect(() => {

            if (!isloggedin) {
                navigate('/Login');
            }

            else{

            // Fetch user data from the backend
            try {
                fetch(`http://localhost:8080/api/users/${user_id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setUserData({
                            user_id: data.user_id,
                            username: data.username,
                            gender: data.gender,
                            healthCondition: data.healthCondition,
                            height: data.height,
                            weight: data.weight,
                            password: data.password,
                        });
                    })
                    .catch((error) => {
                        console.log("Error:", error);
                    });
            } catch (error) {
                console.log("Error:", error);
            }
        }

        }, [isloggedin, user_id, navigate]);
    

        const UpdateProfile = () => {
            // Handle profile update logic here
            try {
                fetch(`http://localhost:8080/api/users/${user_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Profile updated:', data);
                        // Optionally, you can update the state with the new data
                        setUserData(data);
                    })
                    .catch((error) => {
                        console.log("Error:", error);
                    });
            } catch (error) {
                console.log("Error:", error);
            }
        };

        return (


            <div className="my-3">
                <Container maxWidth="sm" sx={{ mt: 5 }}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <Box component="form" noValidate autoComplete="off">
                            <Typography variant="h4" gutterBottom>
                                User Profile
                            </Typography>
                            <TextField
                                fullWidth
                                label="User ID"
                                margin="normal"
                                variant="outlined"
                                value={userData.user_id}
                                disabled
                            />
                            <TextField
                                fullWidth
                                label="Username"
                                margin="normal"
                                variant="outlined"
                                value={userData.username}
                                onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                label="Gender"
                                margin="normal"
                                variant="outlined"
                                value={userData.gender}
                                disabled
                            />
                            <TextField
                                fullWidth
                                label="Health Condition"
                                margin="normal"
                                variant="outlined"
                                value={userData.healthCondition}
                                onChange={(e) => setUserData({ ...userData, healthCondition: e.target.value })}
                                select
                                SelectProps={{
                                    native: true,
                                }}
                            >
                                <option value="none">No Conditions</option>
                                <option value="diabetes">Diabetes</option>
                                <option value="heart disease">Heart Disease</option>
                                <option value="high pressure">High Pressure</option>
                            </TextField>
                            <TextField
                                fullWidth
                                label="Height (cm)"
                                margin="normal"
                                variant="outlined"
                                type="number"
                                value={userData.height}
                                onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                label="Weight (kg)"
                                margin="normal"
                                variant="outlined"
                                type="number"
                                value={userData.weight}
                                onChange={(e) => setUserData({ ...userData, weight: e.target.value })}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                margin="normal"
                                variant="outlined"
                                type="password"
                                value={userData.password}
                                disabled
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={UpdateProfile}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </div>
        );
    }


Userprofile.propTypes = {
    isloggedin: PropTypes.bool,
    user_id: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
};