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
    <Box sx={{ overflowX: "hidden" }}>
      <Box sx={{ position: "relative", width: "100%", minHeight: "100vh" }}>
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
          <Box
            sx={{
              position: "absolute",
              top: { xs: "20%", md: "10%" },
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Image
              src="/images/stairs (3).svg"
              alt="Temple Stairs Background"
              width={1920}
              height={1080}
              priority
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "auto",
                zIndex: -1,
              }}
            />
          </Box>
        </Box>

        <Header />
        <Hero />

        {/* Islands overlay positioned within 100vh on mobile */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            top: {
              xs: "50%",
              sm: "60%",
              md: "75%",
              lg: "75%",
            },
            left: 0,
            zIndex: 1,
            display: { xs: "block", lg: "none" },
            height: "clamp(10rem, 100vh, 25rem)",
          }}
        >
          <Box sx={{ width: "100%", position: "absolute" }}>
            <About />
          </Box>
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
      </Box>

      {/* About section on desktop */}
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <Box sx={{ width: "100%", position: "absolute" }}>
          <About />
        </Box>
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
              zIndex: -1,
            }}
          />
        </Box>
      </Box>

      <Tracks />

      {/*Archway background*/}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: "100%",
          aspectRatio: "2023 / 4587.76",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -1,
            pointerEvents: "none",
          }}
        >
          <Image
            src="/images/archway-water.svg"
            alt="Decorative archway background"
            fill
            style={{ objectFit: "cover" }}
          />
        </Box>
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Sponsors />
          <FAQ />
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
