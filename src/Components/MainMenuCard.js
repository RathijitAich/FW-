import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import './MainMenuCard.css'; // Import the CSS file

const MainMenuCard = ({ title, description, image, link }) => {
    return (
        <Box className="main-menu-card">
            <Card sx={{ width: 350, height:400, marginBottom: '1rem', borderRadius: '15px', overflow: 'hidden' }}>
                <CardActionArea component={Link} to={link}>
                    <CardMedia
                        component="img"
                        height="290"
                        image={image}
                        alt={title}
                    />
                    <CardContent sx={{ backgroundColor: '#ffffff4f'}}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold',fontFamily: 'Roboto,sans-serif'  }}>
                            {title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
};

MainMenuCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
};

export default MainMenuCard;