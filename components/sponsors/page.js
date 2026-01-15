"use client";

import * as React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

// Bubble component - uses medium bubble image and scales it
const Bubble = ({ name, logo, size = 280, isMobile, sx = {} }) => {
  const actualSize = isMobile ? size * 0.60 : size;

  return (
    <Box
      sx={{
        width: actualSize,
        height: actualSize,
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
        ...sx,
      }}
    >
      <Image
        src="/images/sponsors/bubble-medium.png"
        alt=""
        fill
        sizes={`${actualSize}px`}
        style={{ objectFit: "contain" }}
        loading="lazy"
      />
      {logo ? (
        <Box
          sx={{
            width: "55%",
            height: "55%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            sizes={`${Math.round(actualSize * 0.55)}px`}
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </Box>
      ) : (
        <Typography
          sx={{
            fontFamily: "var(--font-cinzel-bold)",
            color: "black",
            fontSize: isMobile ? "0.9rem" : "1.2rem",
            textAlign: "center",
            px: 2,
            fontWeight: 700,
            zIndex: 1,
            maxWidth: "75%",
          }}
        >
          {name}
        </Typography>
      )}
    </Box>
  );
};

// Simple decorative bubble (no content, just the bubble image)
const DecorBubble = ({ size = 100, isMobile, sx = {} }) => {
  const actualSize = isMobile ? size * 0.65 : size;

  return (
    <Box
      sx={{
        width: actualSize,
        height: actualSize,
        position: "absolute",
        pointerEvents: "none",
        ...sx,
      }}
    >
      <Image
        src="/images/sponsors/bubble-medium.png"
        alt=""
        fill
        sizes={`${actualSize}px`}
        style={{ objectFit: "contain" }}
        loading="lazy"
      />
    </Box>
  );
};

function Sponsors() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="section"
      id="sponsors-partners"
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(to bottom, #385BB2 5%, #2D4A8C 50%, #1A2F5A 100%)",
        minHeight: { xs: "1200px", sm: "1300px", md: "1400px" },
        py: { xs: 4, md: 6 },
      }}
    >
      {/* Seahorse - right side */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: "-5%", md: "-2%" },
          top: { xs: "8%", md: "10%" },
          width: { xs: 300, sm: 400, md: 500 },
          height: { xs: 500, sm: 650, md: 800 },
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <Image
          src="/images/sponsors/seahorse.png"
          alt=""
          fill
          sizes="(max-width: 600px) 300px, (max-width: 900px) 400px, 500px"
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </Box>

      {/* Whale - bottom left */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: "-10%", md: "-5%" },
          bottom: { xs: "2%", md: "5%" },
          width: { xs: 350, sm: 450, md: 550 },
          height: { xs: 200, sm: 260, md: 320 },
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <Image
          src="/images/sponsors/whale.png"
          alt=""
          fill
          sizes="(max-width: 600px) 350px, (max-width: 900px) 450px, 550px"
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </Box>

      {/* Fish school left */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: "5%", md: "12%" },
          top: { xs: "42%", md: "38%" },
          width: { xs: 240, md: 360 },
          height: { xs: 160, md: 220 },
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <Image
          src="/images/sponsors/fish-school-left.png"
          alt=""
          fill
          sizes="(max-width: 600px) 120px, 180px"
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </Box>

      {/* Fish school right */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: "0%", md: "0%" },
          bottom: { xs: "18%", md: "20%" },
          width: { xs: 200, md: 300 },
          height: { xs: 140, md: 200 },
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <Image
          src="/images/sponsors/fish-school-right.png"
          alt=""
          fill
          sizes="(max-width: 600px) 100px, 150px"
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </Box>

      {/* ============ SPONSORS SECTION ============ */}
      <Box sx={{ position: "relative", pt: { xs: 6, md: 9 }, pb: { xs: 2, md: 4 }, zIndex: 2 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-cinzel-bold)",
            fontWeight: 700,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            color: "black",
            textAlign: "center",
            mb: { xs: 2, md: 4 },
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Sponsors
        </Typography>

        <Box
          sx={{
            position: "relative",
            height: { xs: "400px", sm: "480px", md: "550px" },
            maxWidth: "1200px",
            mx: "auto",
            px: 2,
          }}
        >
          {/* Google - Large bubble with small bubble at bottom-right corner */}
          <Box sx={{ position: "absolute", left: { xs: "5%", md: "8%" }, top: { xs: "10%", md: "1%" } }}>
            <Bubble
              name="Google"
              logo="/images/gdglogo.webp"
              size={400}
              isMobile={isMobile}
              sx={{ position: "relative" }}
            />
            <DecorBubble
              size={158}
              isMobile={isMobile}
              sx={{ 
                position: "absolute",
                left: { xs: 5, md: 20 },
                bottom: { xs: 7, md: 10 },
              }}
            />
          </Box>

          {/* Moffitt - Medium bubble with small bubble at top-left corner */}
          <Box sx={{ position: "absolute", right: { xs: "5%", md: "15%" }, top: { xs: "55%", md: "45%" } }}>
            <Bubble
              name="Moffitt Cancer Center"
              logo="/images/gdglogo.webp"
              size={336}
              isMobile={isMobile}
              sx={{ position: "relative" }}
            />

            <DecorBubble
              size={126}
              isMobile={isMobile}
              sx={{ 
                position: "absolute",
                right: { xs: 9, md: 9 },
                bottom: { xs: -2, md: 4 },
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* ============ PARTNERS SECTION ============ */}
      <Box sx={{ position: "relative", pt: { xs: 3, md: 5 }, pb: { xs: 6, md: 10 }, zIndex: 2 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-cinzel-bold)",
            fontWeight: 700,
            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
            color: "black",
            textAlign: "center",
            mb: { xs: 2, md: 4 },
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          Partners
        </Typography>

        <Box
          sx={{
            position: "relative",
            height: { xs: "500px", sm: "550px", md: "600px" },
            maxWidth: "1200px",
            mx: "auto",
            px: 2,
          }}
        >
          {/* Microsoft - Medium bubble with small bubble at bottom-left */}
          <Box sx={{ position: "absolute", left: { xs: "0%", md: "5%" }, top: { xs: "0%", md: "0%" } }}>
            <Bubble
              name="Microsoft"
              logo="/images/gdglogo.webp"
              size={336}
              isMobile={isMobile}
              sx={{ position: "relative" }}
            />
            <DecorBubble
              size={126}
              isMobile={isMobile}
              sx={{ 
                position: "absolute",
                right: { xs: 10, md: -25 },
                bottom: { xs: 5, md: -20 },
              }}
            />
          </Box>

          {/* IEEE - Medium bubble with small bubble at bottom-right */}
          <Box sx={{ position: "absolute", right: { xs: "0%", md: "10%" }, top: { xs: "20%", md: "5%" } }}>
            <Bubble
              name="IEEE Computer Society"
              logo={"/images/gdglogo.webp"}
              size={336}
              isMobile={isMobile}
              sx={{ position: "relative" }}
            />
            <DecorBubble
              size={121}
              isMobile={isMobile}
              sx={{ 
                position: "absolute",
                left: { xs: 7, md: -20 },
                bottom: { xs: 10, md: -15 },
              }}
            />
          </Box>

          {/* USF Engineering - Medium bubble at bottom center */}
          <Box sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: { xs: "3%", md: "-5%" } }}>
            <Bubble
              name="USF College of Engineering"
              logo={"/images/greek-sun.png"}
              size={336}
              isMobile={isMobile}
              sx={{ position: "relative" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Sponsors;
