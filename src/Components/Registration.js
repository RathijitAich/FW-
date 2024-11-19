import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, MenuItem, Box, Typography, Grid, Paper } from '@mui/material';
import regimg from '../Images/register.jpg';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { FormControl, InputLabel, Select } from '@mui/material';

export default function Registration(props) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    height: '',
    weight: '',
    gender: '',
    user_id: '',
    healthCondition: '', // Use camelCase to match backend
  });
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility

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
      // Check if user_id is unique
      const checkResponse = await fetch(`http://localhost:8080/api/users/${formData.user_id}`, {
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
        // Show success message
        setAlertMessage('Registration Successful Now Redirecting...');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/Login');
        }, 1000); // Redirect to login page after 1 seconds
      } else {
        const error = await response.text();
        console.log('Registration Failed', error);
        // Show error message
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
      <Grid container component="main" sx={{ height: '80vh', justifyContent: 'center', alignItems: 'center', mt: 10 }}>
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
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square sx={{ height: '80vh', width: '500px', display: 'flex', alignItems: 'center', background: '#fffffff5' }}>
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
              <h2 className="text-center mb-4" style={{ color: 'blue', fontSize: '1.5rem' }}>Registration</h2>

              <div className="mb-3">
                <TextField
                  id="user_id"
                  name="user_id"
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
                  <InputLabel id="health-condition-label">Health Condition</InputLabel>
                  <Select
                    labelId="health-condition-label"
                    id="health_condition"
                    name="healthCondition" // Use camelCase to match backend
                    value={formData.healthCondition}
                    onChange={handleChange}
                    slotProps={{ input: { style: { fontSize: '1.25rem' } }, inputLabel: { style: { fontSize: '1.25rem' } } }}
                  >
                    <MenuItem value="diabetes">Diabetes</MenuItem>
                    <MenuItem value="heart disease">Heart Disease</MenuItem>
                    <MenuItem value="high pressure">High Pressure</MenuItem>
                    <MenuItem value="no conditions">None</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ mb: 2 }}
              >
                Register
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, p: 2, backgroundColor: '#f0f0f0', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Field Explanations:</Typography>
        <Typography variant="body1"><strong>User ID:</strong> A unique identifier for your account. It must be unique and will be used while loggin.</Typography>
        <Typography variant="body1"><strong>Username:</strong> Your display name.</Typography>
        <Typography variant="body1"><strong>Password:</strong> A secure password for your account.</Typography>
        <Typography variant="body1"><strong>Height:</strong> Your height in centimeters.</Typography>
        <Typography variant="body1"><strong>Weight:</strong> Your weight in kilograms.</Typography>
        <Typography variant="body1"><strong>Gender:</strong> Your gender.</Typography>
        <Typography variant="body1"><strong>Health Condition:</strong> Select any existing health conditions you have.</Typography>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={alertMessage}
        action={
          <Button color="inherit" size="small" onClick={handleSnackbarClose}>
            Close
          </Button>

        }
        sx={{
          '& .MuiSnackbarContent-root': {
            color: 'black', // Change this to your desired color
            backgroundColor: 'white', // Change this to your desired color
          },
        }}
      />
    </div>
  );
}