"use client";

import * as React from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { FaDiscord } from "react-icons/fa";

const sections = ["About", "Tracks", "Sponsors/Partners", "FAQs"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const getSectionId = (section) => {
    return section.toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-");
  };

  const handleSectionClick = (section) => {
    handleCloseNavMenu();
    const sectionId = getSectionId(section);
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <Box
        sx={{ width: "100%", px: 2, position: "relative", overflow: "visible" }}
      >
        <Toolbar disableGutters sx={{ overflow: "visible" }}>
          <Box
            sx={{
              position: "absolute",
              top: 10,
              display: { xs: "none", md: "flex" },
              zIndex: 1,
            }}
          >
            <Image
              src="/images/gdg-sun.png"
              alt="Greek Sun Placeholder"
              width={140}
              height={90}
              style={{
                objectFit: "contain",
                maxWidth: "clamp(80px, 12vw, 120px)",
                height: "auto",
              }}
            />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              size="large"
              aria-label="Discord"
              href="https://discord.gg/dWTWYPPdN6"
              target="_blank"
              rel="noopener noreferrer"
              disableRipple
              sx={{
                color: "#fad37a",
                padding: "8px",
                transition: "transform 150ms ease, color 150ms ease",
                "&:hover": {
                  transform: "scale(1.07)",
                  backgroundColor: "rgba(250, 211, 122, 0.1)",
                  color: "#f8b727",
                },
                "&:active": {
                  transform: "scale(0.95)",
                },
              }}
            >
              <FaDiscord size={28} />
            </IconButton>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-expanded={Boolean(anchorElNav)}
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              disableRipple
              sx={{
                color: "black",
                padding: "12px",
                transition:
                  "transform 150ms ease, color 150ms ease, opacity 150ms ease",
                "&:hover": {
                  transform: "scale(1.07)",
                  backgroundColor: "rgba(0,0,0,0.04)",
                  color: "black",
                },
                "&:focus": {
                  outline: "none",
                  backgroundColor: "transparent",
                },
                "&:active": {
                  transform: "scale(0.95)",
                  backgroundColor: "transparent",
                  color: "black",
                },
                '&[aria-expanded="true"]': {
                  transform: "scale(0.95)",
                  opacity: 0.95,
                },
              }}
            >
              <MenuIcon
                sx={{ fontSize: "clamp(40px, 6vw, 45px)", color: "#fad37a" }}
              />
            </IconButton>
            {/* MLH Trust Badge - Mobile */}
            <Box
              component="a"
              href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=gray"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: { xs: "flex", md: "none" },
                alignItems: "flex-start",
                alignSelf: "flex-start",
                height: "40px",
                overflow: "visible",
                width: "50px",
                minWidth: "50px",
              }}
            >
              <img
                src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-gray.svg"
                alt="Major League Hacking 2026 Hackathon Season"
                style={{ width: "100%" }}
              />
            </Box>
            <Menu
              id="menu-appbar"
              PaperProps={{
                style: {
                  backgroundColor: "#fcf0da",
                  borderRadius: "12px",
                  padding: 4,
                },
              }}
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {sections.map((section) => (
                <MenuItem
                  key={section}
                  onClick={() => handleSectionClick(section)}
                  disableRipple
                  sx={{
                    "&:hover": {
                      backgroundColor: "transparent",
                    },
                    "&:focus": {
                      backgroundColor: "transparent",
                      outline: "none",
                    },
                    "&:active": {
                      backgroundColor: "transparent",
                    },
                    padding: "0.6rem",
                    pl: 3,
                    pr: 3,
                  }}
                >
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontFamily: "var(--font-cinzel-bold)",
                      fontWeight: 700,
                      color: "black",
                    }}
                  >
                    {section}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 10,
              display: { xs: "block", md: "none" },
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <Image
              src="/images/gdg-sun.png"
              alt="Greek Sun Placeholder"
              width={70}
              height={35}
              style={{
                objectFit: "contain",
                maxWidth: "clamp(50px, 15vw, 70px)",
                height: "auto",
              }}
            />
          </Box> */}
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: 5,
              display: { xs: "flex", md: "none" },
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <Image
              src="/images/gdg-sun.png"
              alt="Greek Sun Placeholder"
              width={140}
              height={70}
              style={{
                objectFit: "contain",
                maxWidth: "clamp(40px, 15vw, 60px)",
                height: "auto",
              }}
            />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 1,
            }}
          >
            <IconButton
              size="large"
              aria-label="Discord"
              href="https://discord.gg/dWTWYPPdN6"
              target="_blank"
              rel="noopener noreferrer"
              disableRipple
              sx={{
                color: "#fad470",
                textShadow: "1px 1px 2px rgba(27, 24, 24, 0.7)",
                padding: "8px",
                transition: "transform 150ms ease, color 150ms ease",
                "&:hover": {
                  transform: "scale(1.07)",
                  backgroundColor: "transparent",
                  color: "#f8b727",
                },
                "&:active": {
                  transform: "scale(0.95)",
                  backgroundColor: "transparent",
                },
              }}
            >
              <FaDiscord size={32} />
            </IconButton>
            {sections.map((section) => (
              <Button
                key={section}
                onClick={() => handleSectionClick(section)}
                disableRipple
                sx={{
                  my: 2,
                  color: "#fad470",
                  textShadow: "1px 1px 2px rgba(27, 24, 24, 0.7)",
                  display: "block",
                  fontFamily: "var(--font-cinzel-bold)",
                  fontWeight: 700,
                  fontSize: { md: "0.95rem", lg: "1.1rem", xl: "1.25rem" },
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "#f8b727",
                  },
                  "&:active": {
                    backgroundColor: "transparent",
                    color: "#fad470",
                  },
                }}
              >
                {section}
              </Button>
            ))}

            {/* MLH Trust Badge - Desktop */}
            <Box
              component="a"
              href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=gray"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: "flex",
                alignItems: "flex-start",
                alignSelf: "flex-start",
                height: "40px",
                overflow: "visible",
                width: { md: "70px", lg: "80px", xl: "100px" },
                minWidth: "60px",
                ml: 2,
              }}
            >
              <img
                src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-gray.svg"
                alt="Major League Hacking 2026 Hackathon Season"
                style={{ width: "100%" }}
              />
            </Box>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
export default Header;
