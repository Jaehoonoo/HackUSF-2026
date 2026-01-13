'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function About() {
  return (
    <Box
      component="section"
      id="about"
      sx={{
        padding: { xs: '4rem 1rem', md: '6rem 2rem' },
        backgroundColor: 'transparent',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: '3rem', md: '0' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: { xs: 'center', md: 'space-between' },
          }}
        >
          <Box
            sx={{
              flex: { xs: '1', md: '0 0 auto' },
              textAlign: { xs: 'center', md: 'left' },
              maxWidth: { xs: '100%', md: '45%' },
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontFamily: 'var(--font-cinzel-bold)',
                fontWeight: 700,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                color: 'black',
                mb: '2rem',
              }}
            >
              ABOUT
            </Typography>
            <Typography
              sx={{
                fontFamily: 'var(--font-cinzel-bold)',
                fontWeight: 700,
                fontSize: { xs: '0.9rem', md: '1rem' },
                color: 'black',
                lineHeight: 1.6,
                maxWidth: '600px',
                mx: { xs: 'auto', md: '0' },
              }}
            >
              THE GOOGLE DEVELOPER GROUP AT USF IS HOSTING ITS 24-HOUR HACKATHON, BRINGING STUDENTS FROM ALL UNIVERSITIES TOGETHER TO INNOVATE, BUILD, AND COMPETE.
            </Typography>
          </Box>

          <Box
            sx={{
              flex: { xs: '1', md: '0 0 auto' },
              textAlign: { xs: 'center', md: 'right' },
              maxWidth: { xs: '100%', md: '45%' },
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontFamily: 'var(--font-cinzel-bold)',
                fontWeight: 700,
                fontSize: { xs: '1.75rem', md: '2.5rem' },
                color: 'black',
                mb: '2rem',
              }}
            >
              STATS
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                  gap: { xs: '1.5rem', md: '3rem' },
                  justifyContent: { xs: 'center', md: 'flex-end' },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'var(--font-cinzel-bold)',
                    fontWeight: 700,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    color: 'black',
                  }}
                >
                  24 HOURS
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'var(--font-cinzel-bold)',
                    fontWeight: 700,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    color: 'black',
                  }}
                >
                  220+ PARTICIPANTS
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-end' },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'var(--font-cinzel-bold)',
                    fontWeight: 700,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    color: 'black',
                  }}
                >
                  $8,000 IN PRIZES
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default About;

