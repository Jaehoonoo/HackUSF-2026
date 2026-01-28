"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { SignedOut, SignedIn } from "@clerk/nextjs";

const sections = ["About", "Tracks", "Sponsors/Partners", "FAQs"];

function Header() {
  const router = useRouter();
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
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleLoginClick = () => {
    handleCloseNavMenu();
    router.push("/sign-in");
  };

  const handleProfileClick = () => {
    handleCloseNavMenu();
    router.push("/profile");
  };

  const applyButtonSx = {
    pl: 3,
    pr: 3,
    textTransform: "none",
    color: "white",
    fontFamily: "var(--font-cinzel-bold)",
    fontWeight: 700,
    fontSize: {
      xs: "0.9rem",
      sm: "1.05rem",
      md: "1.2rem",
      lg: "1.3rem",
    },
    borderRadius: "20px",
    boxShadow: "5px 5px 0px black",
    border: "3px solid black",
    backgroundColor: "#a63a36",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "translate(3px, 3px)",
      boxShadow: "0px 0px 0px black",
      border: "3px solid black",
    },
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
      <Box sx={{ width: "100%", px: 2, position: "relative" }}>
        <Toolbar disableGutters>
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
            }}
          >
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
              <MenuIcon sx={{ fontSize: "clamp(40px, 6vw, 45px)" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
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
              <Box
                sx={{
                  p: 1,
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  mr: 0.8,
                }}
              >
                <SignedIn>
                  <Button
                    disableRipple
                    onClick={() => {
                      handleCloseNavMenu();
                      router.push("/profile");
                    }}
                    sx={{
                      ...applyButtonSx,
                      width: "100%",
                      color: "#fad37a",
                    }}
                  >
                    Profile
                  </Button>
                </SignedIn>
                <SignedOut>
                  <Button
                    disableRipple
                    onClick={handleLoginClick}
                    sx={{
                      ...applyButtonSx,
                      width: "100%",
                      color: "#fad37a",
                    }}
                  >
                    Login
                  </Button>
                </SignedOut>
              </Box>
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
            {sections.map((section) => (
              <Button
                key={section}
                onClick={() => handleSectionClick(section)}
                disableRipple
                sx={{
                  my: 2,
                  color: "black",
                  display: "block",
                  fontFamily: "var(--font-cinzel-bold)",
                  fontWeight: 700,
                  fontSize: { md: "0.95rem", lg: "1.1rem", xl: "1.25rem" },
                  "&:hover": {
                    backgroundColor: "transparent",
                    color: "black",
                  },
                  "&:focus": {
                    outline: "none",
                    backgroundColor: "transparent",
                    color: "black",
                  },
                  "&:active": {
                    backgroundColor: "transparent",
                    color: "black",
                  },
                }}
              >
                {section}
              </Button>
            ))}
            <SignedIn>
              <Button
                disableRipple
                onClick={handleProfileClick}
                sx={{
                  ...applyButtonSx,
                  my: 2,
                  ml: 1,
                  color: "#fad37a",
                }}
              >
                Profile
              </Button>
            </SignedIn>
            <SignedOut>
              <Button
                disableRipple
                onClick={handleLoginClick}
                sx={{
                  ...applyButtonSx,
                  my: 2,
                  ml: 1,
                  color: "#fad37a",
                }}
              >
                Login
              </Button>
            </SignedOut>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}
export default Header;
