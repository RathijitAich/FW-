import React, { useState, useRef } from 'react';
import { TextField, Button, Box, Typography, Paper, Switch, FormControlLabel, MenuItem, Grid } from '@mui/material';

export default function BMR() {
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmr, setBmr] = useState(null);
  const [useMetric, setUseMetric] = useState(true);
  const resultRef = useRef(null);

  const calculateBmr = () => {
    if ((useMetric && heightCm && weight && age && gender) || (!useMetric && heightFeet && heightInches && weight && age && gender)) {
      let heightInCm;
      let weightInKg;

      if (useMetric) {
        heightInCm = heightCm;
        weightInKg = weight;
      } else {
        heightInCm = (parseInt(heightFeet) * 30.48) + (parseInt(heightInches) * 2.54);
        weightInKg = weight * 0.453592;
      }

      let bmrValue;
      if (gender === 'male') {
        bmrValue = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age);
      } else {
        bmrValue = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
      }

      setBmr(bmrValue.toFixed(2));
      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const clearFields = () => {
    setHeightFeet('');
    setHeightInches('');
    setHeightCm('');
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
        height: '140vh',
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', mb: 4, background: 'linear-gradient(to right, rgb(20 165 166 / 92%), rgb(235 241 249 / 83%))' }}>
        <Typography variant="h5" component="p" gutterBottom sx={{ textAlign: 'center' }}>
          Basal Metabolic Rate (BMR) is the number of calories your body needs to accomplish its most basic (basal) life-sustaining functions. The formula for calculating BMR is different for men and women.
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
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Enter Your Age
            </Typography>
            <TextField
              label="Age"
              variant="standard"
              fullWidth
              margin="normal"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              InputProps={{ style: { fontSize: '1.25rem' } }}
              InputLabelProps={{ style: { fontSize: '1.25rem' } }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant="h6" component="h2" gutterBottom>
              Select Your Gender
            </Typography>
            <TextField
              label="Gender"
              variant="standard"
              fullWidth
              margin="normal"
              select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              InputProps={{ style: { fontSize: '1.25rem' } }}
              InputLabelProps={{ style: { fontSize: '1.25rem' } }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </TextField>
          </Paper>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="success"
        fullWidth
        sx={{ mt: 2, maxWidth: 600 }}
        onClick={calculateBmr}
      >
        Calculate BMR
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
      {bmr && (
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', mt: 4 }} ref={resultRef}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Your BMR: {bmr} calories/day</Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
}