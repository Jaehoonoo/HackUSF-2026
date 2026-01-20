"use client";

import { Box } from "@mui/material";

import Header from "@/components/header/page";
import Hero from "@/components/hero/page";
import About from "@/components/about/page";
import Tracks from "@/components/tracks/page";
import Sponsors from "@/components/sponsors/page";
import Footer from "@/components/footer/page";
import FAQ from "@/components/faq/page";

export default function Home() {
  return (
    <Box sx={{ bgcolor: "#FCF0DA" }}>
      <Header />
      <Hero />
      <About />
      <Tracks />
      <Sponsors />
      <FAQ />
      <Footer />
    </Box>
  );
}
