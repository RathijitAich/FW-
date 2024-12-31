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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TablePagination,
} from "@mui/material";
import "./FoodTable.css";
import axios from "axios"; // For making HTTP requests

const FoodTable = () => {
  const [foodEntries, setFoodEntries] = useState([]); // State to hold fetched data
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
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

  const filteredEntries = foodEntries.filter((entry) => {
    const matchesSearch = entry.foodName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "All" || entry.type === filterType;
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
        <Box className="search-box" sx={{ display: "flex", gap: 2 }}>
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
                <TableCell className="table-header-cell">Type</TableCell>
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
                .map((entry, index) => (
                  <TableRow key={index} className="table-row">
                    <TableCell className="table-cell">
                      {entry.foodName}
                    </TableCell>
                    <TableCell className="table-cell">{entry.type}</TableCell>
                    <TableCell className="table-cell">
                      {entry.calorie}
                    </TableCell>
                    <TableCell className="table-cell">
                      {entry.carbohydrate}
                    </TableCell>
                    <TableCell className="table-cell">{entry.fat}</TableCell>
                    <TableCell className="table-cell">
                      {entry.protein}
                    </TableCell>
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
