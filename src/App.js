import "./App.css";
import { useState } from "react";
import { useEffect } from "react";

// import localStorage from 'local-storage';

import Navbar from "./Components/Navbar";
import Login_Page from "./Components/Login_Page";

import MainMenu from "./Components/Main-menu";
import Registration from "./Components/Registration";
import Calculators from "./Components/Calculators";
import BMI from "./Components/BMI";
import CalorieThatDay from "./Components/CalorieThatDay";
import CalorieIntake from "./Components/CalorieIntake";
import Footer from "./Components/Footer";

//User profile imports
import Userprofile from "./Components/Userprofile";
import CurrentWorkoutPlan from "./Components/CurrentWorkoutPlan";

//News imports
import News from "./Components/News";

//Mental Health imports
import MentalHealth from "./Components/MentalHealth";
import MentalHealthQuestion from "./Components/MentalHealthQuestion";
import Relax_stress from "./Components/Relax_stress";

//Landing Page
import LandingPage from "./Components/LandingPage";


//Workout and Workout Plan imports
import Workout_plan from "./Components/workout_plan";
import GeneratedPlan from "./Components/generated_plan";
import Workouts from "./Components/WorkoutDictionary";
import  GeneratedPremadePlan  from "./Components/generated_premade_plan";

//Admin Imports
import Admin_Dashboard from "./Components/Admin_DashBoard";
import WorkoutEdit from "./Components/WorkoutEdit";
import TrainerManagement from "./Components/TrainerManagement";


//Trainer Imports
import TrainerDashboard from "./Components/Trainer_DashBoard";
import WorkoutPlanEdit from "./Components/WorkoutPlanEdit";
import  AddRemoveWorkoutTrainer  from "./Components/add_remove_workout_trainer";

//Diet and Food imports
import Food_dictionary from "./Components/Food_dictionary";
import DietPlanGenerator from "./Components/DietPlanGenerator";
import DietPlan from "./Components/DietPlan";


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

  const [loginType, setLoginType] = useState("user");




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

  useEffect(() => {
    localStorage.setItem('loginType', loginType);
  }, [loginType]);



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

        loginType={loginType}
        setLoginType={setLoginType}

      />
    </Router>
  );
}

