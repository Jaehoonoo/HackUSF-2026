"use client";

import { Box, Container, Typography } from "@mui/material";
import ApplicationProgress from "./components/ApplicationProgress";
import GradientDivider from "./components/GradientDivider";
import ProfileHeader from "./components/ProfileHeader";
import { SiDiscord } from "react-icons/si";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  if (isLoaded) {
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }

  return (
    <Box
      className="profile-page"
      sx={{ minHeight: "100dvh", pb: { xs: 3, sm: 6 } }}
    >
      <ProfileHeader />
      {/* <GradientDivider /> */}

      <Container maxWidth="md" sx={{ mt: { xs: 2, sm: 4 }, mb: 0 }}>
        <ApplicationProgress />

        {/* Discord Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            mt: 1,
            mb: 4,
            p: 2,
            borderRadius: 6,
            bgcolor: "#fff",
            border: "4px solid #5865F2",
          }}
        >
          <SiDiscord size={24} color="#5865F2" />
          <Typography
            component="a"
            href="https://discord.gg/dWTWYPPdN6"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              fontWeight: 600,
              color: "#5865F2",
              fontSize: { xs: "0.95rem", sm: "1rem" },
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.2s ease",
              "&:hover": {
                textDecoration: "underline",
                opacity: 0.8,
              },
            }}
          >
            Join our Discord!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
