"use client";

import { Box } from "@mui/material";

import Header from "@/components/header/page";
import Hero from "@/components/hero/page";
import About from "@/components/about/page";
import Tracks from "@/components/tracks/page";
import Footer from "@/components/footer/page";

export default function Home() {
  return (
    <Box sx={{ bgcolor: "#FCF0DA" }}>
      <Header />
      <Hero />
      <About />
      <Tracks />
      <Footer />
    </Box>
  );
}
