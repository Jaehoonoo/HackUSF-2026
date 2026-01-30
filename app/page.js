"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";

import Header from "@/components/header/page";
import Hero from "@/components/hero/page";
import About from "@/components/about/page";
import Tracks from "@/components/tracks/page";
import Sponsors from "@/components/sponsors/page";
import Footer from "@/components/footer/page";
import FAQ from "@/components/faq/page";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <Box
      sx={{
        overflowX: "hidden",
        position: "relative",
        minHeight: "100vh",
        opacity: isLoaded ? 1 : 0,
        transition: "opacity 0.3s ease-in-out",
      }}
    >
      {/* Gradient background behind everything */}
      <Box
        sx={{
          background:
            "linear-gradient(to bottom, #af4700 2%, #f59212 7%, #ffd37b 55%)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          minHeight: "300vh",
          zIndex: -3,
        }}
      />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
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
            <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
              <Image
                src="/images/stairs (6).svg"
                alt="Temple Stairs Background"
                width={1920}
                height={1080}
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23f59212'/%3E%3C/svg%3E"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "auto",
                  display: "block",
                  zIndex: -1,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                }}
              >
                <Image
                  src="/images/clouds.svg"
                  alt="sunset-bg"
                  width={1920}
                  height={1080}
                  priority
                  className="drifting-cloud"
                  style={{
                    position: "absolute",
                    top: "20%",
                    left: "50%",
                    transform: "translateX(-50%) translateY(-50%) scale(1.1)",
                    width: "115%",
                    height: "auto",
                    zIndex: -10,
                  }}
                />
                <Image
                  src="/images/clouds 2.svg"
                  alt="sunset-bg"
                  width={1920}
                  height={1080}
                  priority
                  className="drifting-cloud-2"
                  style={{
                    position: "absolute",
                    top: "40%",
                    left: "50%",
                    transform: "translateX(-40%) translateY(-50%) scale(1.1)",
                    width: "110%",
                    height: "auto",
                    zIndex: 1,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Header />
        <Hero />
      </Box>

      {/* About section */}
      <Box
        id="about"
        sx={{
          position: "relative",
          width: "100%",
          marginTop: {
            xs: "clamp(-65vh, -55vh, -50vh)",
            sm: "clamp(-400px, calc(-400px + (100vw - 600px) * 0.67), -200px)",
            md: "clamp(-300px, calc(-300px + (100vw - 900px) * 0.67), -100px)",
            lg: 0,
          },
        }}
        className="floating-islands"
      >
        <Box sx={{ width: "100%", position: "absolute", top: 0, zIndex: 2 }}>
          <About />
        </Box>
        <Image
          src="/images/island (5).svg"
          alt="islands"
          width={1920}
          height={1080}
          priority
          placeholder="blur"
          blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23ffd37b'/%3E%3C/svg%3E"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            zIndex: 1,
          }}
        />
      </Box>

      {/* Tracks section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          marginTop: { xs: "-115%", sm: "-115%", md: "-115%", lg: "-115%" },
        }}
      >
        {/* Dark blue background behind forest */}
        <Box
          sx={{
            background: "#1d6071",
            position: "absolute",
            top: "20%",
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: -3,
          }}
        />
        <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
          <Image
            src="/images/forest (4).svg"
            alt="forest"
            width={1920}
            height={1080}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%231d6071'/%3E%3C/svg%3E"
            style={{
              position: "relative",
              width: "100%",
              height: "auto",
              display: "block",
              zIndex: 1,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: {
                  xs: "63%",
                  sm: "63%",
                  md: "61.5%",
                  lg: "62%",
                  xl: "61%",
                },
                left: { xs: "45%", sm: "46.5%", md: "48%", lg: "51%" },
                transform: "translateX(-50%)",
                transformOrigin: "center top",
                width: "100%",
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              <Image
                src="/images/sword-stone 1.svg"
                alt="forest"
                width={1920}
                height={1080}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%231d6071'/%3E%3C/svg%3E"
                style={{
                  position: "relative",
                  width: "43%",
                  height: "auto",
                  display: "block",
                  zIndex: 1,
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: { xs: "70%", sm: "68%", md: "67%", lg: "66%" },
                left: { xs: "15%", sm: "16%", md: "17%", lg: "12%" },
                transform: "translateX(50%)",
                transformOrigin: "center top",
                width: "100%",
                zIndex: 3,
                pointerEvents: "none",
              }}
            >
              <Image
                src="/images/sword-stone 1.svg"
                alt="forest"
                width={1920}
                height={1080}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%231d6071'/%3E%3C/svg%3E"
                style={{
                  position: "relative",
                  width: "30%",
                  height: "auto",
                  display: "block",
                  zIndex: 1,
                  transform: "scaleX(-1)",
                }}
              />
            </Box>
            <Box
              sx={{
                position: "absolute",
                top: "60%",
                left: "50%",
                transform: "translateX(-50%)",
                transformOrigin: "center top",
                width: "100%",
                zIndex: 2,
                pointerEvents: "auto",
              }}
            >
              <Tracks />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Underwater section - fish & jellyfish decoration, no archway */}
      <Box
        sx={{
          background:
            "linear-gradient(to bottom, #2b9fc6 0%, #1670ac 50%, #0c3e9aff 100%)",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Archway (commented out)
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <Image src="/images/archway-water.png" alt="" fill sizes="100vw" loading="lazy"
            style={{ objectFit: "cover", objectPosition: "center top", display: "block" }} />
        </Box>
        */}

        {/* Fish and jellyfish - left to right, top to bottom */}
        {/* Row 1 - top */}
        <Box sx={{ position: "absolute", left: { xs: "28%", md: "8%" }, top: { xs: "2%", md: "0%" }, width: { xs: 100, md: 450 }, height: { xs: 60, md: 350 }, zIndex: 0, pointerEvents: "none", opacity: 0.8 }}>
          <Image src="/images/vecteezy_a-group-of-sea-fish_41272473.png" alt="" fill sizes="180px" style={{ objectFit: "contain" }} loading="lazy" />
        </Box>
        {/* Row 2 - upper mid */}
        <Box sx={{ position: "absolute", left: { xs: "0%", md: "14%" }, top: { xs: "22%", md: "20%" }, width: { xs: 90, md: 150 }, height: { xs: 55, md: 90 }, zIndex: 0, pointerEvents: "none", opacity: 0.75 }}>
          <Image src="/images/R2L_fih.png" alt="" fill sizes="150px" style={{ objectFit: "contain" }} loading="lazy" />
        </Box>
        <Box sx={{ position: "absolute", left: { xs: "18%", md: "0%" }, top: { xs: "18%", md: "22%" }, width: { xs: 85, md: 500 }, height: { xs: 50, md: 300 }, zIndex: 0, pointerEvents: "none", opacity: 0.8 }}>
          <Image src="/images/bigSchoolfih.png" alt="" fill sizes="140px" style={{ objectFit: "contain" }} loading="lazy" />
        </Box>
        {/* Row 3 - mid */}
        <Box sx={{ position: "absolute", left: { xs: "18%", md: "22%" }, top: { xs: "35%", md: "36%" }, width: { xs: 95, md: 400 }, height: { xs: 58, md: 300 }, zIndex: 0, pointerEvents: "none", opacity: 0.75 }}>
          <Image src="/images/R2L_fih.png" alt="" fill sizes="160px" style={{ objectFit: "contain" }} loading="lazy" />
        </Box>
        {/* Row 4 - lower mid */}
        <Box sx={{ position: "absolute", left: { xs: "5%", md: "8%" }, top: { xs: "55%", md: "58%" }, width: { xs: 88, md: 145 }, height: { xs: 52, md: 88 }, zIndex: 0, pointerEvents: "none", opacity: 0.8 }}>
          <Image src="/images/vecteezy_a-group-of-sea-fish_41272473.png" alt="" fill sizes="145px" style={{ objectFit: "contain" }} loading="lazy" />
        </Box>
        <Box sx={{ position: "absolute", right: { xs: "2%", md: "5%" }, top: { xs: "58%", md: "60%" }, width: { xs: 80, md: 135 }, height: { xs: 50, md: 82 }, zIndex: 0, pointerEvents: "none", opacity: 0.75 }}>
          <Image src="/images/pngtree-fish-group-cartoon-silhouette-png-image_6455488.png" alt="" fill sizes="135px" style={{ objectFit: "contain" }} loading="lazy" />
        </Box>
        {/* Row 5 - bottom */}
        <Box sx={{ position: "absolute", right: { xs: "28%", md: "32%" }, bottom: { xs: "5%", md: "8%" }, width: { xs: 78, md: 400 }, height: { xs: 46, md: 300 }, zIndex: 0, pointerEvents: "none", opacity: 0.8 }}>
          <Image src="/images/vecteezy_a-group-of-sea-fish_41272473.png" alt="" fill sizes="128px" style={{ objectFit: "contain" }} loading="lazy" />
        </Box>

        {/* Content overlayed on top */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box id="sponsors-partners">
            <Sponsors />
          </Box>
          <Box id="faqs">
            <FAQ />
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
