import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

const UserTrainer = ({ user_id }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trainerData, setTrainerData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/${encodeURIComponent(user_id)}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTrainerData(data.trainer);
                setUserData(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Box 
            sx={{ 
                backgroundColor: '#efe1bced', 
                //width
                width: '50%',
                //center the box
                margin: 'auto',
                padding: 3, 
                borderRadius: 2, 
                boxShadow: 2, 
                marginTop: 15 
            }}
        >
            <h1>Meet Your Trainer</h1>
            {trainerData ? (
                <div>
                    <p><strong>Name:</strong> {trainerData.trainerName}</p>
                    <p><strong>Email:</strong> <a href={`mailto:${trainerData.trainerEmail}`}>{trainerData.trainerEmail}</a></p>
                    <p><strong>Phone:</strong> <a href={`tel:${trainerData.trainerPhone}`}>{trainerData.trainerPhone}</a></p>
                    <p>If you have any questions or need assistance, feel free to reach out to your trainer using the contact details above.</p>
                </div>
            ) : (
                <p>No trainer information available at the moment.</p>
            )}
        </Box>
    );
};

UserTrainer.propTypes = {
    user_id: PropTypes.string.isRequired,
};

export default UserTrainer;
