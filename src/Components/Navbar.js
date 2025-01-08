import { Button } from '@mui/material';
import './Navbar.css'; // Import the CSS file
import Navbar_logo from '../Images/gpt_icon.svg';
import Navbar_logo2 from '../Images/LOGO.jpg';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import localStorage from 'local-storage';

export default function Navbar({ isloggedin, logoutclicked, isloggedin_admin,isloggedin_trainer, fontFamily = 'Roboto, sans-serif', fontSizeBrand = '0.5rem', fontSizeLink = '0.875rem', fontColor = 'black' }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ background: 'linear-gradient(to right, rgb(189 217 246 / 68%), rgba(249, 249, 249, 0.69))', padding: '0.2rem 0.5rem' }}>
        <div className="container-fluid">
          <Link className="navbar-brand modern-brand" aria-current="page" to="/" style={{ fontFamily, fontSize: fontSizeBrand, color: fontColor }}>
            <img src={Navbar_logo} alt="Logo" className="navbar-logo" style={{ height: '50px' }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active modern-link" aria-current="page" to="/Home" style={{ fontFamily, fontSize: fontSizeLink, marginRight: '10px', color: fontColor }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active modern-link" aria-current="page" to="/Calculators" style={{ fontFamily, fontSize: fontSizeLink, marginRight: '10px', color: fontColor }}>Calculators</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active modern-link" aria-current="page" to="/Articles" style={{ fontFamily, fontSize: fontSizeLink, marginRight: '10px', color: fontColor }}>Fitness Articles</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle modern-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontFamily, fontSize: fontSizeLink, marginRight: '10px', color: fontColor }}>
                  Profile
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/Userprofile" style={{ fontFamily, fontSize: fontSizeLink, color: 'black' }}>My Profile</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/CurrentWorkoutPlan" style={{ fontFamily, fontSize: fontSizeLink, color: 'black' }}>Current Workout Plan</Link></li>
                  <li><Link className="dropdown-item" to="/CurrentDietPlan" style={{ fontFamily, fontSize: fontSizeLink, color: 'black' }}>Current Diet Plan</Link></li>
                  <li><Link className="dropdown-item" to="/UserTrainer" style={{ fontFamily, fontSize: fontSizeLink, color: 'black' }}>Your Trainer Details</Link></li>
                </ul>
              </li>

           

            </ul>


            {/* this is to check which user is logged in  , only the first login button works*/}

              {isloggedin ? (
              <Button variant="contained" color="secondary" onClick={logoutclicked} style={{ fontFamily, fontSize: fontSizeLink }}>
                Logout
              </Button>
            ) : (
              <Button variant="contained" color="primary" component={Link} to="/Login" style={{ fontFamily, fontSize: fontSizeLink }}>
                Login
              </Button>
            )}

            {/* {isloggedin_admin ? (
              <Button variant="contained" color="secondary" onClick={logoutclicked} style={{ fontFamily, fontSize: fontSizeLink }}>
                Currently logged in as admin
              </Button>
            ) : (
              <Button variant="contained" color="primary" component={Link}  style={{ fontFamily, fontSize: fontSizeLink }}>
                !Adminlogin
              </Button>
            )}

            {isloggedin_trainer ? (
              <Button variant="contained" color="secondary" onClick={logoutclicked} style={{ fontFamily, fontSize: fontSizeLink }}>
                Currently logged in as trainer
              </Button>
            ) : (
              <Button variant="contained" color="primary" component={Link}  style={{ fontFamily, fontSize: fontSizeLink }}>
                !Trainerlogin
              </Button>
            )} */}

            

            
            

       


          </div>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = {
  isloggedin: PropTypes.bool.isRequired,
  logoutclicked: PropTypes.func.isRequired,
  fontFamily: PropTypes.string,
  fontSizeBrand: PropTypes.string,
  fontSizeLink: PropTypes.string,
  fontColor: PropTypes.string,
};