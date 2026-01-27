import { Box } from "@mui/material";
import Image from "next/image";

import Header from "@/components/header/page";
import Hero from "@/components/hero/page";
import About from "@/components/about/page";
import Tracks from "@/components/tracks/page";
import Sponsors from "@/components/sponsors/page";
import Footer from "@/components/footer/page";

export default function Home() {
  return (
    <Box>
      <Box sx={{ position: "relative", width: "100%" }}>
        <Box
          sx={{
            background: "linear-gradient(to bottom, #af4700, #f59212)",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -2,
          }}
        >
          <Image
            src="/images/stairs (1).svg"
            alt="Temple Stairs Background"
            width={1920}
            height={1080}
            priority
            style={{
              position: "absolute",
              top: "10%",
              left: 0,
              width: "100%",
              height: "auto",
              zIndex: -1,
            }}
          />
        </Box>

        <Header />
        <Hero />
      </Box>

      <Box sx={{}}>
        <Box>
          <Image
            src="/images/island (2).svg"
            alt="islands"
            width={1920}
            height={1080}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
            }}
          />
        </Box>
        <About />
      </Box>

      <Tracks />
      <Sponsors />
      <Footer />
    </Box>
  );
}