function AppContent({ isloggedin, setisloggedin, alertMessage, setAlertMessage, openSnackbar, setOpenSnackbar, username, setUsername, password, setPassword, user_id, setUser_id, admin_id, setAdmin_id, admin_password, setAdmin_password, isloggedin_admin, setisloggedin_admin, trainer_id, setTrainer_id, trainer_password, setTrainer_password, isloggedin_trainer, setisloggedin_trainer, loginType, setLoginType }) {
  const navigate = useNavigate();
  const location = useLocation();
  const location2 = useLocation();


  // handle user login
  // const handleloginbutton = async (event) => {
  //   event.preventDefault();
  //   console.log("Login request data:", { user_id, password, role: loginType});
  //   try {
  //     const response = await fetch('http://localhost:8080/api/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ user_id, password, role: loginType })
  //     });

  //     if (response.ok) {
  //       const data = await response.text();
  //       console.log(data);
  //       // Login successful
  //       // Show success message
  //       setAlertMessage('Login Successful Now Redirecting...');
  //       setOpenSnackbar(true); // Open Snackbar

  //       setisloggedin(true); // Set the login status to true from app.js

  //       // Delay navigation for a short period to allow the Snackbar to show
  //       setTimeout(() => {
  //         navigate('/Home');
  //       }, 1000); // Navigate after 1 seconds

  //     } else {
  //       const error = await response.text();
  //       console.log('Login Failed', error);
  //       // Show error message
  //       setAlertMessage('Login Failed: Invalid user_id or password');
  //       setOpenSnackbar(true); // Open Snackbar
  //     }
  //   } catch (error) {
  //     console.error('Login Failed', error);
  //     setAlertMessage('Login Failed: An error occurred');
  //     setOpenSnackbar(true); // Open Snackbar
  //   }
  // }

  const handleloginbutton = async (event) => {
    event.preventDefault();
    
    console.log("Login request data from form :", { user_id, password, role: loginType });

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, password, role: loginType })
      });

      if (response.ok) {
        const data = await response.json(); // Parse response as JSON
        console.log(data);

        // Destructure the response to get role and message
        const { role, message } = data;

        // Show role-specific message
        setAlertMessage(`${message} You are logged in as a ${role}. Now Redirecting...`);
        setOpenSnackbar(true); // Open Snackbar

        

        // Set state based on the role
        switch (role) {
          case "admin":
            setisloggedin_admin(true);
            setAdmin_id(user_id);
            setisloggedin_trainer(false);
            setisloggedin(false);
            
            
            setUser_id('');
            setPassword('');
            break;
          case "trainer":
            setisloggedin_admin(false);
            setTrainer_id(user_id);//this way we can have the trainer id in its state
            setisloggedin_trainer(true);
            setisloggedin(false);
            
            setUser_id('');
            setPassword('');
            break;
          case "user":
            setisloggedin_admin(false);
            setisloggedin_trainer(false);
            setisloggedin(true);
            setUser_id(user_id);
            break;
          default:
            // If role is undefined or invalid, handle it here
            console.error("Invalid role received");
        }

        // Optionally, log the role for further handling
        console.log("Logged in as:", role);

        // Delay navigation for a short period to allow Snackbar to show
        setTimeout(() => {
          if(role === 'admin'){
            navigate('/Admin_Dashboard');
          }else if(role === 'trainer'){
            navigate('/Trainer_Dashboard');
          }else{
          navigate('/Home');}
        }, 1500); // Adjust delay as needed

      } else {
        const error = await response.json(); // Parse error as JSON if available
        console.log('Login Failed', error);
        setAlertMessage('Login Failed: Invalid id or password');
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
    setUser_id('');
    setUsername('');
    setPassword('');

    console.log(localStorage.getItem('user_id'));
    setAlertMessage('You have been logged out');
    setOpenSnackbar(true);
    setTimeout(() => {
      navigate('/Home');
    }, 2000);
  }

  const handleSnackbarClose = () => {
    setOpenSnackbar(false); // Close Snackbar
  };


 

  return (
    <>



      {location.pathname !== '/' && location.pathname !== '/Admin_Dashboard' && <Navbar isloggedin={isloggedin} logoutclicked={logoutclicked} isloggedin_admin={isloggedin_admin} isloggedin_trainer={isloggedin_trainer} />}



      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="/Home" element={<MainMenu />} />
        <Route path="/Login" element={<Login_Page handleloginbutton={handleloginbutton} setPassword={setPassword} setUser_id={setUser_id} loginType={loginType} setLoginType={setLoginType}  setAdmin_id={setAdmin_id} setTrainer_id={setTrainer_id}  />} />
        <Route path="/Articles" element={<News />} />
       
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Calculators" element={<Calculators />} />
        <Route path="/BMI" element={<BMI />} />
        <Route path="/CalorieThatDay" element={<CalorieThatDay />} />
        <Route path="/CalorieIntake" element={<CalorieIntake />} />

        {/* user profile routing */}
        <Route path="/Userprofile" element={<Userprofile isloggedin={isloggedin} user_id={user_id} username={username} password={password} />} />
        <Route path="/CurrentWorkoutPlan" element={<CurrentWorkoutPlan user_id={user_id} />} />


        {/* //Mental Health routing */}
        <Route path="/MentalHealth" element={<MentalHealth />} />
        <Route path="/MentalHealthQuestion" element={<MentalHealthQuestion />} />
        <Route path="/Relax_stress" element={<Relax_stress />} />


        {/* workout plan and workout dictionary routing */}
        <Route path="/WorkoutPlan" element={<Workout_plan />} />
        <Route path="/workout_plan/generated_plan" element={<GeneratedPlan />}/>
        <Route path="/Workout_dictionary" element={<Workouts />} />
        <Route path="/generated_premade_plan" element={<GeneratedPremadePlan user_id={user_id} />} />

        {/* diet and food routing */}
        <Route path="/DietPlanGenerator" element={<DietPlanGenerator />} />
        <Route path="/Food_dictionary" element={<Food_dictionary />} />
        <Route path="/diet-plan" element={<DietPlan />} />

        

        {/*admin dashboard*/}
        <Route path="/Admin_Dashboard" element={<Admin_Dashboard setisloggedin_admin={setisloggedin_admin} setAdmin_id={setAdmin_id} setAdmin_password={setAdmin_password} />} />
        <Route path="/workout_dashboard" element={<WorkoutEdit />} />
        <Route path="/trainer_management" element={<TrainerManagement />} />

        {/*trainer dashboard*/}
        <Route path="/Trainer_Dashboard" element={<TrainerDashboard setisloggedin_trainer={setisloggedin_trainer} setTrainer_id={setTrainer_id} setTrainer_password={setTrainer_password} />} />
        <Route path="/trainer_dashboard/edit_workout_plan" element={<WorkoutPlanEdit />} />
        <Route path="/add_remove_workout_trainer" element={<AddRemoveWorkoutTrainer />} />



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