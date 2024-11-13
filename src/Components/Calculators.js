import React from 'react';
import CalculatorCard from './CalculatorCard'; // Import the CalculatorCard component
import './MainMenuCard.css'; // Import the CSS file
import './Calculator.css'; // Import the CSS file

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
          bc_color: '#ffffff4f'
      },
      {
          title: 'BMR Calculator',
          description: 'Calculate BMR',
          image: imgg6,
          link:'/BMR',
          bc_color: '#ffffff4f'
      },
      {
          title: 'Calorie Intake',
          description: 'Calculate daily calorie intake',
          image: imgg7,
          link:'/CalorieIntake',
          bc_color: '#ffffff4f'
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