import React, { useState } from 'react';
import { Container, Typography, Box, Slider, Button, Radio, RadioGroup, FormControlLabel, FormControl, TextField } from '@mui/material';

function Stress(props) {
  const [responses, setResponses] = useState({});

  const questions = [
    { id: 1, type: 'yesno', question: 'Do you experience frequent mood swings?', explanation: 'This question is about your emotional stability and mood changes.' },
    { id: 2, type: 'yesno', question: 'Do you feel overwhelmed by emotions or situations regularly?', explanation: 'This question is about how often you feel overwhelmed by emotions or situations.' },
    { id: 3, type: 'yesno', question: 'Have you lost interest in activities you used to enjoy?', explanation: 'This question is about your interest in activities you previously enjoyed.' },
    { id: 4, type: 'yesno', question: 'Are there specific events or situations that trigger your anxiety?', explanation: 'This question is about identifying triggers for your anxiety.' },
    { id: 5, type: 'yesno', question: 'Do you feel like you can manage your stress effectively?', explanation: 'This question is about your ability to manage stress.' },
    { id: 6, type: 'yesno', question: 'Have you noticed any physical symptoms, like headaches or fatigue, when you\'re stressed?', explanation: 'This question is about physical symptoms related to stress.' },
    { id: 7, type: 'yesno', question: 'Do you usually get enough sleep at night?', explanation: 'This question is about your sleep patterns and quality.' },
    { id: 8, type: 'yesno', question: 'Do you have someone you trust to talk to about personal matters?', explanation: 'This question is about your social support system.' },
    { id: 9, type: 'yesno', question: 'Do you feel fulfilled by your work, studies, or daily activities?', explanation: 'This question is about your fulfillment from work, studies, or daily activities.' },
    { id: 10, type: 'yesno', question: 'Do you believe your physical health impacts your mental well-being?', explanation: 'This question is about the impact of physical health on mental well-being.' },
    { id: 11, type: 'yesno', question: 'How do you usually cope with challenges or setbacks?', explanation: 'This question is about your coping mechanisms for challenges or setbacks.' },
    { id: 12, type: 'yesno', question: 'Do you have activities or hobbies that help you relax?', explanation: 'This question is about activities or hobbies that help you relax.' },
    { id: 13, type: 'slider', question: 'How often do you feel happy or content in your daily life?', explanation: 'This question is about your overall happiness and contentment.' },
    { id: 14, type: 'slider', question: 'How often do you feel stressed or anxious?', explanation: 'This question is about your levels of stress and anxiety.' },
    { id: 15, type: 'slider', question: 'How often do you wake up feeling refreshed and rested?', explanation: 'This question is about how often you feel refreshed and rested after sleep.' },
    { id: 16, type: 'slider', question: 'How often do you feel lonely or isolated?', explanation: 'This question is about your feelings of loneliness or isolation.' },
    { id: 17, type: 'slider', question: 'How satisfied are you with your current social relationships?', explanation: 'This question is about your satisfaction with your social relationships.' },
    { id: 18, type: 'slider', question: 'How often do you feel overburdened by your responsibilities?', explanation: 'This question is about how often you feel overburdened by responsibilities.' },
    { id: 19, type: 'slider', question: 'How often do you engage in physical activities or exercise?', explanation: 'This question is about your engagement in physical activities or exercise.' },
    { id: 20, type: 'slider', question: 'Do you feel hopeful and optimistic about your future?', explanation: 'This question is about your outlook on the future.' },
  ];

  const handleSliderChange = (id) => (event, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const handleYesNoChange = (id) => (event) => {
    setResponses({ ...responses, [id]: event.target.value });
  };

  const handleHoursChange = (id) => (event) => {
    setResponses({ ...responses, [id]: event.target.value });
  };

  const handleSubmit = () => {
    console.log('User responses:', responses);
    alert('Thank you for completing the questionnaire!');
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'slider':
        return (
          <Box sx={{ mb: 4, width: '100%', backgroundColor: '#c5d7e2', p: 2, borderRadius: 2 }} key={question.id}>
            <Typography variant="h6">{question.question}</Typography>
            <Slider
              value={responses[question.id] || 3}
              onChange={handleSliderChange(question.id)}
              step={1}
              marks={[
                { value: 1, label: 'Never' },
                { value: 2, label: 'Less' },
                { value: 3, label: 'Often' },
                { value: 4, label: 'Very Often' },
                { value: 5, label: 'Always' },
              ]}
              min={1}
              max={5}
              valueLabelDisplay="auto"
            />
          </Box>
        );
      case 'yesno':
        return (
          <Box sx={{ mb: 4, width: '100%', backgroundColor: '#c5d7e2', p: 2, borderRadius: 2 }} key={question.id}>
            <Typography variant="h6">{question.question}</Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={responses[question.id] || ''}
                onChange={handleYesNoChange(question.id)}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 'hours':
        return (
          <Box sx={{ mb: 4, width: '100%', backgroundColor: '#c5d7e2', p: 2, borderRadius: 2 }} key={question.id}>
            <Typography variant="h6">{question.question}</Typography>
            <TextField
              type="number"
              value={responses[question.id] || ''}
              onChange={handleHoursChange(question.id)}
              inputProps={{ min: 0 }}
            />
          </Box>
        );
      default:
        return null;
    }
  };

  const renderExplanation = (question) => {
    switch (question.type) {
      case 'slider':
        return (
          <Box sx={{ mb: 4, backgroundColor: '#cfcdeb;', p: 2, borderRadius: 2 }} key={question.id}>
            <Typography variant="body1">1 - Never</Typography>
            <Typography variant="body1">2 - Less</Typography>
            <Typography variant="body1">3 - Often</Typography>
            <Typography variant="body1">4 - Very Often</Typography>
            <Typography variant="body1">5 - Always</Typography>
          </Box>
        );
      default:
        return (
          <Box sx={{ mb: 4, backgroundColor: '#cfcdeb;', p: 2, borderRadius: 2 }} key={question.id}>
            <Typography variant="body2">{question.explanation}</Typography>
          </Box>
        );
    }
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 5, backgroundColor:'#d5d6de91'}}>
        <Box sx={{ mb: 4, backgroundColor: '#e5e1e8f2', p: 2, borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom>
            Assess Your Stress Level
          </Typography>
        </Box>
        <div className="row">
          <Box sx={{ flex: 1, pr: 2 }}>
            <Typography variant="h6" gutterBottom>
              Questions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Explanations
            </Typography>
            {questions.map((question) => (
              <div className="row" key={question.id}>
                <Box sx={{ flex: 1 }}>
                  {renderQuestion(question)}
                </Box>
                <Box sx={{ flex: 1 }}>
                  {renderExplanation(question)}
                </Box>
              </div>
            ))}
          </Box>
        </div>
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2, mb:5 }}>
          Submit
        </Button>
      </Container>
    </div>
  );
}

export default Stress;