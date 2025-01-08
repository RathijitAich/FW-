import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TablePagination,
} from "@mui/material";
import "./FoodTable.css";
import axios from "axios";

const FoodTable = () => {
  const [foodEntries, setFoodEntries] = useState([]); // State to hold fetched data
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0); // Tracks the current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // Number of rows per page
  const [loading, setLoading] = useState(true); // State to track loading status

  // Fetch food data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/foods"); // Update URL if needed
        setFoodEntries(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching food data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when rows per page change
  };

  // Filtered entries based on the search term
  const filteredEntries = foodEntries.filter((food) =>
    food.foodName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="container">
      <Box sx={{ my: 4 }}>
        <Box className="search-box" sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Search Food"
            variant="outlined"
            className="text-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Box>
      </Box>
      {loading ? (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Loading...
        </Typography>
      ) : (
        <TableContainer component={Paper} className="table-container">
          <Table>
            <TableHead className="table-head">
              <TableRow>
                <TableCell className="table-header-cell">Food Name</TableCell>
                <TableCell className="table-header-cell">
                  Calories per Unit
                </TableCell>
                <TableCell className="table-header-cell">Carb (g)</TableCell>
                <TableCell className="table-header-cell">Fat (g)</TableCell>
                <TableCell className="table-header-cell">Protein (g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEntries
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((food) => (
                  <TableRow key={food.id}>
                    <TableCell>{food.foodName}</TableCell>
                    <TableCell>{food.calorie}</TableCell>
                    <TableCell>{food.carbohydrate}</TableCell>
                    <TableCell>{food.fat}</TableCell>
                    <TableCell>{food.protein}</TableCell>
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
      )}
    </Container>
  );
};

export default FoodTable;
