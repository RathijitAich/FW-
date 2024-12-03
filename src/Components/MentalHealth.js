import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import './MentalHealth.css';

const imgg9 = 'https://cdn.thewirecutter.com/wp-content/uploads/2020/04/videogames-lowres-animalcrossing2-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp';
const imgg8 = 'https://png.pngtree.com/thumb_back/fh260/background/20241010/pngtree-relaxing-tropical-beach-silhouette-with-sunset-views-image_16358277.jpg';

export default function MentalHealth() {
    return (
        <div className="mymental">
            <div className="carousel-boxing">
                <div className="carousel-containering">
                    <Carousel>
                        <Carousel.Item>
                            <Link to="/MentalHealthQuestion">
                                <img
                                    className="d-block carousel-image"
                                    src={imgg8}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>Overall Assessment</h3>
                                    <p>Answer some questions to get an assessment</p>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Link to="/Relax_stress">
                                <img
                                    className="d-block carousel-image"
                                    src={imgg9}
                                    alt="Second slide"
                                />
                                <Carousel.Caption>
                                    <h3>Leisure Activities</h3>
                                    <p>Check out these titles.</p>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    );
}