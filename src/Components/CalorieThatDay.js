import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Typography, TextField, Box, InputAdornment } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/system';
import { Search } from '@mui/icons-material';
import './Calculator.css'; // Import the CSS file

const foodEntries = [
  // Bangladeshi Staple Foods
  { name: 'Rice', type: 'Carb', unit: 'cup', caloriesPerUnit: 206 },
  { name: 'Lentils (Dal)', type: 'Protein', unit: 'cup', caloriesPerUnit: 230 },
  { name: 'Hilsa Fish (Ilish)', type: 'Protein', unit: 'piece', caloriesPerUnit: 280 },
  { name: 'Rui Fish (Rohu)', type: 'Protein', unit: 'piece', caloriesPerUnit: 180 },
  { name: 'Beef Curry', type: 'Protein', unit: 'cup', caloriesPerUnit: 350 },
  { name: 'Chicken Curry', type: 'Protein', unit: 'cup', caloriesPerUnit: 300 },
  { name: 'Mutton Curry', type: 'Protein', unit: 'cup', caloriesPerUnit: 420 },
  { name: 'Vegetable Curry', type: 'Carb', unit: 'cup', caloriesPerUnit: 150 },
  { name: 'Khichuri', type: 'Carb', unit: 'cup', caloriesPerUnit: 250 },
  { name: 'Paratha', type: 'Carb', unit: 'piece', caloriesPerUnit: 250 },
  { name: 'Chapati (Roti)', type: 'Carb', unit: 'piece', caloriesPerUnit: 120 },
  { name: 'Luchi', type: 'Carb', unit: 'piece', caloriesPerUnit: 150 },
  { name: 'Chingri Malai Curry (Prawn Curry)', type: 'Protein', unit: 'cup', caloriesPerUnit: 350 },
  { name: 'Fish Curry', type: 'Protein', unit: 'cup', caloriesPerUnit: 200 },
  { name: 'Shutki (Dried Fish)', type: 'Protein', unit: 'piece', caloriesPerUnit: 200 },
  { name: 'Puffed Rice (Muri)', type: 'Carb', unit: 'cup', caloriesPerUnit: 60 },
  { name: 'Payesh (Rice Pudding)', type: 'Carb', unit: 'cup', caloriesPerUnit: 250 },
  { name: 'Mishti Doi (Sweet Yogurt)', type: 'Carb', unit: 'cup', caloriesPerUnit: 150 },
  { name: 'Singara', type: 'Carb', unit: 'piece', caloriesPerUnit: 150 },
  { name: 'Fuchka', type: 'Carb', unit: 'piece', caloriesPerUnit: 50 },
  { name: 'Shemai (Vermicelli)', type: 'Carb', unit: 'cup', caloriesPerUnit: 200 },
  { name: 'Chotpoti', type: 'Carb', unit: 'cup', caloriesPerUnit: 220 },
  { name: 'Tehari', type: 'Carb', unit: 'cup', caloriesPerUnit: 450 },
  { name: 'Kacchi Biryani', type: 'Carb', unit: 'cup', caloriesPerUnit: 550 },

  // Gym-Type Foods (High Protein, Low Fat)
  { name: 'Chicken Breast (Boiled)', type: 'Protein', unit: 'piece', caloriesPerUnit: 165 },
  { name: 'Salmon (Grilled)', type: 'Protein', unit: 'piece', caloriesPerUnit: 200 },
  { name: 'Egg Whites', type: 'Protein', unit: 'piece', caloriesPerUnit: 17 },
  { name: 'Whole Eggs', type: 'Protein', unit: 'piece', caloriesPerUnit: 78 },
  { name: 'Greek Yogurt (Plain)', type: 'Protein', unit: 'cup', caloriesPerUnit: 100 },
  { name: 'Cottage Cheese (Low Fat)', type: 'Protein', unit: 'cup', caloriesPerUnit: 206 },
  { name: 'Protein Shake (Whey)', type: 'Protein', unit: 'scoop', caloriesPerUnit: 120 },
  { name: 'Quinoa', type: 'Carb', unit: 'cup', caloriesPerUnit: 222 },
  { name: 'Brown Rice', type: 'Carb', unit: 'cup', caloriesPerUnit: 218 },
  { name: 'Oatmeal', type: 'Carb', unit: 'cup', caloriesPerUnit: 150 },
  { name: 'Sweet Potato', type: 'Carb', unit: 'piece', caloriesPerUnit: 112 },
  { name: 'Avocado', type: 'Fat', unit: 'piece', caloriesPerUnit: 234 },
  { name: 'Almonds', type: 'Fat', unit: 'ounce', caloriesPerUnit: 164 },
  { name: 'Walnuts', type: 'Fat', unit: 'ounce', caloriesPerUnit: 185 },
  { name: 'Peanut Butter', type: 'Fat', unit: 'tbsp', caloriesPerUnit: 94 },
  { name: 'Broccoli', type: 'Carb', unit: 'cup', caloriesPerUnit: 55 },
  { name: 'Spinach (Boiled)', type: 'Carb', unit: 'cup', caloriesPerUnit: 41 },
  { name: 'Zucchini', type: 'Carb', unit: 'cup', caloriesPerUnit: 20 },
  { name: 'Baked Potato (with Skin)', type: 'Carb', unit: 'piece', caloriesPerUnit: 161 },
  { name: 'Steamed Asparagus', type: 'Carb', unit: 'cup', caloriesPerUnit: 27 },
  { name: 'Chicken Soup (Low Fat)', type: 'Protein', unit: 'cup', caloriesPerUnit: 150 },
  { name: 'Grilled Tilapia', type: 'Protein', unit: 'piece', caloriesPerUnit: 128 },
  { name: 'Tofu (Firm)', type: 'Protein', unit: 'piece', caloriesPerUnit: 100 },

  // Snacks for Gym Diets
  { name: 'Granola Bar (Low Sugar)', type: 'Carb', unit: 'piece', caloriesPerUnit: 100 },
  { name: 'Rice Cake', type: 'Carb', unit: 'piece', caloriesPerUnit: 35 },
  { name: 'Beef Jerky', type: 'Protein', unit: 'piece', caloriesPerUnit: 80 },
  { name: 'Hummus', type: 'Fat', unit: 'tbsp', caloriesPerUnit: 25 },
  { name: 'Dark Chocolate (70%)', type: 'Fat', unit: 'piece', caloriesPerUnit: 50 },
  { name: 'Chia Seeds', type: 'Fat', unit: 'tbsp', caloriesPerUnit: 58 },
  { name: 'Flax Seeds', type: 'Fat', unit: 'tbsp', caloriesPerUnit: 37 },

  // Drinks
  { name: 'Green Tea', type: 'Carb', unit: 'cup', caloriesPerUnit: 2 },
  { name: 'Black Coffee (No Sugar)', type: 'Carb', unit: 'cup', caloriesPerUnit: 5 },
  { name: 'Milk (Low Fat)', type: 'Protein', unit: 'cup', caloriesPerUnit: 103 },
  { name: 'Smoothie (Mixed Berries)', type: 'Carb', unit: 'cup', caloriesPerUnit: 120 },
  { name: 'Coconut Water', type: 'Carb', unit: 'cup', caloriesPerUnit: 45 },
  { name: 'Protein Shake (Plant-Based)', type: 'Protein', unit: 'scoop', caloriesPerUnit: 130 },

  // Sweets for Occasional Treats
  { name: 'Banana Bread', type: 'Carb', unit: 'slice', caloriesPerUnit: 196 },
  { name: 'Apple Pie', type: 'Carb', unit: 'slice', caloriesPerUnit: 240 },
  { name: 'Honey', type: 'Carb', unit: 'tbsp', caloriesPerUnit: 64 },

  // Additional Bangladeshi Foods
  { name: 'Dal Bharta', type: 'Protein', unit: 'cup', caloriesPerUnit: 160 },
  { name: 'Aloo Bharta', type: 'Carb', unit: 'cup', caloriesPerUnit: 200 },
  { name: 'Begun Bharta', type: 'Carb', unit: 'cup', caloriesPerUnit: 90 },
  { name: 'Shorshe Ilish (Hilsa in Mustard)', type: 'Protein', unit: 'piece', caloriesPerUnit: 350 },
  { name: 'Beef Bhuna', type: 'Protein', unit: 'cup', caloriesPerUnit: 400 },
  { name: 'Chicken Rezala', type: 'Protein', unit: 'cup', caloriesPerUnit: 350 },
  { name: 'Vegetable Roll', type: 'Carb', unit: 'piece', caloriesPerUnit: 250 }
];

const StyledTableCell = styled(TableCell)({
  backgroundColor: 'black',// Table cell color
  color: 'white',// Text color
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


  const calculateCaloriesByType = () => {
    const caloriesByType = { Protein: 0, Carb: 0, Fat: 0 };
    selectedFoods.forEach(food => {
      caloriesByType[food.type] += food.caloriesPerUnit * food.amount;
    });
    return [
      { type: 'Protein', calories: caloriesByType.Protein },
      { type: 'Carb', calories: caloriesByType.Carb },
      { type: 'Fat', calories: caloriesByType.Fat }
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
                      <InputAdornment position="end">
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
                <BarChart data={calculateCaloriesByType()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="calories" fill="black" />
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