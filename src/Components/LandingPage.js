import React from 'react';
import { Box, Grid, Typography, Button, Container } from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import MentalHealthIcon from '@mui/icons-material/HealthAndSafety';
import BarChartIcon from '@mui/icons-material/BarChart';
import imgg1 from '../Images/frontpage7.jpg';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Montserrat:wght@400;700&display=swap');
  font-family: 'Lato', sans-serif;
`;

export default function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        // backgroundImage: `url(${imgg1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        p: 2,
      }}
    >
      <StyledContainer sx={{ maxWidth: 800 }}>
        <Grid container spacing={3} sx={{ mx: 'auto', backgroundColor:'#2930306b' }}>
          <Grid item xs={12} sx={{    backgroundColor: '#070707a1'}} >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              Welcome to Our Fitness App
            </Typography>
            <Typography
              variant="h6"
              component="p"
              gutterBottom
              sx={{ fontStyle: 'italic', fontFamily: 'Lato, sans-serif' }}
            >
              Your journey to a healthier life starts here.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{ mt: 2 }}
              href="/Home"
            >
              Get Started
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              What We Offer
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 1, border: '1px solid #ccc', borderRadius: 2 }}>
              <FitnessCenterIcon sx={{ fontSize: 50, mb: 1 }} />
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Personalized Workout Plans
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: 'Lato, sans-serif' }}
              >
                Get customized workout plans tailored to your fitness goals and level.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center', p: 1, border: '1px solid #ccc', borderRadius: 2 }}>
              <RestaurantIcon sx={{ fontSize: 50, mb: 1 }} />
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Nutrition Guidance
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: 'Lato, sans-serif' }}
              >
                Receive expert advice on nutrition and meal plans to complement your workouts.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ pr: 3 }}>
            <Box sx={{ textAlign: 'center', p: 1, border: '1px solid #ccc', borderRadius: 2 }}>
              <LocalLibraryIcon sx={{ fontSize: 50, mb: 1 }} />
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Educational Resources
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: 'Lato, sans-serif' }}
              >
                Access a library of articles and videos to learn more about fitness and health.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ textAlign: 'center', p: 1, border: '1px solid #ccc', borderRadius: 2 }}>
              <MentalHealthIcon sx={{ fontSize: 50, mb: 1 }} />
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Mental Health Support
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: 'Lato, sans-serif' }}
              >
                Explore resources and tools to support your mental well-being.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ pr: 3 }}>
            <Box sx={{ textAlign: 'center', p: 1, border: '1px solid #ccc', borderRadius: 2 }}>
              <BarChartIcon sx={{ fontSize: 50, mb: 1 }} />
              <Typography
                variant="h6"
                component="h3"
                gutterBottom
                sx={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Calculating Calories
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontFamily: 'Lato, sans-serif' }}
              >
                Use our tools to calculate your daily calorie intake and stay on track.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </StyledContainer>
    </Box>
  );
}