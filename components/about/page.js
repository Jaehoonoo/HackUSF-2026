"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";

function About() {
  const styles = {
    aboutTitle: {
      fontFamily: "var(--font-cinzel-bold)",
      fontWeight: 700,
      fontSize: {
        xs: "1.6rem",
        sm: "clamp(2rem, 6.5vw, 3.5rem)",
        md: "clamp(2rem, 6vw, 4rem)",
        lg: "4.2rem",
        xl: "6rem",
      },
      color: "white",
      mb: { xs: "0.1rem", md: "2rem" },
    },
    aboutBody: {
      fontFamily: "var(--font-libre-baskerville)",
      fontWeight: 400,
      fontSize: {
        xs: "clamp(0.58rem, 2.8vw, 1.5rem)",
        sm: "clamp(0.9rem, 2.5vw, 1.6rem)",
        md: "clamp(1rem, 2vw, 1.8rem)",
        lg: "1.8rem",
        xl: "2.2rem",
      },
      color: "white",
      lineHeight: 1.6,
    },
    statsTitle: {
      fontFamily: "var(--font-cinzel-bold)",
      fontWeight: 700,
      fontSize: {
        xs: "1.6rem",
        sm: "clamp(2rem, 6.5vw, 3.5rem)",
        md: "clamp(2rem, 6vw, 4rem)",
        lg: "4.2rem",
        xl: "6rem",
      },
      color: "white",
      mb: { xs: "0.8rem", md: "2rem", lg: "4rem" },
    },
    statValue: {
      fontFamily: "var(--font-libre-baskerville)",
      fontWeight: 700,
      fontSize: {
        xs: "clamp(0.8rem, 3.5vw, 2rem)",
        sm: "clamp(1rem, 3.5vw, 2.5rem)",
        md: "clamp(1rem, 3.5vw, 2.5rem)",
        lg: "clamp(1rem, 3.5vw, 2.5rem)",
        xl: "3rem",
      },
      color: "white",
    },
  };

  return (
    <Box
      component="section"
      id="about"
      sx={{
        backgroundColor: "transparent",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: { xs: "3rem", md: "2" },
            alignItems: { xs: "center", md: "flex-start" },
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              textAlign: { xs: "left", lg: "center" },
              width: { xs: "42%", md: "45%", lg: "40%" },
              mt: { xs: "8%", md: "8%", lg: "10%" },
              pl: { xs: "2%", md: "2%", lg: "2%", xl: "2%" },
              alignSelf: "flex-start",
            }}
          >
            <Typography variant="h2" component="h2" sx={styles.aboutTitle}>
              About
            </Typography>
            <Typography sx={styles.aboutBody}>
              The Google Developer Group at USF is hosting its 24-hour
              hackathon, bringing students from all universities together to
              innovate, build, and compete.
            </Typography>
          </Box>

          <Box
            sx={{
              textAlign: { xs: "right", lg: "center" },
              width: { xs: "45%", md: "45%" },
              mt: { xs: "36%", sm: "38%", md: "38%", lg: "36%", xl: "38%" },
              pl: {
                lg: "10%",
                xl: "8%",
              },
              pr: { xs: "2%", md: "4%", lg: 0 },
              alignSelf: "flex-start",
            }}
          >
            <Typography variant="h2" component="h2" sx={styles.statsTitle}>
              Statistics
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: { xs: "1rem", md: "2.4rem", lg: "3rem", xl: "4rem" },
              }}
            >
              <Typography sx={styles.statValue}>24 Hours</Typography>
              <Typography sx={styles.statValue}>200+ Hackers</Typography>
              <Typography sx={styles.statValue}>50+ Projects</Typography>
              <Typography sx={styles.statValue}>$6,000 Prizes</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default About;
