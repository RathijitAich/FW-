


import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, MenuItem, Box, Typography, Grid, Paper } from '@mui/material';
import regimg from '../Images/register.jpg';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { FormControl, InputLabel, Select } from '@mui/material';

export default function Registration() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    height: '',
    weight: '',
    gender: '',
    userId: '',
    healthIssue: '',
    trainer: null,  // Store the whole trainer object
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [trainers, setTrainers] = useState([]); // State for trainer list

  // Fetch trainers list
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/trainer/all');
        if (response.ok) {
          const trainersData = await response.json();
          setTrainers(trainersData); // Assuming the backend returns an array of trainers with 'trainerName' and 'trainerId'
        } else {
          console.error('Failed to fetch trainers');
        }
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchTrainers();
  }, []); // Fetch trainers once when the component mounts

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation: Check if any field is empty
    for (const key in formData) {
      if (formData[key] === '') {
        setAlertMessage(`Please fill in the ${key} field.`);
        setOpenSnackbar(true);
        return;
      }
    }

    try {
      // Check if userId is unique
      const checkResponse = await fetch(`http://localhost:8080/api/users/exists/${formData.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (checkResponse.ok) {
        const existingUser = await checkResponse.json();
        if (existingUser) {
          setAlertMessage('User ID already exists. Please choose a different User ID.');
          setOpenSnackbar(true);
          return;
        }
      }

      // Proceed with registration
      console.log('Registration form data:', formData);
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.text();
        console.log(data);
        // Registration successful
        setAlertMessage('Registration Successful Now Redirecting...');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/Login');
        }, 1000);
      } else {
        const error = await response.text();
        setAlertMessage('Registration Failed: ' + error);
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error('Registration Failed', error);
      setAlertMessage('Registration Failed: ' + error.message);
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close Snackbar
  };

  return (
    <div className="container" style={{ marginBottom: '20px' }}>
      <Grid container component="main" sx={{ height: '90vh', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={5}
          sx={{
            backgroundImage: `url(${regimg})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square sx={{ height: '90vh', width: '500px', display: 'flex', alignItems: 'center', background: '#fffffff5' }}>
          <Box
            sx={{
              my: 3,
              mx: 1,
              ml: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <form onSubmit={handleSubmit}>
              <h2 className="text-center mb-4 mt-3" style={{ color: 'blue', fontSize: '1.5rem' }}>Registration</h2>

              {/* Other input fields */}
              <div className="mb-3">
                <TextField
                  id="userId"
                  name="userId"
                  label="User ID"
                  variant="standard"
                  fullWidth
                  onChange={handleChange}
                  slotProps={{ input: { style: { fontSize: '1.25rem' } }, inputLabel: { style: { fontSize: '1.25rem' } } }}
                />
              </div>

              <div className="mb-3">
                <TextField
                  id="username"
                  name="username"
                  label="Username"
                  variant="standard"
                  fullWidth
                  onChange={handleChange}
                  slotProps={{ input: { style: { fontSize: '1.25rem' } }, inputLabel: { style: { fontSize: '1.25rem' } } }}
                />
              </div>

              <div className="mb-3">
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="standard"
                  fullWidth
                  onChange={handleChange}
                  slotProps={{ input: { style: { fontSize: '1.25rem' } }, inputLabel: { style: { fontSize: '1.25rem' } } }}
                />
              </div>

              <div className="mb-3">
                <TextField
                  id="height"
                  name="height"
                  label="Height (cm)"
                  variant="standard"
                  fullWidth
                  onChange={handleChange}
                  slotProps={{ input: { style: { fontSize: '1.25rem' } }, inputLabel: { style: { fontSize: '1.25rem' } } }}
                />
              </div>

              <div className="mb-3">
                <TextField
                  id="weight"
                  name="weight"
                  label="Weight (kg)"
                  variant="standard"
                  fullWidth
                  onChange={handleChange}
                  slotProps={{ input: { style: { fontSize: '1.25rem' } }, inputLabel: { style: { fontSize: '1.25rem' } } }}
                />
              </div>

              <div className="mb-3">
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    slotProps={{ input: { style: { fontSize: '1.25rem' } }, inputLabel: { style: { fontSize: '1.25rem' } } }}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="mb-3">
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="health-issue-label">Health Issue</InputLabel>
                  <Select
                    labelId="health-issue-label"
                    id="health_issue"
                    name="healthIssue" // Updated name to healthIssue
                    value={formData.healthIssue}
                    onChange={handleChange}
                    slotProps={{ input: { style: { fontSize: '1.25rem' } }, inputLabel: { style: { fontSize: '1.25rem' } } }}
                  >
                    <MenuItem value="diabetes">Diabetes</MenuItem>
                    <MenuItem value="heart disease">Heart Disease</MenuItem>
                    <MenuItem value="high pressure">High Pressure</MenuItem>
                    <MenuItem value="no issues">No Issues</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="mb-3">
                <FormControl variant="standard" fullWidth>
                  <InputLabel id="trainer-label">Choose Trainer</InputLabel>
                  <Select
                    labelId="trainer-label"
                    id="trainer"
                    name="trainer"
                    value={formData.trainer ? formData.trainer.trainerId : ''} // Check if trainer is selected
                    onChange={(event) => {
                      const selectedTrainer = trainers.find(trainer => trainer.trainerId === event.target.value);
                      setFormData({
                        ...formData,
                        trainer: selectedTrainer, // Store the whole trainer object
                      });
                    }}
                    slotProps={{
                      input: { style: { fontSize: '1.25rem' } },
                      inputLabel: { style: { fontSize: '1.25rem' } },
                    }}
                  >
                    {trainers.map((trainer) => (
                      <MenuItem key={trainer.trainerId} value={trainer.trainerId}>
                        {trainer.trainerName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="mb-3 text-center">
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ fontSize: '1rem', padding: '10px' }}
                >
                  Register
                </Button>
              </div>

              {/* Snackbar for alerts */}
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={alertMessage}
              />
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}




