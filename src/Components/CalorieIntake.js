import React, { useState, useRef } from 'react';
import { TextField, Button, Box, Typography, Paper, Switch, FormControlLabel, MenuItem, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function CalorieIntake() {
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [calories, setCalories] = useState(null);
  const [useMetric, setUseMetric] = useState(true);
  const resultRef = useRef(null);

  const calculateCalories = () => {
    if ((useMetric && heightCm && weight && age && gender && activityLevel) || (!useMetric && heightFeet && heightInches && weight && age && gender && activityLevel)) {
      let heightInCm;
      let weightInKg;

      if (useMetric) {
        heightInCm = heightCm;
        weightInKg = weight;
      } else {
        heightInCm = (parseInt(heightFeet) * 30.48) + (parseInt(heightInches) * 2.54);
        weightInKg = weight * 0.453592;
      }

      let bmr;
      if (gender === 'male') {
        bmr = 88.362 + (13.397 * weightInKg) + (4.799 * heightInCm) - (5.677 * age);
      } else {
        bmr = 447.593 + (9.247 * weightInKg) + (3.098 * heightInCm) - (4.330 * age);
      }

      let tdee;
      switch (activityLevel) {
        case 'sedentary':
          tdee = bmr * 1.2;
          break;
        case 'light':
          tdee = bmr * 1.375;
          break;
        case 'moderate':
          tdee = bmr * 1.55;
          break;
        case 'active':
          tdee = bmr * 1.725;
          break;
        case 'very active':
          tdee = bmr * 1.9;
          break;
        default:
          tdee = bmr;
      }

      setCalories(tdee);

      setTimeout(() => {
        if (resultRef.current) {
          resultRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const calculateMacros = (calories) => {
    const protein = (calories * 0.3) / 4; // 30% of calories from protein, 4 calories per gram
    const carbs = (calories * 0.5) / 4; // 50% of calories from carbs, 4 calories per gram
    const fat = (calories * 0.2) / 9; // 20% of calories from fat, 9 calories per gram
    return [
      { type: 'Protein', grams: protein },
      { type: 'Carbs', grams: carbs },
      { type: 'Fat', grams: fat }
    ];
  };

  return (
    <div className="my-2">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 5,
          padding: 2,
          borderRadius: 3,
          // Add background color
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', mb: 4, borderRadius: 3, backgroundColor: '#f6f7f6f2' }}>
          <Typography variant="h5" component="p" gutterBottom sx={{ textAlign: 'center' }}>
            Calorie Intake Calculator
          </Typography>
        </Paper>
        <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', mb: 4, borderRadius: 3, backgroundColor: '#f6f7f6f2' }}>
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
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#f6f7f6f2' }}>
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
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#f6f7f6f2' }}>
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
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#f6f7f6f2' }}>
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
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#f6f7f6f2' }}>
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
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, backgroundColor: '#f6f7f6f2' }}>
              <Typography variant="h6" component="h2" gutterBottom>
                Select Your Activity Level
              </Typography>
              <TextField
                label="Activity Level"
                variant="standard"
                fullWidth
                margin="normal"
                select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                InputProps={{ style: { fontSize: '1.25rem' } }}
                InputLabelProps={{ style: { fontSize: '1.25rem' } }}
              >
                <MenuItem value="sedentary">Sedentary (little or no exercise)</MenuItem>
                <MenuItem value="light">Light (light exercise/sports 1-3 days/week)</MenuItem>
                <MenuItem value="moderate">Moderate (moderate exercise/sports 3-5 days/week)</MenuItem>
                <MenuItem value="active">Active (hard exercise/sports 6-7 days a week)</MenuItem>
                <MenuItem value="very active">Very Active (very hard exercise/sports & physical job)</MenuItem>
              </TextField>
            </Paper>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2, maxWidth: 600 }}
          onClick={calculateCalories}
        >
          Calculate Calories
        </Button>
        <Button
          variant="contained"
          color="error"
          fullWidth
          sx={{ mt: 2, maxWidth: 600 }}
          onClick={() => {
            setHeightFeet('');
            setHeightInches('');
            setHeightCm('');
            setWeight('');
            setAge('');
            setGender('');
            setActivityLevel('');
            setCalories(null);
          }}
        >
          Clear
        </Button>
        {calories && (
          <Paper elevation={3} sx={{ padding: 4, maxWidth: 600, width: '100%', mt: 4, borderRadius: 3, backgroundColor: '#f6f7f6f2' }} ref={resultRef}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">Your Total Daily Energy Expenditure (TDEE): {calories.toFixed(2)} calories/day</Typography>
            </Box>
          </Paper>
        )}
        {calories && (
          <Box sx={{ mt: 5, width: '100%', maxWidth: 600, backgroundColor: '#f6f7f6f2', borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
              Macronutrients Needed (Balanced diet)
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={calculateMacros(calories)}>
                <CartesianGrid strokeDasharray="5 4" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="grams" fill="black" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Box>
    </div>
  );
}