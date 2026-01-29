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
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontFamily: "var(--font-cinzel-bold)",
            fontWeight: 700,
            fontSize: { xs: "1.75rem", md: "2.5rem" },
            color: "black",
          }}
        >
          Tracks
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#35a0c7",
              borderRadius: "8px",
              width: { xs: "80%", md: "50%" },
              height: { xs: "30vh", md: "55vh" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "1.75em",
                display: "flex",
                gap: "1.5rem",
                justifyContent: "center",
              }}
            >
              {tracks.map((_, index) => (
                <Box
                  key={index}
                  onClick={() => handleDotClick(index)}
                  sx={{
                    width: "12px",
                    height: "12px",
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
                left: "0.5rem",
                color: "black",
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.7,
                },
                "&:focus": {
                  outline: "none",
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
                  xs: "1.75rem",
                  sm: "2rem",
                  md: "2.5rem",
                  lg: "3rem",
                },
                color: "black",
                textAlign: "center",
              }}
            >
              {tracks[currentTrack]}
            </Typography>

            <IconButton
              onClick={handleNext}
              disableRipple
              sx={{
                position: "absolute",
                right: "0.5rem",
                color: "black",
                "&:hover": {
                  backgroundColor: "transparent",
                  opacity: 0.7,
                },
                "&:focus": {
                  outline: "none",
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
