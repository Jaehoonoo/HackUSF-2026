"use client";

import { Box, Button, Typography } from "@mui/material";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { useUser } from "@clerk/nextjs";

export default function Hero() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleClick = () => {
    if (isSignedIn) {
      router.push("/profile/apply");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 0, md: 4 },
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "center", md: "space-around" },
        alignItems: "center",
        minHeight: "100vh",
        margin: 0,
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          pb: { xs: 12, md: 50 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-cinzel-bold)",
            fontWeight: 700,
            fontSize: {
              xs: "2.25rem",
              md: "2.6rem",
              lg: "3.2rem",
              xl: "4rem",
            },
          }}
        >
          HackUSF 2026
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "var(--font-cinzel-bold)",
            fontWeight: 700,
            fontSize: {
              xs: "0.9rem",
              sm: "1.3rem",
              md: "1.1rem",
              lg: "1.2rem",
              xl: "1.3rem",
            },
          }}
        >
          March 28 - 29, 2026 @ Engineering Building II
        </Typography>
        <Box sx={{ display: "flex", gap: 2, pt: 1, pb: 4 }}>
          <Box
            sx={{
              fontSize: {
                xs: "0.75rem",
                sm: "0.9rem",
                md: "1rem",
                lg: "1.1rem",
                xl: "1.2rem",
              },
              fontWeight: 700,
              fontFamily: "var(--font-cinzel-bold)",
              borderRadius: "20px",
              border: "2px solid black",
              padding: "0.75rem",
              backgroundColor: "#e08785",
            }}
          >
            Tampa, FL
          </Box>
          <Box
            sx={{
              fontSize: {
                xs: "0.75rem",
                sm: "0.9rem",
                md: "1rem",
                lg: "1.1rem",
                xl: "1.2rem",
              },
              fontWeight: 700,
              fontFamily: "var(--font-cinzel-bold)",
              borderRadius: "20px",
              border: "2px solid black",
              padding: "0.75rem",
              backgroundColor: "#e08785",
            }}
          >
            24-Hour
          </Box>
        </Box>
        <Button
          variant="outlined"
          sx={{
            width: "max(200px, 20vw)",
            textTransform: "none",
            color: "white",
            fontFamily: "var(--font-cinzel-bold)",
            fontWeight: 700,
            fontSize: {
              xs: "0.9rem",
              sm: "1.05rem",
              md: "1.2rem",
              lg: "1.3rem",
              xl: "1.5rem",
            },
            borderRadius: "18px",
            boxShadow: "5px 5px 0px black",
            border: "3px solid black",
            backgroundColor: "#a63a36",
            transition:
              "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",

            "&:hover": {
              transform: "translate(3px, 3px)",
              boxShadow: "0px 0px 0px black",
              border: "3px solid black",
            },
          }}
          onClick={handleClick}
        >
          Apply Now
        </Button>
      </Box>
      <Box sx={{ pb: 40, display: { xs: "none", md: "block" }, width: "35%" }}>
        <Image
          src="/images/temple_placeholder.png"
          alt="Temple Placeholder"
          width={600}
          height={600}
          quality={100}
          objectFit="contain"
          layout="responsive"
          loading="lazy"
        />
      </Box>
    </Box>
  );
}
