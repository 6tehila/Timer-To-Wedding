import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import '@fortawesome/fontawesome-free/css/all.min.css';

const CountdownTimer = () => {
  const initialTime = {
    days: 46,
    hours: 4,
    minutes: 20,
    seconds: 24
  };

  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => {
        const { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        } else if (minutes > 0) {
          return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        } else if (hours > 0) {
          return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 };
        } else if (days > 0) {
          return { ...prevTime, days: days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          clearInterval(timerInterval);
          return prevTime;
        }
      });
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
        bgcolor: 'rgba(0, 0, 0, 0.5)', // שכבת כהות על התמונה
        backgroundBlendMode: 'darken',
        position: 'relative'
      }}
    >
      {/* כיתוב A&E ו-Wedding במרכז למעלה */}
      <Box sx={{ position: 'absolute', top: '20px', textAlign: 'center', width: '100%' }}>
        <Typography variant="h1" component="div" color="white" sx={{ fontFamily: 'Gabriola', marginBottom: '4px' }}>
          A & E
        </Typography>
        <Typography variant="h3" component="div" color="white" sx={{ fontFamily: 'Gabriola' }}>
          wedding
        </Typography>
      </Box>

      {/* טיימר */}
      <Paper elevation={3} sx={{ padding: 3, textAlign: 'center', opacity: 0.7, backgroundColor: 'rgba(255, 255, 255, 0.6)', width: '60%', position: 'absolute', bottom: '30px' }}>
        <Grid container spacing={2} direction="row-reverse" justifyContent="center">
          {[
            { label: 'ימים', value: time.days },
            { label: 'שעות', value: time.hours },
            { label: 'דקות', value: time.minutes },
            { label: 'שניות', value: time.seconds }
          ].map((item, index) => (
            <Grid item key={index} xs={3}>
              <Typography variant="h3" component="div" color="black"> {/* הגדלנו ל-h3 ושמנו צבע שחור */}
                {String(item.value).padStart(2, '0')}
              </Typography>
              <Typography variant="h6" component="div" color="black"> {/* שמנו גם את הכיתוב בשחור */}
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
