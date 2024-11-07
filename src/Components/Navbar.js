import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './Navbar.css'; // Import the CSS file
import Navbar_logo from '../Images/gpt_icon.svg'; 
import PropTypes from 'prop-types';

export default function Navbar({ isloggedin, logoutclicked, fontFamily = 'Roboto, sans-serif', fontSizeBrand = '1.1rem', fontSizeLink = '1rem' }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'rgb(168 176 188 / 0.5%)', padding: '0.003rem' }}>
        <div className="container-fluid">
          <a className="navbar-brand modern-brand" href="#" style={{ fontFamily, fontSize: fontSizeBrand }}>
            <img src={Navbar_logo} alt="Logo" className="navbar-logo" /> 
            
          </a>
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
                <Link className="nav-link active modern-link" aria-current="page" to="/" style={{ fontFamily, fontSize: fontSizeLink, border: '1px solid #ccc', borderRadius: '15px', backgroundColor: '#bfeb9da6', fontWeight:'bold', marginRight: '15px' }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active modern-link" aria-current="page" to="/Calculators" style={{ fontFamily, fontSize: fontSizeLink, marginRight: '15px',border: '1px solid #ccc', borderRadius: '15px', backgroundColor: '#bfeb9da6', fontWeight:'bold', marginRight: '15px' }}>Calculators</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active modern-link" aria-current="page" to="/Articles" style={{ fontFamily, fontSize: fontSizeLink, marginRight: '15px',
                  borderRadius: '15px', backgroundColor: '#bfeb9da6', fontWeight:'bold', marginRight: '15px'
                 }}>Fitness Articles</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle modern-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontFamily, fontSize: fontSizeLink, marginRight: '15px',
                  borderRadius: '15px', backgroundColor: '#bfeb9da6', fontWeight:'bold', marginRight: '15px'
                 }}>
                  Profile
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="#" style={{ fontFamily }}>My Profile</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="#" style={{ fontFamily }}>Current Workout Plan</Link></li>
                  <li><Link className="dropdown-item" to="#" style={{ fontFamily }}>Current Diet Plan</Link></li>
                  <li><Link className="dropdown-item" to="#" style={{ fontFamily }}>Mental Health Today</Link></li>
                  <li><Link className="dropdown-item" to="#" style={{ fontFamily }}>Progress</Link></li>
                </ul>
              </li>
            </ul>
            {isloggedin ? (
              <Button variant="contained" color="secondary" onClick={logoutclicked} style={{ fontFamily, fontSize: fontSizeLink }}>
                Logout
              </Button>
            ) : (
              <Button variant="contained" color="primary" component={Link} to="/Login" style={{ fontFamily, fontSize: fontSizeLink }}>
                Login
              </Button>
            )}
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
};