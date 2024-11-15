import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, TextField, Button, Typography, Box, Paper } from '@mui/material';

export default function Userprofile({ isloggedin, username, password }) {
    const [userData, setUserData] = useState({
        username: '',
        height: '',
        weight: '',
        age: '',
        gender: '',
        password: ''
    });

    useEffect(() => {
        if (isloggedin) {
            // Fetch user data by username and password
            fetchUserData(username, password);
        }
    }, [isloggedin, username, password]);

    const fetchUserData = async (username, password) => {
        try {
            // Replace with your API endpoint to fetch user data
            const response = await fetch(`http://localhost:8080/api/users/${username}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log('Fetched user data:', data); // Log the fetched data
            setUserData({
                username: data.username,
                height: data.height,
                weight: data.weight,
                age: data.age,
                gender: data.gender,
                password: data.password
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const UpdateProfile = async () => {
        try {
            const updatedData = {
                height: userData.height,
                weight: userData.weight,
                age: userData.age
            };
            const response = await fetch(`http://localhost:8080/api/users/update/${username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Updated user data:', data);
                alert('Profile Updated Successfully');
            } else {
                const errorData = await response.text();
                console.error('Error updating profile:', errorData);
                alert('Error updating profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!isloggedin) {
        return (
            <Container className="container my-3">
                <Typography variant="h6" className="text-center">
                    Please login to view your profile
                </Typography>
            </Container>
        );
    }

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
                            label="Username"
                            margin="normal"
                            variant="outlined"
                            value={userData.username}
                            disabled
                        />
                        <TextField
                            fullWidth
                            label="Age"
                            margin="normal"
                            variant="outlined"
                            type="number"
                            value={userData.age}
                            onChange={(e) => setUserData({ ...userData, age: e.target.value })}
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
                            label="Height(cm)"
                            margin="normal"
                            variant="outlined"
                            type="number"
                            value={userData.height}
                            onChange={(e) => setUserData({ ...userData, height: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Weight(kg)"
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
    username: PropTypes.string,
    password: PropTypes.string,
};