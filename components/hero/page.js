"use client";

import { Box, Button, Typography } from "@mui/material";

import { useRouter } from "next/navigation";

import { useUser } from "@clerk/nextjs";

export default function Hero() {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleClick = () => {
    if (isSignedIn) {
      router.push("/profile");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <Box
      sx={{
        p: "clamp(0px, 2vw, 2rem)",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: { xs: "space-between", md: "space-around" },
        alignItems: "center",
        height: { xs: "100vh", md: "clamp(600px, 100vh, 1200px)" },
        margin: 0,
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: { xs: "flex-start", md: "center" },
          pb: {
            md: "clamp(4rem, 50vh, 30rem)",
            lg: "clamp(1rem, 50vh, 40rem)",
          },
          p: 2,
          pl: { xs: 2, sm: 2.5, md: 0 },
          pt: {
            xs: "clamp(0.5rem, 4vh, 1rem)",
            sm: "clamp(0.5rem, 50vh, 1.4rem)",
          },
          mt: { xs: 1, sm: 3, md: 0 },
          color: "#fad37a",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontFamily: "var(--font-cinzel-bold)",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            textShadow: "2px 2px 4px rgba(27, 24, 24, 0.7)",
          }}
        >
          HackUSF 2026
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "var(--font-cinzel-bold)",
            fontWeight: 700,
            fontSize: "clamp(1.2rem, 3vw, 2.4rem)",
            pb: { xs: 2, md: 0 },
            textShadow: "2px 2px 4px rgba(27, 24, 24, 0.7)",
          }}
          textAlign="center"
        >
          March 28 - 29, 2026
          {/* <Box component="span" sx={{ display: { xs: "none", md: "inline" } }}>
            {" "}
            @ Engineering Building II
          </Box> */}
        </Typography>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 2,
            pt: 1,
            pb: 2,
          }}
        >
          {/* <Box
            sx={{
              fontSize: "clamp(0.7rem, 1.2vw, 1.2rem)",
              fontWeight: 700,
              fontFamily: "var(--font-cinzel-bold)",
              borderRadius: "20px",
              border: "2px solid black",
              padding: "0.75rem",
              backgroundColor: "#a63a36",
            }}
          >
            Tampa, FL
          </Box>
          <Box
            sx={{
              fontSize: "clamp(0.7rem, 1.2vw, 1.2rem)",
              fontWeight: 700,
              fontFamily: "var(--font-cinzel-bold)",
              borderRadius: "20px",
              border: "2px solid black",
              padding: "0.75rem",
              backgroundColor: "#a63a36",
            }}
          >
            24-Hour
          </Box> */}
        </Box>
        <Button
          variant="outlined"
          sx={{
            width: "clamp(150px, 20vw, 300px)",
            textTransform: "none",
            color: "#fad37a",
            fontFamily: "var(--font-cinzel-bold)",
            fontWeight: 700,
            fontSize: "clamp(1rem, 2vw, 1.5rem)",
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
      <Box
        sx={{ pb: 40, display: { xs: "none", md: "block" }, width: "35%" }}
      ></Box>
    </Box>
  );
}
