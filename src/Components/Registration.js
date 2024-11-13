import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, MenuItem, Box, Typography, Grid, Paper } from '@mui/material';
import regimg from '../Images/register.jpg';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';

export default function Registration(props) {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    height: '',
    weight: '',
    age: '',
    gender: '',
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

  const handleSubmit = async(event) => {
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
        }, 2000); // Redirect to login page after 2 seconds
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
    <Grid container component="main" sx={{ height: '74vh', justifyContent: 'center', alignItems: 'center', mt: 16 }}>
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
      <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square sx={{ height: '74vh', width: '500px', display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{
            my: 3,
            mx: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: 0.3,
          }}
        >
          <Typography variant="h6" component="h1" gutterBottom>
            Registration
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 0.001,
              width: '100%',
            }}
          >
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Height (cm)"
              name="height"
              value={formData.height}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Weight (kg)"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              margin="dense"
            />
            <TextField
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              required
              select
              margin="dense"
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ mt: 3 }}>
              Register
            </Button>
          </Box>
        </Box>
      </Grid>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={alertMessage}
      />
    </Grid>
  );
}

Registration.propTypes = {
  // Define any prop types if needed
};