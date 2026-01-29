"use client";

import * as React from "react";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const tracks = [
  "Best Overall",
  "Most Innovative",
  "Best AI",
  "Best Design",
  "Best First-Time",
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
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: {
            xs: "2rem",
            sm: "4rem",
            md: "5rem",
            lg: "8rem",
            xl: "10rem",
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
              xs: "1.8rem",
              sm: "2.5rem",
              md: "3.5rem",
              lg: "5rem",
              xl: "6rem",
            },
            color: "black",
            pl: { xs: "0.5rem", sm: "1rem", md: "1.5rem", lg: "3rem" },
            mt: {
              xs: "-2.2rem",
              sm: "-3rem",
              md: "-4.5rem",
              lg: "-6rem",
              xl: "-7rem",
            },
          }}
        >
          Tracks
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#35a0c7",
              borderRadius: "8px",
              width: { xs: "65%", sm: "60%", md: "55%", lg: "50%" },
              height: "auto",
              aspectRatio: "2 / 1",
              minHeight: { xs: "120px", sm: "150px", md: "200px", lg: "250px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              p: 1,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: { xs: "0.75em", sm: "1em", md: "1.25em", lg: "1.5em" },
                display: "flex",
                gap: { xs: "0.75rem", sm: "1rem", md: "1.25rem", lg: "1.5rem" },
                justifyContent: "center",
              }}
            >
              {tracks.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => handleDotClick(index)}
                  sx={{
                    width: { xs: "8px", sm: "10px", md: "12px" },
                    height: { xs: "8px", sm: "10px", md: "12px" },
                    borderRadius: "50%",
                    backgroundColor:
                      index === currentTrack ? "#2670ad" : "#E0E0E0",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor:
                        index === currentTrack ? "#2670ad" : "#BDBDBD",
                    },
                  }}
                />
              ))}
            </Box>

            <IconButton
              onClick={handlePrevious}
              disableRipple
              sx={{
                position: "absolute",
                left: { xs: "0.25rem", sm: "0.5rem" },
                color: "black",
                padding: { xs: "0.25rem", sm: "0.5rem", md: "0.75rem" },
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.7,
                },
                "&:focus": {
                  outline: "none",
                },
                "& svg": {
                  fontSize: {
                    xs: "1rem",
                    sm: "1.5rem",
                    md: "2rem",
                    lg: "2.5rem",
                  },
                },
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>

            <Typography
              sx={{
                fontFamily: "var(--font-libre-baskerville)",
                fontWeight: 700,
                fontSize: {
                  xs: "clamp(1.6rem, 4vw, 2rem)",
                  sm: "clamp(2rem, 5vw, 2.6rem)",
                  md: "clamp(2.6rem, 5.5vw, 3rem)",
                  lg: "clamp(3rem, 6vw, 3.5rem)",
                },
                color: "black",
                textAlign: "center",
                px: { xs: "2rem", sm: "3rem", md: "4rem" },
              }}
            >
              {tracks[currentTrack]}
            </Typography>

            <IconButton
              onClick={handleNext}
              disableRipple
              sx={{
                position: "absolute",
                right: { xs: "0.25rem", sm: "0.5rem" },
                color: "black",
                padding: { xs: "0.25rem", sm: "0.5rem", md: "0.75rem" },
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.7,
                },
                "&:focus": {
                  outline: "none",
                },
                "& svg": {
                  fontSize: {
                    xs: "1rem",
                    sm: "1.5rem",
                    md: "2rem",
                    lg: "2.5rem",
                  },
                },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Tracks;
