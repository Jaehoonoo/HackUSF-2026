"use client";

import { Box } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import Header from "@/components/header/page";
import Hero from "@/components/hero/page";
import About from "@/components/about/page";
import Tracks from "@/components/tracks/page";
import Sponsors from "@/components/sponsors/page";
import Footer from "@/components/footer/page";
import FAQ from "@/components/faq/page";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cloudsReady, setCloudsReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Trigger fade-in whenever the component mounts or pathname changes to "/"
    setIsLoaded(false);
    setCloudsReady(false);
    const timer = setTimeout(() => setIsLoaded(true), 50);

    // Wait for window load and layout to stabilize before showing clouds
    // Add minimum delay to ensure layout is stable even on fast deployments
    const showClouds = () => {
      setTimeout(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setCloudsReady(true);
          });
        });
      });
    };

    if (document.readyState === "complete") {
      showClouds();
    } else {
      window.addEventListener("load", showClouds);
    }

    // Handle browser back/forward button (for external navigation)
    const handlePageShow = (event) => {
      if (event.persisted) {
        // Page restored from cache, reset and reload
        setIsLoaded(false);
        setCloudsReady(false);
        setTimeout(() => setIsLoaded(true), 50);
        showClouds();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", showClouds);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [pathname]);

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
              {/* White background layer */}
              <Box
                sx={{
                  position: "absolute",
                  top: "26%",
                  left: 0,
                  width: "100%",
                  height: "62%",
                  minHeight: "800px",
                  zIndex: -50,
                }}
              />
              <Image
                src="/images/stairs (8).svg"
                alt="Temple Stairs Background"
                width={1920}
                height={1080}
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23f5f5f5'/%3E%3C/svg%3E"
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
                  top: "1.6%",
                  right: "5%",
                  width: "10%",
                  height: "auto",
                  zIndex: -2,
                  animation: "circularFloat 15s linear infinite",
                  "@keyframes circularFloat": {
                    "0%": {
                      transform: "translate(0, 0) rotate(0deg)",
                    },
                    "12.5%": {
                      transform: "translate(18px, -8px) rotate(2deg)",
                    },
                    "25%": {
                      transform: "translate(22px, -18px) rotate(-1deg)",
                    },
                    "37.5%": {
                      transform: "translate(12px, -25px) rotate(3deg)",
                    },
                    "50%": {
                      transform: "translate(-5px, -22px) rotate(-2deg)",
                    },
                    "62.5%": {
                      transform: "translate(-18px, -15px) rotate(1deg)",
                    },
                    "75%": {
                      transform: "translate(-20px, -8px) rotate(-3deg)",
                    },
                    "87.5%": {
                      transform: "translate(-10px, -3px) rotate(2deg)",
                    },
                    "100%": {
                      transform: "translate(0, 0) rotate(0deg)",
                    },
                  },
                }}
              >
                <Image
                  src="/images/Birds.svg"
                  alt="Birds"
                  width={1920}
                  height={1080}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%23f59212'/%3E%3C/svg%3E"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  minHeight: "100vh",
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
                    top: "10%",
                    left: "50%",
                    transform: "translateX(-50%) scale(1.1)",
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
                    top: "25%",
                    left: "50%",
                    transform: "translateX(-40%) scale(1.1)",
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
        <Box
          sx={{
            position: "absolute",
            left: { xs: "2%", md: "8%" },
            top: { xs: "2%", md: "0%" },
            width: { xs: 300, md: 450 },
            height: { xs: 200, md: 350 },
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.8,
          }}
        >
          <Image
            src="/images/vecteezy_a-group-of-sea-fish_41272473.png"
            alt=""
            fill
            sizes="180px"
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </Box>
        {/* Row 2 - upper mid */}
        <Box
          sx={{
            position: "absolute",
            left: "70%",
            top: { xs: "22%", md: "20%" },
            width: { xs: 90, md: 150 },
            height: { xs: 55, md: 90 },
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.75,
          }}
        >
          <Image
            src="/images/R2L_fih.png"
            alt=""
            fill
            sizes="150px"
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: { xs: "8%", md: "0%" },
            top: { xs: "15%", md: "22%" },
            width: { xs: 200, md: 500 },
            height: { xs: 150, md: 300 },
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.8,
          }}
        >
          <Image
            src="/images/bigSchoolfih.png"
            alt=""
            fill
            sizes="140px"
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </Box>
        {/* Row 3 - mid */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: "18%", md: "22%" },
            top: { xs: "35%", md: "36%" },
            width: { xs: 95, md: 400 },
            height: { xs: 58, md: 300 },
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.75,
          }}
        >
          <Image
            src="/images/R2L_fih.png"
            alt=""
            fill
            sizes="160px"
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </Box>
        {/* Row 4 - lower mid */}
        <Box
          sx={{
            position: "absolute",
            left: { xs: "5%", md: "8%" },
            top: { xs: "55%", md: "58%" },
            width: { xs: 88, md: 145 },
            height: { xs: 52, md: 88 },
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.8,
          }}
        >
          <Image
            src="/images/vecteezy_a-group-of-sea-fish_41272473.png"
            alt=""
            fill
            sizes="145px"
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            right: "50%",
            top: "60%",
            width: { xs: 100, md: 135 },
            height: { xs: 80, md: 82 },
            zIndex: 0,
            pointerEvents: "none",
            opacity: 0.75,
          }}
        >
          <Image
            src="/images/pngtree-fish-group-cartoon-silhouette-png-image_6455488.png"
            alt=""
            fill
            sizes="135px"
            style={{ objectFit: "contain" }}
            loading="lazy"
          />
        </Box>

        {/* Content overlayed on top */}
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box id="sponsors-partners">
            <Sponsors />
          </Box>
          <Box id="faqs">
            <FAQ />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              display: "flex",
              justifyContent: { xs: "flex-end", md: "center" },
              alignItems: "center",
              height: { xs: 180, sm: 200, md: 260, lg: 300 },
              pt: "8%",
            }}
          >
            <Image
              src="/images/trident (2).png"
              alt="Trident"
              width={180}
              height={300}
              style={{
                objectFit: "contain",
                maxWidth: "100%",
                height: "auto",
                opacity: 0.7,
              }}
              loading="lazy"
            />
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
