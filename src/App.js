import "./App.css";


import Navbar from "./Components/Navbar";
import TextForm from "./Components/TextForm";
import Login_Page from "./Components/Login_Page";
import { useState } from "react";
import News from "./Components/News";
import MainMenu from "./Components/Main-menu";
import Registration from "./Components/Registration";
import Calculators from "./Components/Calculators";
import BMI from "./Components/BMI";
import BMR from "./Components/BMR";
import CalorieIntake from "./Components/CalorieIntake";
import Footer from "./Components/Footer";
import { Snackbar, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";


function App() {
 



  const [isloggedin, setisloggedin] = useState(false);
  const [alertMessage, setAlertMessage] = useState(''); // State for alert message
  const [openSnackbar, setOpenSnackbar] = useState(false); // State for Snackbar visibility
  const [username, setUsername] = useState(''); // State for username
  const [password, setPassword] = useState(''); // State for password

  return (
    <Router>
      <AppContent
        isloggedin={isloggedin}
        setisloggedin={setisloggedin}
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage}
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </Router>
  );
}

function AppContent({ isloggedin, setisloggedin, alertMessage, setAlertMessage, openSnackbar, setOpenSnackbar, username, setUsername, password, setPassword }) {
  const navigate = useNavigate();

  const handleloginbutton = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.text();
        console.log(data);
        // Login successful
        // Show success message
        setAlertMessage('Login Successful Now Redirecting...');
        setOpenSnackbar(true); // Open Snackbar

        setisloggedin(true); // Set the login status to true from app.js

        // Delay navigation for a short period to allow the Snackbar to show
        setTimeout(() => {
          navigate('/');
        }, 2000); // Navigate after 2 seconds
      } else {
        const error = await response.text();
        console.log('Login Failed', error);
        // Show error message
        setAlertMessage('Login Failed: Invalid username or password');
        setOpenSnackbar(true); // Open Snackbar
      }
    } catch (error) {
      console.error('Login Failed', error);
      setAlertMessage('Login Failed: An error occurred');
      setOpenSnackbar(true); // Open Snackbar
    }
  }

  const logoutclicked = () => {
    setisloggedin(false);
    navigate('/');
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close Snackbar
  };

  return (
    <>
      <Navbar isloggedin={isloggedin} logoutclicked={logoutclicked} />
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/Login" element={<Login_Page handleloginbutton={handleloginbutton} setUsername={setUsername} setPassword={setPassword} />} />
        <Route path="/Articles" element={<News />} />
        <Route path="/WorkoutPlan" element={<TextForm />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Calculators" element={<Calculators />} />
        <Route path="/BMI" element={<BMI />} />
        <Route path="/BMR" element={<BMR />} />
        <Route path="/CalorieIntake" element ={<CalorieIntake />} />
      </Routes>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={alertMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
      <Footer />
    </>
  );
}

export default App;