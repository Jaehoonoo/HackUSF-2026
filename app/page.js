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
    <Box>
      <Box sx={{ position: "relative", width: "100%", minHeight: "100vh" }}>
        <Box
          sx={{
            background: "linear-gradient(to bottom, #af4700, #f59212)",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: { xs: "16%", md: "10%" },
              left: 0,
              width: "100%",
              height: "100%",
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
                top: 0,
                left: 0,
                width: "100%",
                height: "auto",
                zIndex: 0,
              }}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: { xs: "20%", md: "10%" },
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        </Box>

        <Header />
        <Hero />

        {/* Islands overlay positioned within 100vh on mobile */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            zIndex: 1,
            display: { xs: "block", lg: "none" },
            height: "clamp(10rem, 70vh, 25rem)",
          }}
        >
          <Box sx={{ width: "100%", position: "absolute", zIndex: 3 }}>
            <About />
          </Box>
          <Image
            src="/images/Vector.svg"
            alt="Vector Background"
            width={1920}
            height={1080}
            style={{
              position: "absolute",
              top: 0,
              transform: "translateY(80vh)",
              left: 0,
              width: "100%",
              height: "auto",
              zIndex: -1,
              pointerEvents: "none",
            }}
          />
          <Image
            src="/images/forest.svg"
            alt="Forest Overlay"
            width={1920}
            height={3479}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "auto",
              transform: "translateY(53vh)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <Image
            src="/images/island (2).svg"
            alt="islands"
            width={1920}
            height={1080}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              zIndex: 0,
            }}
          />
        </Box>
      </Box>

      {/* About section on desktop */}
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <Box sx={{ width: "100%", position: "absolute", zIndex: 3 }}>
          <About />
        </Box>
        <Box>
          <Image
            src="/images/Vector.svg"
            alt="Vector Background"
            width={1920}
            height={1080}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              transform: "translateY(350vh)",
              height: "auto",
              zIndex: -1,
              pointerEvents: "none",
            }}
          />
          <Image
            src="/images/forest.svg"
            alt="Forest Overlay"
            width={1920}
            height={3479}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "auto",
              transform: "translateY(298vh)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          <Image
            src="/images/island (2).svg"
            alt="islands"
            width={1920}
            height={1080}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              zIndex: 0,
            }}
          />
        </Box>
      </Box>

      <Tracks />
      <Sponsors />
      <FAQ />
      <Footer />
    </Box>
  );
}
