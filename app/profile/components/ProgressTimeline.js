"use client";

import { cloneElement, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";

const Node = ({ icon, label, color, delayMs }) => (
  <Box textAlign="center">
    <Box
      sx={{
        width: 56,
        height: 56,
        bgcolor: color,
        border: "4px solid var(--ink)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mx: "auto",
        transition: "background-color 600ms ease",
        transitionDelay: `${delayMs}ms`,
      }}
    >
      {cloneElement(icon, { sx: { color: "var(--ink)" } })}
    </Box>
    <Typography sx={{ mt: 1 }}>{label}</Typography>
  </Box>
);

const STATUS_LABELS = {
  empty: "Apply",
  submitted: "Submitted",
};

export default function ProgressTimeline({ status }) {
  const normalizedStatus = status || "empty";
  const isSubmitted = ["submitted", "in_review", "accepted", "declined"].includes(
    normalizedStatus,
  );
  const isInReview = ["in_review", "accepted", "declined"].includes(
    normalizedStatus,
  );
  const isDecided = ["accepted", "declined"].includes(normalizedStatus);

  const baseLineColor = "#E3C48C";
  const pendingColor = "#FFB84D";
  const completedColor = "#7BDE95";
  const declinedColor = "#C6473E";
  const lineInset = "16.666%";

  const progressScale = isDecided ? 1 : isInReview ? 0.5 : 0;
  const firstLabel = STATUS_LABELS[normalizedStatus] || "Submitted";
  const thirdLabel =
    normalizedStatus === "accepted"
      ? "Accepted"
      : normalizedStatus === "declined"
        ? "Declined"
        : "Decision";
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const firstFinalColor = isSubmitted ? completedColor : pendingColor;
  const secondFinalColor = isInReview ? completedColor : pendingColor;
  const thirdFinalColor =
    normalizedStatus === "accepted"
      ? completedColor
      : normalizedStatus === "declined"
        ? declinedColor
        : pendingColor;

  return (
    <Box sx={{ position: "relative", mb: 4 }}>
      <Box
        sx={{
          position: "absolute",
          top: 28,
          left: lineInset,
          right: lineInset,
          height: 4,
          bgcolor: baseLineColor,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 28,
          left: lineInset,
          height: 4,
          right: lineInset,
          bgcolor: completedColor,
          transition: "transform 900ms ease",
          transformOrigin: "left center",
          transform: `scaleX(${animate ? progressScale : 0})`,
          zIndex: 1,
        }}
      />

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ position: "relative", zIndex: 2 }}
      >
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Node
            icon={isSubmitted ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
            label={firstLabel}
            color={animate ? firstFinalColor : pendingColor}
            delayMs={200}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Node
            icon={<AccessTimeIcon />}
            label="In Review"
            color={animate ? secondFinalColor : pendingColor}
            delayMs={500}
          />
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Node
            icon={<StarIcon />}
            label={thirdLabel}
            color={animate ? thirdFinalColor : pendingColor}
            delayMs={800}
          />
        </Box>
      </Box>
    </Box>
  );
}
