"use client";

import * as React from "react";
import { Box, Typography, Modal } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";

const tracks = [
  {
    name: "Best Overall",
    description:
      "This award goes to the project that demonstrates the best combination of technical excellence, innovation, design, and overall impact. It represents the pinnacle of achievement at HackUSF.",
  },
  {
    name: "Most Innovative",
    description:
      "Recognizing projects that push boundaries and introduce novel ideas or unique approaches to solving problems. This track celebrates creativity and original thinking.",
  },
  {
    name: "Best AI",
    description:
      "Awarded to projects that make exceptional use of artificial intelligence technologies to create intelligent, adaptive, and impactful solutions.",
  },
  {
    name: "Best Design",
    description:
      "This category honors projects with outstanding user interface, user experience, and visual design. It celebrates aesthetics, usability, and attention to detail.",
  },
  {
    name: "Best Beginner",
    description:
      "Dedicated to first-time hackathon participants who demonstrate exceptional potential and achievement. This track encourages newcomers and celebrates their fresh perspectives.",
  },
];

function Tracks() {
  const [currentTrack, setCurrentTrack] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);

  const handlePrevious = () => {
    setCurrentTrack((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentTrack((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentTrack(index);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      component="section"
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
          id="tracks"
          sx={{
            fontFamily: "var(--font-cinzel-bold)",
            fontWeight: 700,
            fontSize: {
              xs: "1.7rem",
              sm: "2.5rem",
              md: "3.5rem",
              lg: "5rem",
              xl: "6rem",
            },
            color: "#261b25",
            pl: { xs: "0.5rem", sm: "1rem", md: "1.5rem", lg: "3rem" },
            mt: {
              xs: "-2.1rem",
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
              bgcolor: "#cdc5b5",
              border: {
                xs: "3px solid #261b25",
                sm: "4px solid #261b25",
                md: "6px solid #261b25",
              },
              borderRadius: "12px",
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
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
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
                      index === currentTrack ? "#261b25" : "#E0E0E0",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor:
                        index === currentTrack ? "#261b25" : "#BDBDBD",
                    },
                  }}
                />
              ))}
            </Box>

            {/* Left arrow zone - full height */}
            <Box
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              sx={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: { xs: "12%", sm: "12%", md: "12%", lg: "12%" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 2,
                borderRadius: "12px 0 0 12px",
                transition: "background-color 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(38, 27, 37, 0.1)",
                },
              }}
            >
              <ArrowBackIosIcon
                sx={{
                  color: "#261b25",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3rem",
                  },
                }}
              />
            </Box>

            {/* Center clickable area for modal */}
            <Box
              onClick={handleOpenModal}
              sx={{
                position: "absolute",
                left: "12%",
                right: "12%",
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s ease-in-out",
                zIndex: 1,
                "&:hover": {
                  transform: "scale(1.02)",
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "var(--font-cinzel-bold)",
                  fontWeight: 700,
                  fontSize: {
                    xs: "clamp(1.6rem, 4vw, 2rem)",
                    sm: "clamp(2rem, 5vw, 2.6rem)",
                    md: "clamp(2.6rem, 5.5vw, 3rem)",
                    lg: "clamp(3rem, 6vw, 3.5rem)",
                  },
                  color: "#261b25",
                  textAlign: "center",
                  px: { xs: "2rem", sm: "3rem", md: "4rem" },
                }}
              >
                {tracks[currentTrack].name}
              </Typography>
            </Box>

            {/* Right arrow zone - full height */}
            <Box
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              sx={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: { xs: "12%", sm: "12%", md: "12%", lg: "12%" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 2,
                borderRadius: "0 12px 12px 0",
                transition: "background-color 0.2s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(38, 27, 37, 0.1)",
                },
              }}
            >
              <ArrowForwardIosIcon
                sx={{
                  color: "#261b25",
                  fontSize: {
                    xs: "1.5rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3rem",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Modal */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
              maxWidth: "600px",
              bgcolor: "#cdc5b5",
              borderRadius: "12px",
              boxShadow: 24,
              p: { xs: 4, sm: 6, md: 8 },
              outline: "none",
              border: {
                xs: "3px solid #261b25",
                sm: "4px solid #261b25",
                md: "6px solid #261b25",
              },
            }}
          >
            <IconButton
              onClick={handleCloseModal}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                color: "#261b25",
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography
              sx={{
                fontFamily: "var(--font-cinzel-bold)",
                fontWeight: 700,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                color: "#261b25",
                mb: 2,
                pr: 4,
              }}
            >
              {tracks[currentTrack].name}
            </Typography>

            <Typography
              sx={{
                fontFamily: "var(--font-libre-baskerville)",
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
                color: "#261b25",
                lineHeight: 1.6,
              }}
            >
              {tracks[currentTrack].description}
            </Typography>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}

export default Tracks;
