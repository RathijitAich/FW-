import React, { useState, useRef } from 'react';
import { TextField, Button, Box, Typography, Paper, Switch, FormControlLabel, CircularProgress, Grid } from '@mui/material';
import './Calculator.css'; // Import the CSS file

export default function BMI() {
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [useMetric, setUseMetric] = useState(true);
  const resultRef = useRef(null);

  const calculateBmi = () => {
    if ((useMetric && heightCm && weight) || (!useMetric && heightFeet && heightInches && weight)) {
      let heightInMeters;
      let weightInKg;

      if (useMetric) {
        heightInMeters = heightCm / 100;
        weightInKg = weight;
      } else {
        heightInMeters = ((parseInt(heightFeet) * 12) + parseInt(heightInches)) * 0.0254;
        weightInKg = weight * 0.453592;
      }

      const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      setBmiCategory(getBmiCategory(bmiValue));
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obesity';
  };

  const clearFields = () => {
    setHeightFeet('');
    setHeightInches('');
    setHeightCm('');
    setWeight('');
    setBmi(null);
    setBmiCategory('');
  };

  const getBmiColor = (bmi) => {
    if (bmi < 18.5) return 'blue';
    if (bmi >= 18.5 && bmi < 24.9) return 'green';
    if (bmi >= 25 && bmi < 29.9) return 'orange';
    return 'red';
  };

  return (

    <div className="my-3">
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        mt: 9,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', mb: 4,  background: 'linear-gradient(to right, rgb(20 165 166 / 92%), rgb(235 241 249 / 83%))' }}>
        <Typography variant="h5" component="p" gutterBottom sx={{ textAlign: 'center' }}>
          Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared. A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9. BMI applies to most adults 18-65 years.
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', mb: 4 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Select Unit System
        </Typography>
        <FormControlLabel
          control={<Switch checked={useMetric} onChange={() => setUseMetric(!useMetric)} />}
          label={useMetric ? 'Metric (cm, kg)' : 'US (ft, in, lbs)'}
          sx={{ mb: 2 }}
        />
      </Paper>
      <Grid container spacing={2} sx={{ maxWidth: 600, width: '100%' }}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Enter Your Height
            </Typography>
            {useMetric ? (
              <TextField
                label="Height (cm)"
                variant="standard"
                fullWidth
                margin="normal"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                InputProps={{ style: { fontSize: '1.25rem' } }}
                InputLabelProps={{ style: { fontSize: '1.25rem' } }}
              />
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Height (ft)"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={heightFeet}
                  onChange={(e) => setHeightFeet(e.target.value)}
                  InputProps={{ style: { fontSize: '1.25rem' } }}
                  InputLabelProps={{ style: { fontSize: '1.25rem' } }}
                />
                <TextField
                  label="Height (in)"
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={heightInches}
                  onChange={(e) => setHeightInches(e.target.value)}
                  InputProps={{ style: { fontSize: '1.25rem' } }}
                  InputLabelProps={{ style: { fontSize: '1.25rem' } }}
                />
              </Box>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Enter Your Weight
            </Typography>
            <TextField
              label={useMetric ? 'Weight (kg)' : 'Weight (lbs)'}
              variant="standard"
              fullWidth
              margin="normal"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              InputProps={{ style: { fontSize: '1.25rem' } }}
              InputLabelProps={{ style: { fontSize: '1.25rem' } }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 2, maxWidth: 600 }}
        onClick={calculateBmi}
      >
        Calculate BMI
      </Button>
      <Button
        variant="contained"
        color="error"
        fullWidth
        sx={{ mt: 2, maxWidth: 600 }}
        onClick={clearFields}
      >
        Clear
      </Button>
      {bmi && (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', mt: 4 }} ref={resultRef}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Your BMI: {bmi}</Typography>
            <Typography variant="subtitle1">Category: {bmiCategory}</Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex', mt: 2 }}>
              <CircularProgress
                variant="determinate"
                value={(bmi / 50) * 100}
                size={100}
                thickness={4}
                sx={{ color: getBmiColor(bmi) }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="caption" component="div" color="textSecondary">
                  {bmi}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  </div>
  );
}