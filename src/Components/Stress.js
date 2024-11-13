import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Typography, Box, Slider, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import './Calculator.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';


function Stress(props) {
  const [stressLevel, setStressLevel] = useState(3);

  const handleSliderChange = (event, value) => {
    setStressLevel(value);
  };

  const navigator = useNavigate();

  const handleSubmit = () => {
    // Handle the submission of the stress level
    console.log('User stress level:', stressLevel);
    // Add logic to provide recommendations based on the stress level
    if(stressLevel === 1){
      alert('You are feeling very low stress. Keep up the good work!');
    }
    else if(stressLevel === 2){
      alert('You are feeling low stress. Keep up the good work!');
    }
    else{
      
        navigator('/Relax_stress');
    }
  };

  return (

    <div className="myy-3">
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
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
    </Container>
    </div>
  );
}

Stress.propTypes = {
  // Define any prop types if needed
};

export default Stress;