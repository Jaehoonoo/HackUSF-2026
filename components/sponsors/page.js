"use client";

import * as React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

// Sponsor tier arrays - add sponsors here based on their tier
// Higher tier = bigger size
// Plat/Gold are considered "large" sponsors, Silver/Bronze are "small" sponsors
// Fewer sponsors from a "large" catagory can fit on a row than from a "small" catagory
const platinumSponsors = [
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
];

const goldSponsors = [
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
  {
    src: "/images/gdglogo.webp",
    alt: "Moffitt - HackUSF",
    link: "https://moffitt.org",
  },
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
];

const silverSponsors = [
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
];

const bronzeSponsors = [
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
];

const partners = [
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
  {
    src: "/images/gdglogo.webp",
    alt: "Google - HackUSF",
    link: "https://about.google/",
  },
];

// CompanyBubble: Combines Bubble and DecorBubble for flexboard
const CompanyBubble = ({
  name,
  logo,
  isMobile,
  size = 336,
  decorSize = 126,
  logoAlt = "logo",
  link,
}) => {
  // More aggressive mobile scaling - smaller bubbles on mobile
  const actualSize = isMobile ? size * 0.45 : size;
  const actualDecorSize = isMobile ? decorSize * 0.5 : decorSize;

  const bubbleContent = (
    <Box
      sx={{
        position: "relative",
        width: actualSize,
        height: actualSize,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        m: { xs: 0.5, sm: 1, md: 2 }, // Reduced margin on mobile
      }}
    >
      {/* Main Bubble with company logo */}
      <Box
        sx={{
          width: actualSize,
          height: actualSize,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
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
              alt={logoAlt}
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
              color: "#E5E4E2",
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
      {/* Decor Bubble (smaller bubble on bottom right) */}
      <Box
        sx={{
          position: "absolute",
          right: isMobile ? 4 : 9,
          bottom: isMobile ? -1 : -2,
          width: actualDecorSize,
          height: actualDecorSize,
          pointerEvents: "none",
        }}
      >
        <Image
          src="/images/sponsors/bubble-medium.png"
          alt=""
          fill
          sizes={`${actualDecorSize}px`}
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </Box>
    </Box>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none" }}
      >
        {bubbleContent}
      </a>
    );
  }

  return bubbleContent;
};

// Helper function to render sponsor sections with tier-based sizing
// Sponsors should have: src, alt, link, size, decorSize, isBigSponsor
const SponsorSection = ({ sponsors, isMobile }) => {
  if (sponsors.length === 0) return null;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(6, 1fr)", // 6 columns on mobile: 2 large sponsors per row (span 3), 3 small sponsors per row (span 2)
          sm: "repeat(6, 1fr)",
          md: "repeat(12, 1fr)", // 12 columns on desktop: 3 large sponsors per row (span 4), 4 small sponsors per row (span 3)
        },
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 1, sm: 2, md: 4 }, // Reduced gap on mobile
        px: { xs: 1, sm: 1.5, md: 2 }, // Reduced padding on mobile
        py: { xs: 1, sm: 1.5, md: 2 }, // Reduced padding on mobile
        maxWidth: "1200px",
        mx: "auto",
      }}
    >
      {sponsors.map((sponsor, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // Big sponsors: span 3 columns on mobile (2 per row), 4 columns on desktop (3 per row)
            // Small sponsors: span 2 columns on mobile (3 per row), 3 columns on desktop (4 per row)
            gridColumn: {
              xs: sponsor.isBigSponsor ? "span 3" : "span 2",
              md: sponsor.isBigSponsor ? "span 4" : "span 3",
            },
          }}
        >
          <CompanyBubble
            logo={sponsor.src}
            logoAlt={sponsor.alt}
            link={sponsor.link}
            isMobile={isMobile}
            size={sponsor.size}
            decorSize={sponsor.decorSize}
          />
        </Box>
      ))}
    </Box>
  );
};

function Sponsors() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Size hierarchy: Platinum (largest) > Gold > Silver > Bronze > Partners (smallest)
  const platinumSize = 420;
  const goldSize = 360;
  const silverSize = 300;
  const bronzeSize = 260;
  const partnerSize = 240;

  const platinumDecorSize = 158;
  const goldDecorSize = 135;
  const silverDecorSize = 113;
  const bronzeDecorSize = 98;
  const partnerDecorSize = 90;

  // Combine large sponsors (platinum + gold) with tier metadata
  // Both Plat/Gold can be on the same row
  const largeSponsors = [
    ...platinumSponsors.map((sponsor) => ({
      ...sponsor,
      size: platinumSize,
      decorSize: platinumDecorSize,
      isBigSponsor: true,
    })),
    ...goldSponsors.map((sponsor) => ({
      ...sponsor,
      size: goldSize,
      decorSize: goldDecorSize,
      isBigSponsor: true,
    })),
  ];

  // Combine small sponsors (silver + bronze) with tier metadata
  const smallSponsors = [
    ...silverSponsors.map((sponsor) => ({
      ...sponsor,
      size: silverSize,
      decorSize: silverDecorSize,
      isBigSponsor: false,
    })),
    ...bronzeSponsors.map((sponsor) => ({
      ...sponsor,
      size: bronzeSize,
      decorSize: bronzeDecorSize,
      isBigSponsor: false,
    })),
  ];

  // Partners (no tiers, all same size)
  const partnersList = partners.map((sponsor) => ({
    ...sponsor,
    size: partnerSize,
    decorSize: partnerDecorSize,
    isBigSponsor: false,
  }));

  return (
    <Box
      component="section"
      id="sponsors-partners"
      sx={{
        position: "relative",
        py: { xs: 4, md: 6 },
      }}
    >
      {/* Decorative elements */}
      {/* <Box
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
      <Box
        sx={{
          position: "absolute",
          left: { xs: "0%", md: "12%" },
          top: { xs: "35%", md: "38%" },
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
      </Box> */}

      {/* Flexboards container */}
      <Box>
        {/* Sponsors Flexboard */}
        <Box
          sx={{
            position: "relative",
            pt: { xs: 4, md: 6 },
            pb: { xs: 2, md: 4 },
            zIndex: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "var(--font-cinzel-bold)",
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: "#E5E4E2",
              textAlign: "center",
              mb: { xs: 2, md: 4 },
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Sponsors
          </Typography>
          <SponsorSection sponsors={largeSponsors} isMobile={isMobile} />
          <SponsorSection sponsors={smallSponsors} isMobile={isMobile} />
        </Box>

        {/* Partners Flexboard */}
        <Box
          sx={{
            position: "relative",
            pt: { xs: 2, md: 4 },
            pb: { xs: 6, md: 10 },
            zIndex: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: "var(--font-cinzel-bold)",
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              color: "#E5E4E2",
              textAlign: "center",
              mb: { xs: 2, md: 4 },
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Partners
          </Typography>
          <SponsorSection sponsors={partnersList} isMobile={isMobile} />
        </Box>
      </Box>
    </Box>
  );
}

export default Sponsors;
