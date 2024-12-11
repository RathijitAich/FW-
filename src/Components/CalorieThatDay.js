import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, TextField, Box, InputAdornment } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/system';
import { Search } from '@mui/icons-material';

const foodEntries = [
  // Bangladeshi Staple Foods
  { name: 'Rice', type: 'Carb', unit: 'cup', caloriesPerUnit: 206, protein: 4.3, fat: 0.4, carb: 45 },
  { name: 'Lentils (Dal)', type: 'Protein', unit: 'cup', caloriesPerUnit: 230, protein: 18, fat: 0.8, carb: 40 },
  { name: 'Hilsa Fish (Ilish)', type: 'Protein', unit: 'piece', caloriesPerUnit: 280, protein: 25, fat: 20, carb: 0 },
  { name: 'Rui Fish (Rohu)', type: 'Protein', unit: 'piece', caloriesPerUnit: 180, protein: 20, fat: 8, carb: 0 },
  { name: 'Beef Curry', type: 'Protein', unit: 'cup', caloriesPerUnit: 350, protein: 30, fat: 25, carb: 5 },
  { name: 'Chicken Curry', type: 'Protein', unit: 'cup', caloriesPerUnit: 300, protein: 25, fat: 15, carb: 8 },
  { name: 'Mutton Curry', type: 'Protein', unit: 'cup', caloriesPerUnit: 420, protein: 28, fat: 30, carb: 6 },
  { name: 'Vegetable Curry', type: 'Carb', unit: 'cup', caloriesPerUnit: 150, protein: 3, fat: 7, carb: 18 },
  { name: 'Khichuri', type: 'Carb', unit: 'cup', caloriesPerUnit: 250, protein: 7, fat: 8, carb: 35 },
  { name: 'Paratha', type: 'Carb', unit: 'piece', caloriesPerUnit: 250, protein: 4, fat: 13, carb: 27 },
  { name: 'Chapati (Roti)', type: 'Carb', unit: 'piece', caloriesPerUnit: 120, protein: 3, fat: 1, carb: 25 },
  { name: 'Luchi', type: 'Carb', unit: 'piece', caloriesPerUnit: 150, protein: 2, fat: 7, carb: 18 },
  { name: 'Chingri Malai Curry (Prawn Curry)', type: 'Protein', unit: 'cup', caloriesPerUnit: 350, protein: 22, fat: 25, carb: 5 },
  { name: 'Fish Curry', type: 'Protein', unit: 'cup', caloriesPerUnit: 200, protein: 20, fat: 10, carb: 2 },
  { name: 'Shutki (Dried Fish)', type: 'Protein', unit: 'piece', caloriesPerUnit: 200, protein: 30, fat: 5, carb: 0 },
  { name: 'Puffed Rice (Muri)', type: 'Carb', unit: 'cup', caloriesPerUnit: 60, protein: 1, fat: 0.2, carb: 13 },
  { name: 'Payesh (Rice Pudding)', type: 'Carb', unit: 'cup', caloriesPerUnit: 250, protein: 6, fat: 5, carb: 45 },
  { name: 'Mishti Doi (Sweet Yogurt)', type: 'Carb', unit: 'cup', caloriesPerUnit: 150, protein: 4, fat: 3, carb: 25 },
  { name: 'Singara', type: 'Carb', unit: 'piece', caloriesPerUnit: 150, protein: 3, fat: 8, carb: 15 },
  { name: 'Fuchka', type: 'Carb', unit: 'piece', caloriesPerUnit: 50, protein: 1, fat: 2, carb: 8 },
];

const StyledTableCell = styled(TableCell)({
  backgroundColor: 'black', // Table cell color
  color: 'white', // Text color
  fontWeight: 'bold',
});

