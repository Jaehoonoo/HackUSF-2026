import { Box } from "@mui/material";

import Image from "next/image";

import Header from "@/components/header/page";
import Hero from "@/components/hero/page";
import About from "@/components/about/page";
import Tracks from "@/components/tracks/page";
import Sponsors from "@/components/sponsors/page";
import Footer from "@/components/footer/page";
import FAQ from "@/components/faq/page";

export default function Home() {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box sx={{ position: "relative", width: "100%" }}>
        <Image
          src="/images/hackusf-26.svg"
          alt="Background"
          width={1920}
          height={1080}
          priority
          style={{
            width: "100%",
            height: "auto",
            zIndex: -1000,
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          zIndex: 1000,
          width: "100%",
          top: 0,
          left: 0,
        }}
      >
        <Header />
        <Hero />

        <Box
          sx={{
            pt: { xs: 8, md: 12 },
          }}
        ></Box>

        <About />
        <Tracks />
        <Sponsors />
        <Footer />
      </Box>
    </Box>
  );
}
