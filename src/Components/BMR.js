import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper, Switch, FormControlLabel, MenuItem } from '@mui/material';

export default function BMR() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmr, setBmr] = useState(null);
  const [useMetric, setUseMetric] = useState(true);

  const calculateBmr = () => {
    if (height && weight && age && gender) {
      let heightInCm;
      let weightInKg;

      if (useMetric) {
        heightInCm = height;
        weightInKg = weight;
      } else {
        heightInCm = height * 2.54;
        weightInKg = weight * 0.453592;
      }

      let bmrValue;
      if (gender === 'male') {
        bmrValue = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age);
      } else {
        bmrValue = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
      }

      setBmr(bmrValue.toFixed(2));
    }
  };

  const clearFields = () => {
    setHeight('');
    setWeight('');
    setAge('');
    setGender('');
    setBmr(null);
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
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', mb: 4 , background: 'linear-gradient(to right, rgb(20 165 166 / 92%), rgb(235 241 249 / 83%))'}}>
        <Typography variant="h5" component="p" gutterBottom sx={{ textAlign: 'center' }}>
          Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions. The formula for calculating BMR is different for men and women.
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%'  }}>
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
        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          margin="normal"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <TextField
          label="Gender"
          variant="outlined"
          fullWidth
          margin="normal"
          select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={calculateBmr}
        >
          Calculate BMR
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
        {bmr && (
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6">Your BMR: {bmr} calories/day</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}