export default function FoodTable() {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCheckboxChange = (event, food) => {
    if (event.target.checked) {
      setSelectedFoods([...selectedFoods, { ...food, amount: 1 }]);
    } else {
      setSelectedFoods(selectedFoods.filter(item => item.name !== food.name));
    }
  };

  const handleAmountChange = (event, food) => {
    const newAmount = event.target.value;
    setSelectedFoods(selectedFoods.map(item => item.name === food.name ? { ...item, amount: newAmount } : item));
  };

  const calculateTotalCalories = () => {
    return selectedFoods.reduce((total, food) => total + (food.caloriesPerUnit * food.amount), 0);
  };

  const filteredFoods = foodEntries.filter(food =>
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateNutrientsByType = () => {
    const nutrientsByType = { Protein: 0, Carb: 0, Fat: 0 };
    selectedFoods.forEach(food => {
      nutrientsByType.Protein += food.protein * food.amount;
      nutrientsByType.Carb += food.carb * food.amount;
      nutrientsByType.Fat += food.fat * food.amount;
    });
    return [
      { type: 'Protein', Protein: nutrientsByType.Protein, fill: 'rgb(122, 171, 139)' },
      { type: 'Carb', Carb: nutrientsByType.Carb, fill: 'rgb(255, 165, 0)' },
      { type: 'Fat', Fat: nutrientsByType.Fat, fill: 'rgb(255, 99, 71)' },
    ];
  };

  return (
    <div className="my-3">
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <div className="row">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' }, // Stacks in column for small screens
              gap: 2,
              p: 2,
            }}
          >
            {/* First Column */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column', // Ensures two rows
                gap: 19,
              }}
            >
              {/* First Row in Column */}
              <Box
                sx={{
                  p: 2,
                  backgroundColor: '#fdfffdab',
                  borderRadius: 5,
                }}
              >
                <TextField
                  variant="standard"
                  fullWidth
                  margin="normal"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ backgroundColor: 'white' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Second Row in Column */}
              <Box
                sx={{
                  p: 2,
                  backgroundColor: '#fefefed9',
                  borderRadius: 5,
                }}
              >
                <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                  Total Calories: {calculateTotalCalories()}
                </Typography>
              </Box>
            </Box>

            {/* Second Column */}
            <Box
              sx={{
                flex: 2, // Chart column takes more space
                p: 2,
                backgroundColor: 'white',
                borderRadius: 3,
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={calculateNutrientsByType()} barCategoryGap="100%" barGap={0}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Protein" fill="rgb(122, 171, 139)" barSize={40} />
                  <Bar dataKey="Carb" fill="rgb(255, 165, 0)" barSize={40} />
                  <Bar dataKey="Fat" fill="rgb(255, 99, 71)" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </div>

        <TableContainer component={Paper} sx={{ backgroundColor: '#f6f7f6f2' }}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Select</StyledTableCell>
                <StyledTableCell>Food Name</StyledTableCell>
                <StyledTableCell>Food Type</StyledTableCell>
                <StyledTableCell>Amount</StyledTableCell>
                <StyledTableCell>Standard Unit</StyledTableCell>
                <StyledTableCell>Calories per Unit</StyledTableCell>
                <StyledTableCell>Total Calories</StyledTableCell>
                <StyledTableCell>Protein (g)</StyledTableCell>
                <StyledTableCell>Carb (g)</StyledTableCell>
                <StyledTableCell>Fat (g)</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredFoods.map((food, index) => {
                const selectedFood = selectedFoods.find(item => item.name === food.name);
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox
                        checked={!!selectedFood}
                        onChange={(event) => handleCheckboxChange(event, food)}
                      />
                    </TableCell>
                    <TableCell>{food.name}</TableCell>
                    <TableCell>{food.type}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={selectedFood?.amount || 1}
                        onChange={(event) => handleAmountChange(event, food)}
                        disabled={!selectedFood}
                        inputProps={{ min: 1 }}
                        sx={{ width: '80px' }}
                      />
                    </TableCell>
                    <TableCell>{food.unit}</TableCell>
                    <TableCell>{food.caloriesPerUnit}</TableCell>
                    <TableCell>
                      {selectedFood
                        ? selectedFood.caloriesPerUnit * selectedFood.amount
                        : food.caloriesPerUnit}
                    </TableCell>
                    <TableCell>
                      {selectedFood
                        ? (food.protein * selectedFood.amount).toFixed(2)
                        : food.protein}
                    </TableCell>
                    <TableCell>
                      {selectedFood
                        ? (food.carb * selectedFood.amount).toFixed(2)
                        : food.carb}
                    </TableCell>
                    <TableCell>
                      {selectedFood
                        ? (food.fat * selectedFood.amount).toFixed(2)
                        : food.fat}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}