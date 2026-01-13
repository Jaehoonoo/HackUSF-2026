"use client";

import Header from "@/components/header/page";
import Hero from "@/components/hero/page";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ bgcolor: "#FCF0DA" }}>
      <Header />
      <Hero />
    </Box>
  );
}
