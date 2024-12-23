import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

// import localStorage from 'local-storage';

import Navbar from "./Components/Navbar";
import Login_Page from "./Components/Login_Page";

import News from "./Components/News";
import MainMenu from "./Components/Main-menu";
import Registration from "./Components/Registration";
import Calculators from "./Components/Calculators";
import BMI from "./Components/BMI";
import CalorieThatDay from "./Components/CalorieThatDay";
import CalorieIntake from "./Components/CalorieIntake";
import Footer from "./Components/Footer";
import Userprofile from "./Components/Userprofile";
import MentalHealth from "./Components/MentalHealth";
import Workout_plan from "./Components/workout_plan";
import GeneratedPlan from "./Components/generated_plan";
import MentalHealthQuestion from "./Components/MentalHealthQuestion";
import Relax_stress from "./Components/Relax_stress";
import LandingPage from "./Components/LandingPage";
import Admin_login from "./Components/Admin_login";
import Admin_Dashboard from "./Components/Admin_DashBoard";
import Food_dictionary from "./Components/Food_dictionary";


import { Snackbar, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

function App() {



  // everytime the app loads from here 

  const [alertMessage, setAlertMessage] = useState(''); // State for alert message 
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [isloggedin, setisloggedin] = useState(localStorage.getItem('isloggedin') === 'true');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [password, setPassword] = useState(localStorage.getItem('password') || '');
  const [user_id, setUser_id] = useState(localStorage.getItem('user_id') || '');
  const [isloggedin_admin, setisloggedin_admin] = useState(localStorage.getItem('isloggedin_admin') === 'true');
  const [admin_id, setAdmin_id] = useState(localStorage.getItem('admin_id') || '');
  const [admin_password, setAdmin_password] = useState(localStorage.getItem('admin_password') || '');
  const [isloggedin_trainer, setisloggedin_trainer] = useState(localStorage.getItem('isloggedin_trainer') === 'true');
  const [trainer_id, setTrainer_id] = useState(localStorage.getItem('trainer_id') || '');
  const [trainer_password, setTrainer_password] = useState(localStorage.getItem('trainer_password') || '');


  useEffect(() => {
    localStorage.setItem('isloggedin', isloggedin);
  }, [isloggedin]);

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);

  useEffect(() => {
    localStorage.setItem('password', password);
  }, [password]);

  useEffect(() => {
    localStorage.setItem('user_id', user_id);
  }, [user_id]);

  useEffect(() => {
    localStorage.setItem('isloggedin_admin', isloggedin_admin);
  }, [isloggedin_admin]);

  useEffect(() => {
    localStorage.setItem('admin_id', admin_id);
  }, [admin_id]);

  useEffect(() => {
    localStorage.setItem('admin_password', admin_password);
  }, [admin_password]);

  useEffect(() => {
    localStorage.setItem('isloggedin_trainer', isloggedin_trainer);
  }, [isloggedin_trainer]);

  useEffect(() => {
    localStorage.setItem('trainer_id', trainer_id);
  }, [trainer_id]);

  useEffect(() => {
    localStorage.setItem('trainer_password', trainer_password);
  }, [trainer_password]);



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
        user_id={user_id}
        setUser_id={setUser_id}

        admin_id={admin_id}
        setAdmin_id={setAdmin_id}
        admin_password={admin_password}
        setAdmin_password={setAdmin_password}
        isloggedin_admin={isloggedin_admin}
        setisloggedin_admin={setisloggedin_admin}

        trainer_id={trainer_id}
        setTrainer_id={setTrainer_id}
        trainer_password={trainer_password}
        setTrainer_password={setTrainer_password}
        isloggedin_trainer={isloggedin_trainer}
        setisloggedin_trainer={setisloggedin_trainer}

      />
    </Router>
  );
}

