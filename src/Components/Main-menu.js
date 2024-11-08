import React from 'react';
import MainMenuCard from './MainMenuCard'; // Import the MainMenuCard component
import './MainMenuCard.css'; // Import the CSS file
import imgg from '../Images/plan.jpg';
import imgg2 from '../Images/Diet_plan.jpg';
import imgg3 from '../Images/Mental.jpg';
import imgg4 from '../Images/cardimg1.jpg';


export default function ActionAreaCard() {
    const cardsData = [
        {
            title: 'Set Your Workout Plan',
            description: 'Create a workout plan that suits your needs and goals.',
            image: imgg,
            link:'/WorkoutPlan'
        },
        {
            title: 'Diet Plan',
            description: 'Create a diet plan that suits your needs and goals.',
            image: imgg2,
            link:'/DietPlan'
        },
        {
            title: 'Mental Health',
            description: 'Mental health is just as important as physical health.',
            image: imgg3,
            link:'/MentalHealth'
        },
    ];

    return (
        <div className="container my-3 center-container">
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
    );
}