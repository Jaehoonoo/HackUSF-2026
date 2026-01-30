"use client";

import { useState } from "react"; // for state
import Image from "next/image"; // for optimized images
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material"; // main MUI components
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"; // icon for accordion expand arrow

// All questions and answers that will fill the accordions.
const faqData = {
  General: [
    {
      question: "What is a hackathon?",
      answer:
        "A hackathon is a weekend-long event where students come together to explore new technologies and create innovative projects. Projects can range from web or app development to hardware builds, or anything in between. HackUSF is all about learning, meeting new people, and having a blast! Throughout the weekend, we'll also host workshops, social activities, networking opportunities with sponsors, free food, swag, and much more.",
    },
    {
      question: "Who can attend?",
      answer:
        "If you're a current college student or graduated within the last year, you're invited! Beginners are more than welcome too.",
    },
    {
      question: "How much experience do I need?",
      answer:
        "None at all! HackUSF is open to students of all backgrounds and skill levels. We'll have workshops to help you learn, industry mentors to guide you, and plenty of resources to bring your project ideas to life. Whether you're coding for the first time or already an expert, there's a spot for you.",
    },
    {
      question: "How much does it cost?",
      answer:
        "Nothing! HackUSF is completely free for all participants. All you need to focus on is learning, building amazing projects, and enjoying the experience.",
    },
    {
      question: "What if I've never attended a hackathon before?",
      answer:
        "No worries! HackUSF is beginner-friendly. Our workshops, mentors, and welcoming community will make it easy to get started and build your confidence throughout the event.",
    },
    {
      question: "Is HackUSF in person or virtual?",
      answer:
        "HackUSF is fully in-person! From check-in to project submissions and demos, everything happens on-site, so make sure you can attend in person before registering.",
    },
  ],
  Preparation: [
    {
      question: "Do I need a team?",
      answer:
        "Not at all! You can go solo, come with a team of up to four people, or join others at HackUSF. We’ll also have team-building activities to help you find the right teammates!",
    },
    {
      question: "What should I bring?",
      answer:
        "Bring your laptop, charger, any hardware you plan to use, a reusable water bottle, and toiletries if you’re staying overnight. Comfy clothes, a blanket, or anything that keeps you cozy are also recommended. Don’t worry about food and snacks—we’ve got that covered!",
    },
    {
      question: "How do I find teammates?",
      answer:
        "Hop into our HackUSF Discord to connect with other participants! We’ll open a special channel for team formation as the event gets closer. It’s a great place to meet people, showcase your skills, and find teammates with complementary abilities. Plus, we’ll have team-building activities on-site to help you meet potential collaborators in person.",
    },
    {
      question: "What should I expect as a first-time hackathon participant?",
      answer:
        "Expect an exciting weekend full of creativity and learning! You’ll have fun building cool projects, meet amazing people and sponsors, and see impressive work from other participants. You might lose a little sleep, but the energy and collaboration make it worth it. The atmosphere is welcoming, so don’t hesitate to ask questions or lend a hand.",
    },
    {
      question: "Should I come with a project idea already planned?",
      answer:
        "It’s up to you! Some participants like to brainstorm ideas ahead of time, while others prefer inspiration from workshops, challenges, and conversations during the event. Both approaches work well. If you bring an idea, stay flexible, you might discover something even more exciting once you’re there.",
    },
  ],
  Logistics: [
    {
      question: "Where can I sleep?",
      answer:
        "We’ll have designated quiet rooms where attendees can rest during the event. Feel free to bring a sleeping bag, blanket, or anything that helps you feel cozy. Make sure to take breaks and get some rest when you need it!",
    },
    {
      question: "Is food provided?",
      answer:
        "Yes! HackUSF provides free meals, snacks, and drinks throughout the weekend to keep you fueled. We can accommodate dietary restrictions—just let us know when you register.",
    },
    {
      question: "Do I have to stay the whole time?",
      answer:
        "Not at all! We encourage you to stay as much as possible so you don’t miss out on the experience, but you’re free to come and go as needed.",
    },
    {
      question: "Is there parking available at the venue?",
      answer:
        "Absolutely! We'll provide instructions for specific parking locations during the event in the Hacker's Guide.",
    },
  ],
  Sponsorship: [
    {
      question: "Can I volunteer at HackUSF?",
      answer:
        "Absolutely! We're always looking for enthusiastic volunteers to help make HackUSF a success. Volunteers assist with registration, logistics, mentoring and various event activities. It's a great way to be part of the hackathon community and gain experience. Interested? Reach out to us to get involved.",
    },
    {
      question: "How can I become a sponsor?",
      answer: (
        <>
          We'd love to have your organization support HackUSF. Sponsoring gives
          you the chance to connect with talented students, showcase your brand
          and support the tech community. To learn more about sponsorship
          opportunities, get in touch with us at{" "}
          <a
            href="mailto:gdscatusf@gmail.com"
            style={{ color: "inherit", textDecoration: "underline" }}
          >
            gdscatusf@gmail.com
          </a>
        </>
      ),
    },
    {
      question: "What are the benefits of sponsoring HackUSF?",
      answer:
        "Sponsors receive brand visibility, direct access to skilled students for recruiting, opportunities to host workshops or challenges and the chance to be part of one of Florida’s premier hackathons. Different sponsorship levels include benefits like booth space, branded swag and speaking opportunities.",
    },
    {
      question: "When is the deadline to become a sponsor?",
      answer:
        "We recommend reaching out early to secure your preferred sponsorship level and benefits. February 13th is the early deadline, February 27th is the regular deadline, and March 6th is the payment deadline for sponsorship commitments.",
    },
  ],
};

