"use client";

import * as React from "react";
import { Box, Typography, Link, IconButton } from "@mui/material";

const DiscordIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        p: { xs: 2, md: 4 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "center", md: "flex-start" },
            gap: { xs: "1.5rem", md: "2rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: { xs: "1", md: "0 0 auto" },
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontFamily: "var(--font-cinzel-bold)",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", md: "2.5rem" },
                color: "black",
                pb: "1rem",
                textAlign: "center",
              }}
            >
              HackUSF 2026
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "1.5rem",
                justifyContent: "center",
              }}
            >
              <IconButton
                component="a"
                href="https://discord.gg/FP3NQpBqQu"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "black",
                  "&:hover": {
                    backgroundColor: "transparent",
                    opacity: 0.7,
                  },
                }}
                disableRipple
              >
                <DiscordIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.instagram.com/gdgatusf/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "black",
                  "&:hover": {
                    backgroundColor: "transparent",
                    opacity: 0.7,
                  },
                }}
                disableRipple
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://www.linkedin.com/company/gdgatusf/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "black",
                  "&:hover": {
                    backgroundColor: "transparent",
                    opacity: 0.7,
                  },
                }}
                disableRipple
              >
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "center", md: "flex-end" },
              gap: "0.75rem",
            }}
          >
            <Link
              href="/sponsor-us"
              sx={{
                fontFamily: "var(--font-cinzel-bold)",
                color: "black",
                textDecoration: "underline",
                fontSize: { xs: "0.9rem", md: "1rem" },
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              Sponsor Us
            </Link>
            <Link
              href=""
              sx={{
                fontFamily: "var(--font-cinzel-bold)",
                color: "black",
                textDecoration: "underline",
                fontSize: { xs: "0.9rem", md: "1rem" },
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              Hacker&apos;s Guide
            </Link>

            <Link
              href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
              sx={{
                fontFamily: "var(--font-cinzel-bold)",
                color: "black",
                textDecoration: "underline",
                fontSize: { xs: "0.9rem", md: "1rem" },
                "&:hover": {
                  opacity: 0.7,
                },
              }}
            >
              MLH Code of Conduct
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            mt: "2rem",
            pt: "2rem",
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "var(--font-cinzel-bold)",
              color: "black",
              fontSize: { xs: "0.85rem", md: "1rem" },
              textAlign: "center",
            }}
          >
            Made with ❤️ By The GDG Team
          </Typography>
          <Typography
            sx={{
              fontFamily: "var(--font-cinzel-bold)",
              color: "black",
              fontSize: { xs: "0.75rem", md: "0.85rem" },
              textAlign: "center",
              opacity: 0.8,
            }}
          >
            © {2026} HackUSF. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
