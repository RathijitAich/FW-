import React from 'react';
import MainMenuCard from './MainMenuCard'; // Import the MainMenuCard component
import './MainMenuCard.css'; // Import the CSS file
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Avatar, Card, CardMedia, CardContent, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import { Container, Grid, Paper } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';





import imgg5 from '../Images/Real2.jpg';
import imgg6 from '../Images/Real4.jpg';
import imgg7 from '../Images/Real5.jpg';
import imgg8 from '../Images/slide4.jpg';
import imgg9 from '../Images/slide3.jpg';

const influencers = [
    { name: 'Jeff Nippard', image: 'https://sp-blog.s3.amazonaws.com/Jeff%20Nippard.jpg', link: 'https://www.youtube.com/@JeffNippard' },
    { name: 'Jesse James West', image: 'https://usgymfluencers-1eff6.kxcdn.com/wp-content/uploads/sites/3/2023/06/Screenshot-2023-06-20-at-16.58.48-1024x881.png', link: 'https://www.youtube.com/@JesseJamesWest' },
    { name: 'Sean Nalewanyj', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ4rmM5Y-2Os8yxxyb7_Y9j4CjEvS8LSetsg&s', link: 'https://www.youtube.com/@Sean_Nalewanyj' },
    { name: 'David Goggins', image: 'https://vegetarian-vacations.com/wp-content/uploads/2023/09/14709.webp', link: 'https://davidgoggins.com/' },
    { name: 'David Laid', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsppu3QhENOhF76pNWWWZDrEL4qT9QUFYAvw&s', link: 'https://www.youtube.com/@DavidLaid' },
    { name: 'Jeff Seid', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtDEHH5SzWLiMjW1vwBLGjKX5gd6VgSO4CMA&s', link: 'https://www.youtube.com/@OfficialJeffSeid' },
    { name: 'Andrew Huberman', image: 'https://www.gspeakers.com/wp-content/uploads/2024/09/dr-andrew-huberman.jpg', link: 'https://www.youtube.com/@hubermanlab' },
    { name: 'Sam Sulek', image: 'https://potomacpulse.org/wp-content/uploads/2024/01/sam-sulek-arms-workout-routine.webp?w=1080&h=656&crop=1', link: 'https://www.youtube.com/@sam_sulek' },
];

const mediaCards = [
    { title: 'Joe Rogan', description: 'Joe Rogan', videoUrl: 'https://www.youtube.com/watch?v=_fbCcWyYthQ&ab_channel=JREClips' },
    { title: 'Podcast 2', description: 'Description 2', videoUrl: 'https://www.youtube.com/watch?v=LiWyf3wNEmQ&ab_channel=PowerfulJRE' },
    { title: 'Podcast 3', description: 'Description 3', videoUrl: 'https://www.youtube.com/watch?v=juD99_sPWGU&ab_channel=AndrewHuberman' },
    { title: 'Podcast 4', description: 'Description 4', videoUrl: 'https://www.youtube.com/watch?v=dfYBMPCA5pg&ab_channel=ChrisWilliamson' },
    { title: 'Podcast 5', description: 'Description 5', videoUrl: 'https://www.youtube.com/watch?v=57Ls_DMqi48&ab_channel=RichRoll' },
    { title: 'Podcast 6', description: 'Description 6', videoUrl: 'https://www.youtube.com/watch?v=FvLaInrVg5k&ab_channel=GunjanShouts' },
];

export default function ActionAreaCard() {

    const cardsData = [
        {
            title: 'Set Your Workout Plan',
            description: 'Create a workout plan that suits your needs and goals.',
            image: imgg5,
            link: '/WorkoutPlan'
        },
        {
            title: 'Diet Plan',
            description: 'Create a diet plan that suits your needs and goals.',
            image: imgg6,
            link: '/DietPlanGenerator'
        },
        {
            title: 'Mental Health',
            description: 'Mental health is just as important as physical health.',
            image: imgg7,
            link: '/MentalHealth'
        },
    ];

    const [selectedCard, setSelectedCard] = useState(null);

    const handleCardClick = (index) => {
        setSelectedCard(selectedCard === index ? null : index);
    };


    return (
        <>
            <div className="container  center-container">
                <div className="row">
                    {cardsData.map((card, index) => (
                        <div className="col-md-4" key={index}>
                            <MainMenuCard
                                title={card.title}
                                description={card.description}
                                image={card.image}
                                link={card.link}
                            />
                        </div>
                    ))}
                </div>
            </div>



            <div className="carousel-box">
                <div className="carousel-container">
                    <Carousel>
                        <Carousel.Item>
                            <Link to="/slide1">
                                <img
                                    className="d-block carousel-image"
                                    src={imgg8}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>Explore Exercises</h3>
                                    <p>Learn forms</p>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Link to="/Food_dictionary">
                                <img
                                    className="d-block carousel-image"
                                    src={imgg9}
                                    alt="Second slide"
                                />
                                <Carousel.Caption>
                                    <h3>Foods</h3>
                                    <p>Nutrients and values.</p>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>


            <Container sx={{ mb: 15, mt: 20 }}>
                <Grid container spacing={3} direction="column" alignItems="center">
                    <Grid item xs={12}>
                        <Paper sx={{ p: 4, width: '100%', backgroundColor: 'antiquewhite' }}>
                            <Typography variant="h4" gutterBottom>
                                HealthyHorizons Game
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                HealthyHorizons is a game developed by one of our admin. Check out the game below and have fun!
                            </Typography>
                            <iframe
                                frameBorder="0"
                                src="https://itch.io/embed/3120867?bg_color=c5aaaa&amp;fg_color=000000"
                                // src="./Game/index.html"
                                width="100%"
                                height="167"
                                title="HealthyHorizons Game"

                            >
                                <a href="https://snikdrek.itch.io/healthyhorizons">HealthyHorizons by SnikDrek</a>
                            </iframe>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>


            <div className="media-box">

                <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderRadius: 2, mb: 5, width: '450px', mt: 5 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#3f51b5' }}>
                        Check out these podcasts and get inspired!
                    </Typography>
                </Box>

                <div className="row">

                    {mediaCards.map((media, index) => (
                        <div className="col-md-4" key={index}>
                            <Card className="media-card">
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {media.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {media.description}
                                    </Typography>
                                </CardContent>
                                <CardMedia>
                                    <ReactPlayer url={media.videoUrl} width="100%" />
                                </CardMedia>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>

            

            

            <Box display="flex" flexDirection="column" alignItems="center" >

            <Box sx={{ p: 2, backgroundColor: '#f6f9fb', borderRadius: 2, mb: 5, width: '400px', mt: 20 }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#3f51b5' }}>
                        You might like these fitness influencers!
                    </Typography>
                </Box>
                {influencers.map((influencer, index) => (
                    <Link to={influencer.link} key={index} style={{ textDecoration: 'none' }}>
                        <Card
                            onClick={() => handleCardClick(index)}
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                maxWidth: selectedCard === index ? 1000 : 800,
                                m: 2,
                                p: 2,
                                transition: 'max-width 0.3s ease-in-out',
                                cursor: 'pointer',
                                '&:hover': {
                                    boxShadow: 6,
                                    transform: 'scale(1.05) translateY(-10px)',
                                    boxShadow: '0 10px 20px rgba(245, 8, 8, 0.2)',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                },
                                backgroundColor: '#f0f9fcd6',
                                color:'blue',
                            }}
                        >
                            {/* Image Section */}
                            <CardMedia
                                component="img"
                                sx={{
                                    width: 200,
                                    height: 200,
                                    borderRadius: 1,
                                    objectFit: 'cover',
                                    mr: 3,
                                }}
                                image={influencer.image}
                                alt={influencer.name}
                            />

                            {/* Description Section */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'  }}>
                                <CardContent sx={{ textAlign: 'left' }}>
                                    <Typography component="div" variant="h6" sx={{ mb: 1 }}>
                                        {influencer.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {(() => {
                                            switch (influencer.name) {
                                                case 'Jeff Nippard':
                                                    return 'Jeff Nippard specializes in evidence-based fitness and bodybuilding content.';
                                                case 'Jesse James West':
                                                    return 'Jesse James West shares energetic vlogs and workout routines.';
                                                case 'Sean Nalewanyj':
                                                    return 'Sean Nalewanyj focuses on simple, science-backed fitness advice.';
                                                case 'David Goggins':
                                                    return 'David Goggins inspires with his story of resilience and mental toughness.';
                                                case 'David Laid':
                                                    return 'David Laid showcases aesthetic bodybuilding and fitness journeys.';
                                                case 'Jeff Seid':
                                                    return 'Jeff Seid is a pioneer of aesthetic bodybuilding and fitness motivation.';
                                                case 'Andrew Huberman':
                                                    return 'Andrew Huberman shares neuroscience insights to optimize health and performance.';
                                                case 'Sam Sulek':
                                                    return 'Sam Sulek brings raw and unfiltered bodybuilding content.';
                                                default:
                                                    return 'Check out their content for amazing tips and motivation!';
                                            }
                                        })()}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    </Link>
                ))}
            </Box>


        </>
    );
}