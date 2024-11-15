import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Box, Slider, Button, Paper, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Calculator.css'; // Import the CSS file

function Stress(props) {
  const [stressLevel, setStressLevel] = useState(3);
  const navigator = useNavigate();

  const handleSliderChange = (event, value) => {
    setStressLevel(value);
  };

  const handleSubmit = () => {
    // Handle the submission of the stress level
    console.log('User stress level:', stressLevel);
    // Add logic to provide recommendations based on the stress level
    if (stressLevel === 1) {
      alert('You are feeling very low stress. Keep up the good work!');
    } else if (stressLevel === 2) {
      alert('You are feeling low stress. Keep up the good work!');
    } else {
      navigator('/Relax_stress');
    }
  };

  return (
    <div className="myy-3">
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ padding: 3, background: 'linear-gradient(to right, rgb(202 165 139 / 92%), rgb(235 241 249 / 83%))' }}>
          <Typography variant="h4" gutterBottom>
            Stress Check-In
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6">On a scale of 1-5, how much stress do you feel right now?</Typography>
            <Slider
              value={stressLevel}
              onChange={handleSliderChange}
              aria-labelledby="stress-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={5}
            />
          </Box>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Paper>
        <Box sx={{ mt: 5 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Understanding Your Stress Rating
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>1:</strong> Very low stress. You are feeling calm and relaxed.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>2:</strong> Low stress. You are feeling slightly stressed but generally okay.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>3:</strong> Moderate stress. You are feeling noticeably stressed but managing it.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>4:</strong> High stress. You are feeling quite stressed and may need to take action to reduce it.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>5:</strong> Very high stress. You are feeling extremely stressed and should take immediate steps to manage it.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
}

Stress.propTypes = {
  // Define any prop types if needed
};

export default Stress;