import React, { useState } from 'react';
import { Container, Typography, Box, Slider, Button, Radio, RadioGroup, FormControlLabel, FormControl, TextField } from '@mui/material';

function Stress(props) {


  const [responses, setResponses] = useState({
    13: 3, // Initial value for question 13 (slider)
    14: 3, // Initial value for question 14 (slider)
    15: 3, // Initial value for question 15 (slider)
    16: 3, // Initial value for question 16 (slider)
    17: 3, // Initial value for question 17 (slider)
    18: 3, // Initial value for question 18 (slider)
    19: 3, // Initial value for question 19 (slider)
    20: 3, // Initial value for question 20 (slider)
  });
  const [feedback, setFeedback] = useState('');

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
    { id: 11, type: 'yesno', question: 'Do you often find yourself ruminating on past events or future worries?', explanation: 'This addresses tendencies that can trigger anxiety or stress' },
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

    setResponses({ ...responses, [id]: value }); //... represents the spread operator , which is used to copy the object and then update the value of the key
  };

  const handleYesNoChange = (id) => (event) => {
    setResponses({ ...responses, [id]: event.target.value });
  };

  const handleHoursChange = (id) => (event) => {
    setResponses({ ...responses, [id]: event.target.value });
  };

  const handleClear = () => {
    setResponses({});
    setFeedback('');
  };

  const handleSubmit = async () => {

    //check if every question has been answered

    // for (let i = 1; i <= 20; i++) {
    //   if (responses[i] === undefined) {
    //     alert('Please answer all the questions');
    //     return;
    //   }
    // }
    alert('Thank you for completing the questionnaire!');

    try {
      const questionAndAnswers = questions.map((question) => ({
        question: question.question,
        answer: responses[question.id] !== undefined ? responses[question.id] : "", // Ensure there is an answer (use empty string if none)
      }));

      await fetch('http://localhost:8080/api/mentalhealth/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionAndAnswers),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text(); // Extract the result
        })
        .then((result) => {
          console.log(result); // Logs "Your stress level is moderate. ..."
          setFeedback(result); // Update your state or UI with the result
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Error:", error);
    }
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

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box
          sx={{
            mb: 4,
            borderRadius: '8px',
            border: '1px solid #ddd',
            p: 3,
            backgroundColor: '#f9f9f9d4',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Stress Assessment - Explanation & User Requirements
          </Typography>
          <Box sx={{ mb: 4 }}>
            <Typography variant="body1" gutterBottom>
              <strong>How Your Score is Determined:</strong>
            </Typography>
            <Typography variant="body2" paragraph>
              Your responses will be used to evaluate your stress levels and mental well-being. Based on the answers provided, you will receive feedback on whether you are experiencing low, moderate, or high stress.
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Low Stress:</strong> A balanced mental state with effective coping mechanisms.(&lt; 20 points)
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Moderate Stress:</strong> Areas where stress management might help improve well-being.(20-40 points)
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>High Stress:</strong> Potentially high stress that may require professional advice.(40 points &lt;)
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" gutterBottom>
              <strong>User Requirements:</strong>
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Honest Answers:</strong> Please respond truthfully to each question. The assessment is designed to reflect your current state.
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Complete the Form:</strong> Make sure to answer all questions for an accurate evaluation.
            </Typography>
            <Typography variant="body2" paragraph>
              <strong>Feedback:</strong> After submitting the form, you'll receive personalized feedback. Please note that this is not a clinical diagnosis but a guide to understanding your stress levels and well-being.
            </Typography>
          </Box>
        </Box>
      </Container>


      <Container maxWidth="lg" sx={{ mt: 5, backgroundColor: '#faebd7cc', borderRadius: 3 }}>
        <Box sx={{ mt: 4, mb: 3, backgroundColor: '#e5e1e8f2', p: 2, borderRadius: 3 }}>
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
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2, mb: 5 }}>
          Submit
        </Button>

        <Button variant="contained" color="warning" onClick={handleClear} sx={{ mt: 2, mb: 5, ml: 3 }}>
          Clear
        </Button>

      </Container>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Box
          sx={{
            mb: 4,
            borderRadius: '8px',
            border: '1px solid #ddd',
            p: 3,
            backgroundColor: '#f9f9f9'
          }}
        >
          <Typography variant="h5" gutterBottom>
            Feedback
          </Typography>
        </Box>
        <Box
          sx={{
            mb: 4,
            borderRadius: '8px',
            border: '1px solid #ddd',
            p: 3,
            backgroundColor: '#f9f9f9'
          }}
        >
          <Typography variant="body1">{feedback}</Typography>
        </Box>
      </Container>
    </div>



  );
}

export default Stress;