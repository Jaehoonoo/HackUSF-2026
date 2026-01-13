'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const tracks = [
  'BEST OVERALL',
  'BEST AI',
  'BEST DESIGN',
  'BEST FIRST-TIME',
  'FUNNIEST',
];

function Tracks() {
  const [currentTrack, setCurrentTrack] = React.useState(0);

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentTrack(index);
  };

  return (
    <Box
      component="section"
      id="tracks"
      sx={{
        padding: { xs: '4rem 1rem', md: '6rem 2rem' },
        backgroundColor: 'transparent',
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontFamily: 'var(--font-cinzel-bold)',
            fontWeight: 700,
            fontSize: { xs: '1.75rem', md: '2.5rem' },
            color: 'black',
            mb: '3rem',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          TRACKS
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          
          <Box
            sx={{
              backgroundColor: '#C8E6C9',
              borderRadius: '8px',
              padding: { xs: '2rem 1.5rem', md: '3rem 2rem' },
              minWidth: { xs: '250px', md: '400px' },
              maxWidth: { xs: '300px', md: '500px' },
              minHeight: { xs: '150px', md: '200px' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            
            <Box
              sx={{
                position: 'absolute',
                top: '1rem',
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
              }}
            >
              {tracks.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => handleDotClick(index)}
                  sx={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: index === currentTrack ? '#FFD54F' : '#E0E0E0',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    '&:hover': {
                      backgroundColor: index === currentTrack ? '#FFD54F' : '#BDBDBD',
                    },
                  }}
                />
              ))}
            </Box>

            
            <IconButton
              onClick={handlePrevious}
              disableRipple
              sx={{
                position: 'absolute',
                left: '0.5rem',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'transparent',
                  opacity: 0.7,
                },
                '&:focus': {
                  outline: 'none',
                },
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>

            
            <Typography
              sx={{
                fontFamily: 'var(--font-cinzel-bold)',
                fontWeight: 700,
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                color: 'black',
                textAlign: 'center',
              }}
            >
              {tracks[currentTrack]}
            </Typography>

            
            <IconButton
              onClick={handleNext}
              disableRipple
              sx={{
                position: 'absolute',
                right: '0.5rem',
                color: 'black',
                '&:hover': {
                  backgroundColor: 'transparent',
                  opacity: 0.7,
                },
                '&:focus': {
                  outline: 'none',
                },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Tracks;
