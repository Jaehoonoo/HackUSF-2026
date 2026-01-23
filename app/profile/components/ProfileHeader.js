"use client";

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function ProfileHeader() {
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut({ redirectUrl: "/" });
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#385BB2",
        boxShadow: "none",
        borderBottom: "4px solid #2D5F7F",
      }}
    >
      <Toolbar
        sx={{
          minHeight: { xs: 60, sm: 70, md: 80 },
          py: { xs: 0.5, sm: 1 },
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <Box>
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
            </Box>
          </Link>
          <Typography
            variant="h4"
            fontWeight={600}
            sx={{ fontSize: { xs: "1.35rem", sm: "1.6rem", md: "1.85rem" } }}
          >
            HackUSF 2026
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            bgcolor: "#C6473E",
            color: "#fff",
            border: "4px solid var(--ink)",
            borderRadius: 4,
            boxShadow: "4px 4px 0px var(--ink)",
            px: { xs: 2, sm: 3 },
            transition: "transform 120ms ease, box-shadow 120ms ease",
            "&:hover": {
              bgcolor: "#B03D35",
              transform: "translate(2px, 2px)",
              boxShadow: "2px 2px 0px var(--ink)",
            },
            "&:active": {
              transform: "translate(4px, 4px)",
              boxShadow: "0 0 0px var(--ink)",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
