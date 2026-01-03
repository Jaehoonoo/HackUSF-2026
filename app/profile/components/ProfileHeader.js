"use client";

import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";

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
          minHeight: { xs: 80, sm: 104, md: 112 },
          py: { xs: 1, sm: 2 },
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2 } }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Box
              sx={{
                width: { xs: 52, sm: 60, md: 64 },
                height: { xs: 52, sm: 60, md: 64 },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 1,
                backgroundColor: "#fff",
                border: "4px solid var(--ink)",
                boxShadow: "none",
              }}
            >
              <Box
                component="img"
                src="/gdg_logo.svg"
                alt="GDG logo"
                sx={{
                  width: { xs: 34, sm: 40, md: 44 },
                  height: { xs: 34, sm: 40, md: 44 },
                  objectFit: "contain",
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
            borderRadius: 0,
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
