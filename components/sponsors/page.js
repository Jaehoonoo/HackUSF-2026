"use client";

import * as React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";

// Sponsor tier arrays - add sponsors here based on their tier
// Higher tier = bigger size
// Plat/Gold are considered "large" sponsors, Silver/Bronze are "small" sponsors
// Fewer sponsors from a "large" catagory can fit on a row than from a "small" catagory
const platinumSponsors = [];

const goldSponsors = [
  {
    src: "/images/sponsors/oracleLogo.png",
    alt: "Oracle",
    link: "https://www.oracle.com/",
  },
  {
    src: "/images/sponsors/tampaBayWave.png",
    alt: "TampaBay Wave",
    link: "https://www.tampabaywave.org/",
  },
];

const silverSponsors = [
  {
    src: "/images/sponsors/googleLogo.png",
    alt: "Google",
    link: "https://about.google/",
  },
];

const bronzeSponsors = [];

const partners = [
  {
    src: "/images/sponsors/USFCollegeofengineeringlogo.webp",
    alt: "USF College of Engineering",
    link: "https://www.usf.edu/engineering/",
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
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: { xs: 1, sm: 2, md: 4 },
        px: { xs: 1, sm: 1.5, md: 2 },
        py: { xs: 1, sm: 1.5, md: 2 },
        mx: "auto",
        maxWidth: "100%",
      }}
    >
      {sponsors.map((sponsor, index) => (
        <CompanyBubble
          key={index}
          logo={sponsor.src}
          logoAlt={sponsor.alt}
          link={sponsor.link}
          isMobile={isMobile}
          size={sponsor.size}
          decorSize={sponsor.decorSize}
        />
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
  const partnerSize = 260;

  const platinumDecorSize = 158;
  const goldDecorSize = 135;
  const silverDecorSize = 113;
  const bronzeDecorSize = 98;
  const partnerDecorSize = 98;

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

  const seaCreatures = [
    {
      src: "/images/dolphin.png",
      pos: { left: { xs: "-8%", md: "-5%" }, bottom: { xs: "-5%", md: "-2%" } },
      size: { w: { xs: 220, md: 520 }, h: { xs: 145, md: 340 } },
      objectPos: "left bottom",
    },
    {
      src: "/images/stingray.png",
      pos: { left: { xs: "30%", md: "60%" }, bottom: { xs: "18%", md: "42%" } },
      size: { w: { xs: 160, md: 300 }, h: { xs: 75, md: 190 } },
      objectPos: "right center",
      hideOnMobile: true,
    },
  ];

  return (
    <Box
      component="section"
      id="sponsors-partners"
      sx={{
        position: "relative",
        py: { xs: 4, md: 6 },
        overflow: "hidden",
      }}
    >
      {/* Scattered sea creatures - background layer, low opacity */}
      {seaCreatures.map((creature, idx) => (
        <Box
          key={idx}
          sx={{
            display: {
              xs: creature.hideOnMobile ? "none" : "block",
              md: "block",
            },
            position: "absolute",
            ...creature.pos,
            width: creature.size.w,
            height: creature.size.h,
            pointerEvents: "none",
            zIndex: 0,
            opacity: 0.52,
          }}
        >
          <Image
            src={creature.src}
            alt=""
            fill
            sizes="(max-width: 600px) 150px, 250px"
            style={{ objectFit: "contain", objectPosition: creature.objectPos }}
            loading="lazy"
          />
        </Box>
      ))}
      {/* Hippocampi (seahorse) - right side, hidden on mobile */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          right: { xs: "-20%", md: "-9%" },
          top: { xs: "70%", md: "70%" },
          width: { xs: 350, md: 600 },
          height: { xs: 250, md: 500 },
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <Image
          src="/images/sponsors/seahorse.png"
          alt=""
          fill
          sizes="(max-width: 600px) 100px, 150px"
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </Box>
      {/* Right fish - bottom right of sponsors section */}
      <Box
        sx={{
          position: "absolute",
          right: { xs: "0%", md: "-.5%" },
          bottom: { xs: "2%", md: "0%" },
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
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "4rem" },
              color: "#fcf0da",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              textAlign: "center",
              mb: { xs: 2, md: 4 },
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Sponsors
          </Typography>
          <SponsorSection
            sponsors={[...largeSponsors, ...smallSponsors]}
            isMobile={isMobile}
          />
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
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "4rem" },
              color: "#fcf0da",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
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
