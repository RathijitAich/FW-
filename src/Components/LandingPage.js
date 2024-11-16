import React from 'react';
import { Box } from '@mui/material';
import imgg1 from '../Images/frontpage4.jpg';

export default function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh', // Ensure the background color covers the full height of the viewport
         // Set your desired background color
        backgroundImage: `url(${imgg1})`, // Set your desired background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div>
        {/* Add your content here */}
      </div>
    </Box>
  );
}