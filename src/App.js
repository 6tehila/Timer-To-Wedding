import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CountdownTimer = () => {
  // תאריך יעד - תאריך החתונה שלך 
  const weddingDate = new Date('2025-03-02T18:30:00').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = weddingDate - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      // במידה והתאריך עבר
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  const [time, setTime] = useState(calculateTimeLeft());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: 'url(/images/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        backgroundBlendMode: 'darken',
        position: 'relative',
      }}
    >
      <Box sx={{ position: 'absolute', top: '20px', textAlign: 'center', width: '100%' }}>
        <Typography variant="h1" component="div" color="white" sx={{ fontFamily: 'Gabriola', marginBottom: '4px' }}>
          T & D
        </Typography>
        <Typography variant="h3" component="div" color="white" sx={{ fontFamily: 'Gabriola' }}>
          wedding
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', opacity: 0.7, backgroundColor: 'rgba(255, 255, 255, 0.6)', width: '60%', position: 'absolute', bottom: '30px' }}>
        <Grid container spacing={2} direction="row-reverse" justifyContent="center">
          {[
            { label: 'ימים', value: time.days },
            { label: 'שעות', value: time.hours },
            { label: 'דקות', value: time.minutes },
            { label: 'שניות', value: time.seconds }
          ].map((item, index) => (
            <Grid item key={index} xs={3}>
              <Typography variant="h3" component="div" color="black">
                {String(item.value).padStart(2, '0')}
              </Typography>
              <Typography variant="h6" component="div" color="black">
                {item.label}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default CountdownTimer;