// Used to loop over and create the main boxes that create the change in questions.
const questionBoxes = [
  { label: "General", key: "General", id: 1 },
  { label: "Preparation", key: "Preparation", id: 2 },
  { label: "Logistics", key: "Logistics", id: 3 },
  { label: "Sponsorship & Volunteering", key: "Sponsorship", id: 4 },
];
export default function FAQ() {
  const [expanded, setExpanded] = useState(null);
  const [activeCategory, setActiveCategory] = useState("General");

  // Change handling for the accordions...closes old ones when new are clicked or when the same accordion is clicked again.
  function handleChange(index) {
    setExpanded(function (prev) {
      if (prev == index) {
        return null;
      } else {
        return index;
      }
    });
  }
  function handleCategoryClick(category) {
    // When switching categories, reset any opened accordion so UI is consistent
    setExpanded(null);
    setActiveCategory(category);
  }

  // render all the accordions according to the lenght of faqData constant... makes it easier to add and change questions.
  function renderFAQBoxes() {
    // Centered, responsive container for the accordions
    return (
      <Box
        sx={{
          width: { xs: "100%", md: "80%", lg: "60%" },
          mx: "auto",
          mt: { xs: 8, md: 12 },
          px: { xs: 2, md: 0 },
        }}
      >
        {faqData[activeCategory].map((item, idx) => (
          <Accordion
            key={idx}
            expanded={expanded === idx}
            onChange={() => handleChange(idx)}
            sx={{
              bgcolor: "#FcF0DA",
              borderRadius: 2,
              mb: { xs: 1.5, md: 3 }, // spacing between items
              width: "100%",
              p: "1.0rem",
              pr: "1.6rem",
              // base shadow and transform for smoother lift effect
              boxShadow: "0 8px 20px rgba(0,0,0,0.10)",
              transform: "translateZ(0)",
              transition:
                "transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms cubic-bezier(.2,.8,.2,1)",
              // hover lift only for pointer devices to avoid mobile quirks
              "@media (hover: hover) and (pointer: fine)": {
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
                },
              },
            }}
          >
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
              <Typography
                sx={{
                  fontFamily: "Cinzel",
                  fontWeight: 700,
                  fontSize: { xs: "1.2rem", md: "1.5rem", lg: "1.9rem" },
                  lineHeight: "100%",
                  letterSpacing: 0,
                }}
              >
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ px: { xs: 2, md: 3 }, py: { xs: 1.5, md: 2 } }}
            >
              <Typography
                sx={{
                  fontFamily: "Libre Baskerville",
                  fontWeight: 400,
                  fontSize: { xs: "1.0rem", md: "1.3rem", lg: "1.7rem" },
                  lineHeight: 1.6,
                  letterSpacing: "0px",
                  color: "#3d3d3dff",
                }}
              >
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  }

  return (
    <Box
      component="section"
      id="faq"
      sx={{
        bgcolor: "transparent", // blue background
        minHeight: "100vh", // full screen height
        position: "relative", // allows absolute positioning if needed later
        pt: 1,
        pb: { xs: 4, md: 6 },
      }}
    >
      {/* Whale - bottom left */}
      <Box
        sx={{
          position: "absolute",
          left: { xs: "-15%", md: "-5%" },
          bottom: { xs: "-7%", md: "5%" },
          width: { xs: 350, sm: 450, md: 900 },
          height: { xs: 200, sm: 260, md: 800 },
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Image
          src="/images/sponsors/whale.png"
          alt=""
          fill
          sizes="(max-width: 600px) 350px, (max-width: 900px) 450px, 550px"
          style={{ objectFit: "contain" }}
          loading="lazy"
        />
      </Box>
      <Box sx={{ mx: "auto", px: { xs: 3, md: 6 }, py: { xs: 4, md: 8 } }}>
        {/* Centered title */}
        <Box sx={{ textAlign: "center", mb: { xs: 2, md: 4 } }}>
          <Typography
            sx={{
              fontFamily: "Cinzel",
              fontWeight: 700,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem", lg: "4rem" },
              lineHeight: "100%",
              letterSpacing: 0,
              color: "#fcf0da",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
            }}
          >
            FAQ
          </Typography>
        </Box>

        {/* Category boxes in a wrapping flex row, centered */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: { xs: 1.5, md: 3 },
            pt: { xs: 2, md: 5 },
            width: "100%",
          }}
        >
          {questionBoxes.map((box) => (
            <Box
              key={box.id}
              onClick={() => handleCategoryClick(box.key)}
              sx={{
                bgcolor: activeCategory === box.key ? "#FFD37C" : "#FBF1DA",
                p: "1rem",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                // use CSS box-shadow strings for consistent visuals
                boxShadow:
                  activeCategory === box.key
                    ? "0 10px 30px rgba(0,0,0,0.18)"
                    : "0 6px 18px rgba(0,0,0,0.08)",
                minWidth: { xs: "auto", md: "auto" },
                // keep a consistent border to avoid layout shift; show solid black when active
                border:
                  activeCategory === box.key
                    ? "5px solid #C4944A"
                    : "3px solid transparent",
                boxSizing: "border-box",
                // smooth, non-layout-changing hover effects
                transition:
                  "transform 200ms ease, box-shadow 200ms ease, background-color 200ms ease, border 180ms ease",
                transform: "translateZ(0)",
                // apply hover only on devices that support hover to remain mobile-safe
                "@media (hover: hover) and (pointer: fine)": {
                  "&:hover": {
                    transform: "scale(1.03)",
                    backgroundColor:
                      activeCategory === box.key ? "#FFD37C" : "#F7EEC5",
                    boxShadow: "0 14px 36px rgba(0,0,0,0.18)",
                  },
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Cinzel",
                  fontWeight: 700,
                  fontSize: { xs: "1.3rem", md: "1.6rem", lg: "2.0rem" },
                  textAlign: "center",
                }}
              >
                {box.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Render the accordion list for the active category */}
        {renderFAQBoxes()}
      </Box>
    </Box>
  );
}
