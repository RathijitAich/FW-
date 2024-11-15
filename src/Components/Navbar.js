import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './Navbar.css'; // Import the CSS file
import Navbar_logo from '../Images/gpt_icon.svg';
import PropTypes from 'prop-types';

export default function Navbar({ isloggedin, logoutclicked, fontFamily = 'Roboto, sans-serif', fontSizeBrand = '0.5rem', fontSizeLink = '0.875rem' }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ background: 'linear-gradient(to right, rgb(158 212 119 / 70%), rgb(249 249 249 / 69%))', padding: '0.2rem 0.5rem' }}>
        <div className="container-fluid">
          <a className="navbar-brand modern-brand" href="#" style={{ fontFamily, fontSize: fontSizeBrand }}>
            <img src={Navbar_logo} alt="Logo" className="navbar-logo" style={{ height: '70px' }} />
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
                <Link className="nav-link active modern-link" aria-current="page" to="/" style={{ fontFamily, fontSize: fontSizeLink, marginRight: '10px' }}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active modern-link" aria-current="page" to="/Calculators" style={{ fontFamily, fontSize: fontSizeLink, marginRight: '10px' }}>Calculators</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active modern-link" aria-current="page" to="/Articles" style={{ fontFamily, fontSize: fontSizeLink, marginRight: '10px' }}>Fitness Articles</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle modern-link" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontFamily, fontSize: fontSizeLink, marginRight: '10px' }}>
                  Profile
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/Userprofile" style={{ fontFamily, fontSize: fontSizeLink }}>My Profile</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="#" style={{ fontFamily, fontSize: fontSizeLink }}>Current Workout Plan</Link></li>
                  <li><Link className="dropdown-item" to="#" style={{ fontFamily, fontSize: fontSizeLink }}>Current Diet Plan</Link></li>
                  
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