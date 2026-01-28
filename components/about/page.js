"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";

function About() {
  return (
    <Box
      component="section"
      id="about"
      sx={{
        padding: {
          xs: "clamp(2rem, 5vh, 4rem) clamp(0.5rem, 2vw, 2rem)",
          md: "clamp(4rem, 8vh, 8rem) clamp(1rem, 3vw, 3rem)",
        },
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          width: "100%",
          p: { xs: "clamp(1rem, 3vh, 3rem)", md: "clamp(2rem, 5vh, 6rem)" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: "clamp(1.5rem, 4vh, 3rem)", md: "clamp(0, 5vw, 3rem)" },
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: { xs: "center", md: "space-between" },
          }}
        >
          <Box
            sx={{
              flex: { xs: "1", md: "0 0 auto" },
              textAlign: { xs: "center", md: "left" },
              maxWidth: { xs: "100%", md: "45%" },
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontFamily: "var(--font-cinzel-bold)",
                fontWeight: 700,
                fontSize: {
                  xs: "clamp(1.5rem, 5vw, 4rem)",
                  md: "clamp(2rem, 6vw, 4rem)",
                },
                color: "white",
                mb: "2rem",
              }}
            >
              ABOUT
            </Typography>
            <Typography
              sx={{
                fontFamily: "var(--font-libre-baskerville)",
                fontWeight: 400,
                fontSize: {
                  xs: "clamp(0.8rem, 2.5vw, 1.2rem)",
                  md: "clamp(1rem, 3vw, 1.8rem)",
                },
                color: "white",
                lineHeight: 1.6,
                maxWidth: "500px",
                mx: { xs: "auto", md: "0" },
              }}
            >
              The Google Developer Group at USF is hosting its 24-hour
              hackathon, bringing students from all universities together to
              innovate, build, and compete.
            </Typography>
          </Box>

          <Box
            sx={{
              flex: { xs: "1", md: "0 0 auto" },
              textAlign: { xs: "center", md: "right" },
              maxWidth: { xs: "100%", md: "45%" },
              mt: {
                xs: "clamp(1rem, 5vh, 4rem)",
                md: "clamp(2rem, 15vh, 30rem)",
              },
            }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontFamily: "var(--font-cinzel-bold)",
                fontWeight: 700,
                fontSize: {
                  xs: "clamp(1.5rem, 5vw, 2.5rem)",
                  md: "clamp(1.75rem, 4vw, 2.5rem)",
                },
                color: "white",
                mb: "2rem",
              }}
            >
              HackUSF 2025
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: { xs: "1.5rem", md: "3rem" },
                  justifyContent: { xs: "center", md: "flex-end" },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "var(--font-libre-baskerville)",
                    fontWeight: 700,
                    fontSize: {
                      xs: "clamp(0.9rem, 2.5vw, 1.3rem)",
                      md: "clamp(1rem, 3vw, 2rem)",
                    },
                    color: "white",
                  }}
                >
                  24 Hours
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "var(--font-libre-baskerville)",
                    fontWeight: 700,
                    fontSize: {
                      xs: "clamp(0.9rem, 2.5vw, 1.3rem)",
                      md: "clamp(1rem, 3vw, 2rem)",
                    },
                    color: "white",
                  }}
                >
                  220+ Participants
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-end" },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "var(--font-libre-baskerville)",
                    fontWeight: 700,
                    fontSize: {
                      xs: "clamp(0.9rem, 2.5vw, 1.3rem)",
                      md: "clamp(1rem, 3vw, 2rem)",
                    },
                    color: "white",
                  }}
                >
                  $3,000 In Prizes
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default About;
