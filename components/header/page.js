'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { SignedOut } from '@clerk/nextjs';

const sections = ['About', 'Tracks', 'Sponsors/Partners', 'FAQs'];

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
    return section.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '-');
  };

  const handleSectionClick = (section) => {
    handleCloseNavMenu();
    const sectionId = getSectionId(section);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleLoginClick = () => {
    handleCloseNavMenu();
    router.push('/sign-in');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          <Box
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none',
              },
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            <Image
              src="/gdsclogo.webp"
              alt="GDSC Logo"
              width={120}
              height={40}
              style={{ objectFit: 'contain' }}
            />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              disableRipple
              sx={{ 
                color: 'black',
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: 'black',
                },
                '&:focus': {
                  outline: 'none',
                  backgroundColor: 'transparent',
                },
                '&:active': {
                  backgroundColor: 'transparent',
                  color: 'black',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {sections.map((section) => (
                <MenuItem 
                  key={section} 
                  onClick={() => handleSectionClick(section)}
                  disableRipple
                  sx={{
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                    '&:focus': {
                      backgroundColor: 'transparent',
                      outline: 'none',
                    },
                    '&:active': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <Typography sx={{ textAlign: 'center', fontFamily: 'var(--font-cinzel-bold)', fontWeight: 700, color: 'black' }}>{section}</Typography>
                </MenuItem>
              ))}
              <SignedOut>
                <Box sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                  <Button
                    disableRipple
                    variant="outlined"
                    onClick={handleLoginClick}
                    sx={{
                      color: 'black',
                      borderColor: 'black',
                      borderWidth: '2px',
                      borderRadius: '8px',
                      fontFamily: 'var(--font-cinzel-bold)',
                      fontWeight: 700,
                      textTransform: 'none',
                      width: '100%',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'black',
                        borderColor: 'black',
                        borderWidth: '2px',
                      },
                      '&:focus': {
                        outline: 'none',
                        backgroundColor: 'transparent',
                        color: 'black',
                        borderColor: 'black',
                        borderWidth: '2px',
                      },
                      '&:active': {
                        backgroundColor: 'transparent',
                        color: 'black',
                        borderColor: 'black',
                        borderWidth: '2px',
                      },
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </SignedOut>
            </Menu>
          </Box>
          <Box
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'none',
              },
              '&:focus': {
                outline: 'none',
              },
            }}
          >
            <Image
              src="/gdsclogo.webp"
              alt="GDSC Logo"
              width={100}
              height={35}
              style={{ objectFit: 'contain' }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
            {sections.map((section) => (
              <Button
                key={section}
                onClick={() => handleSectionClick(section)}
                disableRipple
                sx={{ 
                  my: 2, 
                  color: 'black', 
                  display: 'block',
                  fontFamily: 'var(--font-cinzel-bold)',
                  fontWeight: 700,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'black',
                  },
                  '&:focus': {
                    outline: 'none',
                    backgroundColor: 'transparent',
                    color: 'black',
                  },
                  '&:active': {
                    backgroundColor: 'transparent',
                    color: 'black',
                  },
                }}
              >
                {section}
              </Button>
            ))}
            <SignedOut>
              <Button
                disableRipple
                variant="outlined"
                onClick={handleLoginClick}
                sx={{
                  my: 2,
                  color: 'black',
                  borderColor: 'black',
                  borderWidth: '2px',
                  borderRadius: '8px',
                  fontFamily: 'var(--font-cinzel-bold)',
                  fontWeight: 700,
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'black',
                    borderColor: 'black',
                    borderWidth: '2px',
                  },
                  '&:focus': {
                    outline: 'none',
                    backgroundColor: 'transparent',
                    color: 'black',
                    borderColor: 'black',
                    borderWidth: '2px',
                  },
                  '&:active': {
                    backgroundColor: 'transparent',
                    color: 'black',
                    borderColor: 'black',
                    borderWidth: '2px',
                  },
                }}
              >
                Login
              </Button>
            </SignedOut>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
