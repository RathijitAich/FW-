import React from 'react';
import PropTypes from 'prop-types';
import { Container, Box, Grid, Card, CardContent, Typography, CardMedia } from '@mui/material';
import { Link } from 'react-router-dom';


const games = [
  { title: 'Journey', description: 'Journey is a visually stunning, meditative game where players traverse a vast desert and explore beautiful environments. It’s peaceful and offers a simple experience focused on exploration and reflection.', image: 'https://i0.wp.com/hypercritical.co/2012/11/27/images/journey.jpg?resize=681%2C383', link: 'https://thatgamecompany.com/journey/' },
  { title: 'Stardew Valley', description: 'A charming farming simulator where you can plant crops, care for animals, and build relationships with townspeople. With no strict time limits, it’s easy to get lost in the peaceful routines of village life.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3Ts_t-70thpwQsSq94bfGfoK2Y6hrQ4mZBg&s', link: 'https://store.steampowered.com/app/413150/Stardew_Valley/y' },
  { title: 'Animal Crossing: New Horizons', description: 'In this life simulation game, players can design their own island, decorate their house, and befriend animal neighbors. The game progresses in real-time, encouraging a slow, relaxing experience.', image: 'https://assets.nintendo.com/image/upload/dpr_auto/q_auto/f_auto/c_pad,w_336/ncom/en_US/articles/2024/mobilenews-create-your-ideal-campsite-in-animal-crossing-pocket-camp-complete-coming-soon/SMDP_ZAS_JPillu01_01_R_fix_NOA_1920x1080', link: 'https://animalcrossing.nintendo.com/' },
  { title: 'ABZÛ', description: 'ABZÛ lets you explore an underwater world as a diver. The game focuses on the beauty of ocean life, allowing you to swim with fish, uncover hidden secrets, and enjoy a tranquil underwater setting.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ1bgqHOMkcDeRdOj-f-_lkX-dWmC1DxIOGg&s', link: 'https://abzugame.com/' },
  { title: 'Flower', description: 'In Flower, you control the wind as it carries petals through various environments. The goal is simply to experience the calming effect of nature as you restore color to the world.', image: 'https://annapurnainteractive.com/media/pages/games/flower/6f02225d12-1671338326/flower-epic-pdppromo-1920x-q80.jpg', link: 'https://thatgamecompany.com/flower/' },
  { title: 'Monument Valley', description: 'This puzzle game features beautifully designed, Escher-inspired landscapes where you guide a character through serene, mind-bending environments. The music and visuals create a relaxing, immersive experience.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuyp6Ejcsq4pSSFju_HCb7vAzluWLemSsNmw&s', link: 'https://www.monumentvalleygame.com/mv3' },
];

const stressExercises = [
    { title: 'Deep Breathing Exercise', description: 'Take a slow, deep breath in through your nose for a count of 4, hold it for 4, and then exhale slowly through your mouth for a count of 6. Repeat for a few minutes.',image:'https://www.fitpaa.com/wp-content/uploads/2023/11/Untitled-design-2023-11-23T173326.193-jpg.webp', link: 'https://www.webmd.com/balance/stress-management/stress-relief-breathing-techniques' },
    { title: 'Progressive Muscle Relaxation (PMR)', description: 'Start at your toes and work your way up, tensing each muscle group for a few seconds and then relaxing.',image:'https://media.istockphoto.com/id/1391447935/vector/progressive-muscle-relaxation-concept-icon.jpg?s=612x612&w=0&k=20&c=u2_UhZBHkOZ-45iX36-U47qDmQXEqPDnHKA54u8_5nQ=', link:'https://www.healthline.com/health/progressive-muscle-relaxation'},
    { title: 'Mindful Walking', description: 'Go for a short walk and focus on each step, noticing the feeling of your feet touching the ground, the sounds around you, and the rhythm of your breath.',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb3bafESdaUN7Hz0ECxp-qBWhF9KvamV-sIQ&s',link:'https://www.google.com/search?sca_esv=b42df3adfe0a751a&sxsrf=ADLYWIIVtFHkrBuikg5U3uAFYN4qPQT5zg:1731535426187&q=mindful+walking&source=lnms&fbs=AEQNm0A-2qeMemLzzt_2BVemHLFNuCSl5jMwuDXSDytcTb5xODqo_tJpGmaSU4pQVEbQQTDWnMPSk8wZNRhz5PGHQwbe9VGOsTvTC6PzQFjR3A55McI87gzvGpjAGq9Nm2Y19Am3ZfXn3nnrjEbsyiaTAyx5OlH9kfyofUfrh41ii7MJR49ai3I&sa=X&ved=2ahUKEwiTvPmPqNqJAxUH1zgGHWg_GuAQ0pQJegQIFBAB&biw=1536&bih=738&dpr=1.25' },
    { title: 'Guided Visualization', description: 'Close your eyes and imagine a peaceful place, like a beach or forest. Visualize every detail—the sounds, smells, and sensations.', image:'https://assets.clevelandclinic.org/transform/90536f2f-b026-4d28-a986-caa1259dbc9a/GuidedImagery-1255305082-770x533-1_jpg',link:'https://psychcentral.com/lib/guided-visualization-a-way-to-relax-reduce-stress-and-more' },
    { title: 'Yoga Poses for Relaxation', description: 'Try gentle poses like Child\'s Pose, Legs-Up-the-Wall, and Corpse Pose.',image:'https://blog.ana-heart.com/wp-content/uploads/2017/07/7-relaxing-yoga-poses-better-sleep.jpg',link:'https://www.yogajournal.com/poses/yoga-by-benefit/calm/yoga-poses-for-relaxation/'},
    { title: 'Box Breathing', description: 'Inhale for a count of 4, hold the breath for 4, exhale for 4, and hold again for 4 before the next inhale.',image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp6WfrqVOErX0P_nZ5uce0fwsZJnBwncreLA&s',link:'https://www.webmd.com/balance/what-is-box-breathing' },
  ];
  

  function Relax_stress(props) {
    return (
      <div className="my-3">
        <Container maxWidth="lg" sx={{ mt: 5 }}>
          <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, mb: 5 }}>
            <Typography variant="h5" gutterBottom>
             Seeking relaxation and stress relief? Check out these games and exercises to help you unwind.
            </Typography>
          </Box>
          <Box sx={{ mb: 5 }}>
            <Box sx={{ p: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#3f51b5' }}>
                Games
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {games.map((game, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Link to={game.link} style={{ textDecoration: 'none' }}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={game.image}
                        alt={game.title}
                      />
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {game.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {game.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box>
            <Box sx={{ p: 0.8, backgroundColor: '#e3f2fd', borderRadius: 2 }}>
              <Typography variant="h4" gutterBottom sx={{ color: '#3f51b5' }}>
                Stress Relief Exercises
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {stressExercises.map((exercise, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Link to={exercise.link} style={{ textDecoration: 'none' }}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={exercise.image}
                        alt={exercise.title}
                      />
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {exercise.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {exercise.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </div>
    );
  }
  
  Relax_stress.propTypes = {
    // Define any prop types if needed
  };
  
  export default Relax_stress;