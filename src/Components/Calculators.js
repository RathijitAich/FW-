import React from 'react';
import CalculatorCard from './CalculatorCard'; // Import the CalculatorCard component
import './MainMenuCard.css'; // Import the CSS file


import imgg5 from '../Images/BMI.jpg';
import imgg6 from '../Images/BMR.jpg';
import imgg7 from '../Images/Calorie.jpg';




export default function ActionAreaCard() {
  const cardsData = [
      {
          title: 'BMI Calculator',
          description: 'Calculate BMI',
          image: imgg5,
          link:'/BMI',
          bc_color: '#faebd78f'
      },
      {
          title: 'Calorie That Day',
          description: 'Select foods and calculate calorie',
          image: imgg6,
          link:'/CalorieThatDay',
          bc_color: '#faebd78f'
      },
      {
          title: 'Calorie Intake',
          description: 'Calculate How much calorie you need everyday',
          image: imgg7,
          link:'/CalorieIntake',
          bc_color: '#faebd78f'
      },
  ];

  return (
    
      <div className="container my-3 center-container">
          <div className="row">
              {cardsData.map((card, index) => (
                  <div className="col-md-4" key={index}>
                      <CalculatorCard
                          title={card.title}
                          description={card.description}
                          image={card.image}
                          link={card.link}
                          bc_color={card.bc_color}
                      />
                  </div>
              ))}
          </div>
      </div>
  );
}