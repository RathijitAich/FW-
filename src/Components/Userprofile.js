import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Grid,
  Avatar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import imgg1 from '../Images/user1.jpg';

export default function UserProfile({ isloggedin, user_id }) {
  const navigate = useNavigate();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [userData, setUserData] = useState({
    user_id: '',
    username: '',
    gender: '',
    healthIssue: '',
    height: '',
    weight: '',
    password: '',
  });

  useEffect(() => {
    if (!isloggedin) {
      navigate('/Login');
    } else {
      fetch(`http://localhost:8080/api/users/${user_id}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched User Data:', data);
          setUserData({
            user_id: data.userId || '',
            username: data.username || '',
            gender: data.gender || '',
            healthIssue: data.healthIssue || '',
            height: data.height || '',
            weight: data.weight || '',
            password: data.password || '',
          });
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [isloggedin, user_id, navigate]);

  const handleUpdateProfile = () => {
    console.log('Sending updated user data:', userData);
    fetch(`http://localhost:8080/api/users/${user_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        setAlertMessage('Profile updated successfully.');
        setShowSnackbar(true);
      })
      .catch((error) => console.error('Error updating profile:', error));
  };

  const handleSnackbarClose = () => setShowSnackbar(false);

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 4 }}>
        {/* Background Image with Overlay */}
        <Box
          sx={{
            position: 'relative',
            backgroundImage: `url(${imgg1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: 250,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar
              sx={{ width: 100, height: 100, border: '3px solid white' }}
              src="https://via.placeholder.com/150"
            />
            <Typography
              variant="h5"
              sx={{ color: 'white', mt: 2, fontWeight: 'bold' }}
            >
              {userData.username || 'User Name'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ p: 4 }}>
          {/* Profile Form */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Account Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="User ID"
                  variant="outlined"
                  value={userData.user_id}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Gender"
                  variant="outlined"
                  value={userData.gender}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="health-issue-label">
                    Health Issue
                  </InputLabel>
                  <Select
                    labelId="health-issue-label"
                    value={userData.healthIssue}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        healthIssue: e.target.value,
                      })
                    }
                    label="Health Issue"
                  >
                    <MenuItem value="none">No Conditions</MenuItem>
                    <MenuItem value="diabetes">Diabetes</MenuItem>
                    <MenuItem value="heart disease">Heart Disease</MenuItem>
                    <MenuItem value="high pressure">High Pressure</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Height (cm)"
                  variant="outlined"
                  type="number"
                  value={userData.height}
                  onChange={(e) =>
                    setUserData({ ...userData, height: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  variant="outlined"
                  type="number"
                  value={userData.weight}
                  onChange={(e) =>
                    setUserData({ ...userData, weight: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={userData.password}
                  disabled
                  InputProps={{
                    endAdornment: (
                      <IconButton disabled>
                        <Edit />
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleUpdateProfile}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={alertMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
}

UserProfile.propTypes = {
  isloggedin: PropTypes.bool.isRequired,
  user_id: PropTypes.string.isRequired,
};
