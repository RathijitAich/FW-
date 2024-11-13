import React from 'react';
import './Footer.css'; // Import the CSS file for the footer

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>&copy; {new Date().getFullYear()} Fitness And Workout. All rights reserved.</p>
                <ul className="footer-links">
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;