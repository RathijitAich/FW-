import React, { useState } from 'react';
import { 
  Container, TextField, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Box, Typography, Select, MenuItem, InputLabel, FormControl, TablePagination 
} from '@mui/material';
import './FoodTable.css';

const foodEntries = [
    { name: 'Chapati (Roti)', type: 'Carb', caloriesPerUnit: 120, carb: 25, fat: 1, protein: 3 },
    { name: 'Luchi', type: 'Carb', caloriesPerUnit: 150, carb: 18, fat: 7, protein: 2 },
    { name: 'Chingri Malai Curry (Prawn Curry)', type: 'Protein', caloriesPerUnit: 350, carb: 5, fat: 25, protein: 22 },
    { name: 'Fish Curry', type: 'Protein', caloriesPerUnit: 200, carb: 2, fat: 10, protein: 20 },
    { name: 'Shutki (Dried Fish)', type: 'Protein', caloriesPerUnit: 200, carb: 0, fat: 5, protein: 30 },
    { name: 'Puffed Rice (Muri)', type: 'Carb', caloriesPerUnit: 60, carb: 13, fat: 0.2, protein: 1 },
    { name: 'Payesh (Rice Pudding)', type: 'Carb', caloriesPerUnit: 250, carb: 45, fat: 5, protein: 6 },
    { name: 'Mishti Doi (Sweet Yogurt)', type: 'Carb', caloriesPerUnit: 150, carb: 25, fat: 3, protein: 4 },
    { name: 'Singara', type: 'Carb', caloriesPerUnit: 150, carb: 15, fat: 8, protein: 3 },
    { name: 'Fuchka', type: 'Carb', caloriesPerUnit: 50, carb: 8, fat: 2, protein: 1 },
    { name: 'Egg Curry', type: 'Protein', caloriesPerUnit: 150, carb: 5, fat: 10, protein: 12 },
    { name: 'Chicken Biryani', type: 'Carb', caloriesPerUnit: 500, carb: 50, fat: 20, protein: 25 },
    { name: 'Beef Curry', type: 'Protein', caloriesPerUnit: 400, carb: 0, fat: 30, protein: 35 },
    { name: 'Paneer Butter Masala', type: 'Protein', caloriesPerUnit: 300, carb: 10, fat: 25, protein: 15 },
    { name: 'Dal (Lentils)', type: 'Carb', caloriesPerUnit: 120, carb: 20, fat: 2, protein: 8 },
    { name: 'Plain Rice', type: 'Carb', caloriesPerUnit: 200, carb: 45, fat: 0.5, protein: 4 },
    { name: 'Vegetable Curry', type: 'Carb', caloriesPerUnit: 150, carb: 25, fat: 5, protein: 5 },
    { name: 'Chicken Tikka', type: 'Protein', caloriesPerUnit: 250, carb: 2, fat: 15, protein: 30 },
    { name: 'Grilled Fish', type: 'Protein', caloriesPerUnit: 180, carb: 0, fat: 8, protein: 25 },
    { name: 'Milk', type: 'Carb', caloriesPerUnit: 100, carb: 12, fat: 3, protein: 8 },
    { name: 'Banana', type: 'Carb', caloriesPerUnit: 90, carb: 22, fat: 0.3, protein: 1 },
    { name: 'Apple', type: 'Carb', caloriesPerUnit: 80, carb: 20, fat: 0.2, protein: 0.3 },
    { name: 'Almonds', type: 'Fat', caloriesPerUnit: 160, carb: 6, fat: 14, protein: 6 },
    { name: 'Peanut Butter', type: 'Fat', caloriesPerUnit: 190, carb: 6, fat: 16, protein: 7 },
    { name: 'Avocado', type: 'Fat', caloriesPerUnit: 240, carb: 12, fat: 22, protein: 3 },
    { name: 'Salmon', type: 'Protein', caloriesPerUnit: 200, carb: 0, fat: 13, protein: 20 },
    { name: 'Cheese', type: 'Fat', caloriesPerUnit: 110, carb: 1, fat: 9, protein: 7 },
    { name: 'Butter', type: 'Fat', caloriesPerUnit: 100, carb: 0, fat: 11, protein: 0.1 },
    { name: 'Curd', type: 'Carb', caloriesPerUnit: 60, carb: 4, fat: 3, protein: 3 },
  ];
  

const FoodTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [page, setPage] = useState(0); // Tracks the current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page

  const filteredEntries = foodEntries.filter((entry) => {
    const matchesSearch = entry.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || entry.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page change
  };

  return (
    <Container className="container">
      <Box sx={{ my: 4 }}>
        <Box className="search-box" sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="Search Food"
            variant="outlined"
            className="text-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl className="filter-select" variant="outlined">
            <InputLabel>Filter by Type</InputLabel>
            <Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              label="Filter by Type"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Carb">Carb</MenuItem>
              <MenuItem value="Protein">Protein</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead className="table-head">
            <TableRow>
              <TableCell className="table-header-cell">Food Name</TableCell>
              <TableCell className="table-header-cell">Type</TableCell>
              <TableCell className="table-header-cell">Calories per Unit</TableCell>
              <TableCell className="table-header-cell">Carb (g)</TableCell>
              <TableCell className="table-header-cell">Fat (g)</TableCell>
              <TableCell className="table-header-cell">Protein (g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEntries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((entry, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell className="table-cell">{entry.name}</TableCell>
                  <TableCell className="table-cell">{entry.type}</TableCell>
                  <TableCell className="table-cell">{entry.caloriesPerUnit}</TableCell>
                  <TableCell className="table-cell">{entry.carb}</TableCell>
                  <TableCell className="table-cell">{entry.fat}</TableCell>
                  <TableCell className="table-cell">{entry.protein}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={filteredEntries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default FoodTable;
