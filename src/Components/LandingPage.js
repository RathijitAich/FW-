import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import Slider from 'react-slick';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import BarChartIcon from '@mui/icons-material/BarChart';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import gymBackground from '../Images/landing1.jpg';
import motivationImage from '../Images/motivation11.jpg';
import motivationImage2 from '../Images/1.jpg'; // Replace with actual images
import motivationImage3 from '../Images/motivation2.png';

const StyledContainer = styled(Container)`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@400;700&display=swap');
  font-family: 'Lato', sans-serif;
`;

export default function LandingPage() {

  


  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const features = [
    { icon: <FitnessCenterIcon sx={{ fontSize: 40, color: '#ff5722' }} />, title: 'Personalized Workouts', description: 'Get custom workout plans tailored for you.' },
    { icon: <RestaurantIcon sx={{ fontSize: 40, color: '#4caf50' }} />, title: 'Nutrition Plans', description: 'Receive personalized meal plans to meet your goals.' },
    { icon: <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#2196f3' }} />, title: 'Health Tracking', description: 'Monitor your health metrics and progress.' },
    { icon: <BarChartIcon sx={{ fontSize: 40, color: '#9c27b0' }} />, title: 'Progress Reports', description: 'Track your progress with detailed reports.' },
    { icon: <LocalLibraryIcon sx={{ fontSize: 40, color: '#ffeb3b' }} />, title: 'Educational Resources', description: 'Access a library of fitness and health resources.' },
  ];

  const quotes = [
    { 
      text: '"Don\'t limit your challenges. Challenge your limits."',
      description: 'Push yourself to new heights every day.',
      image: motivationImage 
    },
    { 
      text: '"The body achieves what the mind believes."',
      description: 'Your mindset determines your success.',
      image: motivationImage2 
    },
    { 
      text: '"It always seems impossible until it\'s done."',
      description: 'Stay focused, stay determined, and never quit.',
      image: motivationImage3 
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${gymBackground})`,


        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: 'white',
        p: 2,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgb(46 44 76 / 20%)',
          zIndex: 1,
        },
      }}
    >
      <StyledContainer sx={{ position: 'relative', zIndex: 2 }}>
        {/* Main Heading Section */}
        <Box sx={{ maxWidth: 600, textAlign: 'left', mb: 4, background:'linear-gradient(135deg, rgb(84 70 124 / 96%), rgb(21 122 139 / 83%))', borderRadius: 8, mt:19,p: 4 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '32px', sm: '42px', md: '48px' },
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '700',
              mb: 2,
              
            }}
          >
            Your Fitness Journey Starts Here
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '16px', sm: '18px', md: '20px' },
              fontFamily: 'Lato, sans-serif',
              mb: 3,
              color:'#0dffed'
            }}
          >
          Join us and embark on a transformative journey towards a healthier, fitter, and happier you.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: '#333',
              fontWeight: 'bold',
              borderRadius: 8,
              py: 1,
              px: 4,
              textTransform: 'uppercase',
            }}
            href="/Home"
          >
            START NOW
          </Button>
        </Box>

        {/* Features Slider Section */}
        <Box sx={{ mt: 5 }}>
          <Slider {...sliderSettings}>
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: 'center',
                  p: 5,
                  background: '#cad7e0f5',
                  borderRadius: 2,
                  color: '#333',
                  mx: 3,
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                }}
                style={{padding: '0 10px'}}
              >
                {feature.icon}
                <Typography variant="h6" sx={{ mt: 2, fontFamily: 'Montserrat, sans-serif', fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, fontFamily: 'Lato, sans-serif' }}>
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Slider>
        </Box>

        {/* Motivational Quotes Section */}
        {quotes.map((quote, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' }, 
              mt: 8,
              alignItems: 'center',
              gap: 4,
            }}
          >
            {/* Quote */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } ,background:'linear-gradient(135deg, rgb(0 0 0 / 96%), rgb(21 122 139 / 83%))', borderRadius: 8, p: 4, boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)' }}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '24px', sm: '28px', md: '32px' },
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: '700',
                  mb: 2,
                  color: '#fff',
                  
                }}
              >
                {quote.text}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '16px', sm: '18px' },
                  fontFamily: 'Lato, sans-serif',
                  color: '#ddd',
                }}
              >
                {quote.description}
              </Typography>
            </Box>

            {/* Image */}
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <img
                src={quote.image}
                alt="Motivational"
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)',
                }}
              />
            </Box>
          </Box>
        ))}
      </StyledContainer>
    </Box>
  );
}
