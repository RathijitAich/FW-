import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Switch, FormControlLabel } from '@mui/material';

export default function BMI() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [useMetric, setUseMetric] = useState(true);

  const calculateBmi = () => {
    if (height && weight) {
      let heightInMeters;
      let weightInKg;

      if (useMetric) {
        heightInMeters = height / 100;
        weightInKg = weight;
      } else {
        heightInMeters = height * 0.0254;
        weightInKg = weight * 0.453592;
      }

      const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
      setBmiCategory(getBmiCategory(bmiValue));
    }
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obesity';
  };

  const clearFields = () => {
    setHeight('');
    setWeight('');
    setBmi(null);
    setBmiCategory('');
  };

return (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 2,
        }}
    >
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', mb: 4, background: 'linear-gradient(to right, rgb(20 165 166 / 92%), rgb(235 241 249 / 83%))' }}>
            <Typography variant="h5" component="p" gutterBottom sx={{ textAlign: 'center' }}>
                Body Mass Index (BMI) is a simple calculation using a person's height and weight. The formula is BMI = kg/m² where kg is a person's weight in kilograms and m² is their height in meters squared. A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9. BMI applies to most adults 18-65 years.
            </Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', backgroundColor: '#f5f5f5' }}>
            <FormControlLabel
                control={<Switch checked={useMetric} onChange={() => setUseMetric(!useMetric)} />}
                label={useMetric ? 'Metric (cm, kg)' : 'US (in, lbs)'}
                sx={{ mb: 2 }}
            />
            <TextField
                label={useMetric ? 'Height (cm)' : 'Height (in)'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
            />
            <TextField
                label={useMetric ? 'Weight (kg)' : 'Weight (lbs)'}
                variant="outlined"
                fullWidth
                margin="normal"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={calculateBmi}
            >
                Calculate BMI
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={clearFields}
            >
                Clear
            </Button>
            {bmi && (
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <Typography variant="h6">Your BMI: {bmi}</Typography>
                    <Typography variant="subtitle1">Category: {bmiCategory}</Typography>
                </Box>
            )}
        </Paper>
    </Box>
);
}