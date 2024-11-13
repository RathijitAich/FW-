import React from 'react';
import MainMenuCard from './MainMenuCard'; // Import the MainMenuCard component
import './MainMenuCard.css'; // Import the CSS file
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Avatar, Card, CardMedia, CardContent, Typography } from '@mui/material';
import ReactPlayer from 'react-player';


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
            link: '/DietPlan'
        },
        {
            title: 'Mental Health',
            description: 'Mental health is just as important as physical health.',
            image: imgg7,
            link: '/MentalHealth'
        },
    ];

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
                            <Link to="/slide2">
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
            

            <div className="media-box">
            
                <div className="row">
                <h2 className="text-center" style={{ color: '#92e3c4' }}>Some recommended videos to get you going</h2>
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

            <div className="avatar-box">
                <h2 className="text-center">Fitness Influencers You Can Checkout</h2>
                <div className="avatar-container">
                    {influencers.map((influencer, index) => (
                        <Link to={influencer.link} key={index} className="avatar-link">
                            <Avatar
                                alt={influencer.name}
                                src={influencer.image}
                                sx={{ width: 100, height: 100 }}
                            />
                            <p>{influencer.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}