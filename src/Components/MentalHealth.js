import React, { useState } from 'react';
import { Container, Typography, Box, Slider, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

import './MentalHealth.css';



import { Carousel } from 'react-bootstrap';
import imgg8 from '../Images/stress.jpg';

export default function MentalHealth() {

    return (
        <div className="myy-3">
            <div className="carousel-boxing">
                <div className="carousel-containering">

                    <Carousel>
                        <Carousel.Item>
                            <Link to="/Stress">
                                <img
                                    className="d-block carousel-image"
                                    src={imgg8}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>Stess Managament</h3>
                                    <p>Relaxing is neccessary</p>
                                  
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                        {/* <Carousel.Item>
                            <Link to="/Sleep">
                                <img
                                    className="d-block carousel-image"
                                    src={imgg9}
                                    alt="Second slide"
                                />
                                <Carousel.Caption>
                                    <h3>Sleep </h3>
                                    <p>Learn how to sleep better.</p>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Link to="/Mood">
                                <img
                                    className="d-block carousel-image"
                                    src={imgg9}
                                    alt="Second slide"
                                />
                                <Carousel.Caption>
                                    <h3>Mood</h3>
                                    <p>We can help improve your mood.</p>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item> */}
                    </Carousel>
                </div>
            </div>
        </div>

    );
}