function AppContent({ isloggedin, setisloggedin, alertMessage, setAlertMessage, openSnackbar, setOpenSnackbar, username, setUsername, password, setPassword, user_id, setUser_id, admin_id, setAdmin_id, admin_password, setAdmin_password, isloggedin_admin, setisloggedin_admin, trainer_id, setTrainer_id, trainer_password, setTrainer_password, isloggedin_trainer, setisloggedin_trainer }) {
  const navigate = useNavigate();
  const location = useLocation();
  const location2 = useLocation();


  // handle user login
  const handleloginbutton = async (event) => {
    event.preventDefault();
    console.log("Login request data:", { user_id, password });
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, password })
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
          navigate('/Home');
        }, 1000); // Navigate after 1 seconds

      } else {
        const error = await response.text();
        console.log('Login Failed', error);
        // Show error message
        setAlertMessage('Login Failed: Invalid user_id or password');
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

    setAlertMessage('You have been logged out');
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate('/Home');
    }, 2000);
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close Snackbar
  };


  // handle admin login 


  const handleAdminloginbutton = async (event) => {
    event.preventDefault();
    console.log("Login request data:", { admin_id, password: admin_password });
    try {
      const response = await fetch('http://localhost:8080/api/admins/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admin_id, password: admin_password })
      });

      if (response.ok) {
        const data = await response.text();
        console.log(data);
        // Login successful
        // Show success message
        setAlertMessage('Login Successful as Admin Now Redirecting...');
        setOpenSnackbar(true); // Open Snackbar


        

        // Delay navigation for a short period to allow the Snackbar to show
        setTimeout(() => {
          navigate('/Admin_Dashboard');
        }, 1000); // Navigate after 1 seconds

      } else {
        const error = await response.text();
        console.log('Login Failed', error);
        // Show error message
        setAlertMessage('Login Failed: Invalid admin_id or password');
        setOpenSnackbar(true); // Open Snackbar
      }
    } catch (error) {
      console.error('Login Failed', error);

      setOpenSnackbar(true); // Open Snackbar
    }
  }


  return (
    <>



      {location.pathname !== '/' && location.pathname !== '/Admin_Dashboard' && <Navbar isloggedin={isloggedin} logoutclicked={logoutclicked} />}



      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<MainMenu />} />
        <Route path="/Login" element={<Login_Page handleloginbutton={handleloginbutton} setPassword={setPassword} setUser_id={setUser_id} />} />
        <Route path="/Articles" element={<News />} />
        <Route path="/WorkoutPlan" element={<Workout_plan />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Calculators" element={<Calculators />} />
        <Route path="/BMI" element={<BMI />} />
        <Route path="/CalorieThatDay" element={<CalorieThatDay />} />
        <Route path="/CalorieIntake" element={<CalorieIntake />} />
        <Route path="/Userprofile" element={<Userprofile isloggedin={isloggedin} user_id={user_id} username={username} password={password} />} />
        <Route path="/MentalHealth" element={<MentalHealth />} />
        <Route path="/MentalHealthQuestion" element={<MentalHealthQuestion />} />
        <Route path="/Relax_stress" element={<Relax_stress />} />
        <Route path="/Food_dictionary" element={<Food_dictionary />} />


        <Route path="/generated_plan" element={<GeneratedPlan />} />

        <Route path="/Admin_login" element={<Admin_login isloggedin={isloggedin} isloggedin_admin={isloggedin_admin} setisloggedin_admin={setisloggedin_admin} admin_id={admin_id} setAdmin_id={setAdmin_id} admin_password={admin_password} setAdmin_password={setAdmin_password} handleAdminloginbutton={handleAdminloginbutton} />} />
        <Route path="/Admin_Dashboard" element={<Admin_Dashboard isloggedin_admin={isloggedin_admin} setisloggedin_admin={setisloggedin_admin} admin_id={admin_id} setAdmin_id={setAdmin_id} admin_password={admin_password} setAdmin_password={setAdmin_password} />} />

      </Routes>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={alertMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          '& .MuiSnackbarContent-root': {
            color: 'black', // Change this to your desired color
            backgroundColor: 'white', // Change this to your desired color
          },
        }}
      />
      {/* <Footer /> */}
    </>
  );
}

export default App;