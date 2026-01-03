"use client";

import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Paper, Typography, Box, Button } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import ProgressTimeline from "./ProgressTimeline";
import AcceptedQrCode from "./AcceptedQrCode";
import { db } from "@/firebase";

const STATUS_CONTENT = {
  empty: {
    banner: "Applications open",
    message: "Start your HackUSF application when you are ready!",
    borderColor: "#FFB84D",
    textColor: "#C9851A",
    showApply: true,
  },
  submitted: {
    banner: "Submitted",
    message: "Thanks for applying! We will email you ASAP.",
    borderColor: "#7BDE95",
    textColor: "#3A8B52",
  },
  in_review: {
    banner: "In review",
    message: "We are carefully reviewing your application!",
    borderColor: "#7BDE95",
    textColor: "#3A8B52",
  },
  accepted: {
    banner: "Accepted",
    message: "Congratulations! See you there!",
    borderColor: "#7BDE95",
    textColor: "#3A8B52",
  },
  declined: {
    banner: "Declined",
    message:
      "Thank you for applying. We hope you’ll consider joining us next year.",
    borderColor: "#C6473E",
    textColor: "#C6473E",
  },
};

const normalizeStatus = (value) => {
  if (!value) return "empty";
  if (STATUS_CONTENT[value]) return value;
  return "empty";
};

export default function ApplicationProgress() {
  const { userId, isLoaded } = useAuth();
  const [status, setStatus] = useState("empty");

  useEffect(() => {
    if (!isLoaded) return;
    if (!userId) {
      setStatus("empty");
      return;
    }

    const fetchStatus = async () => {
      try {
        const docRef = doc(db, "users", userId);
        const snap = await getDoc(docRef);
        const nextStatus = snap.exists() ? snap.data().status || "" : "";
        setStatus(normalizeStatus(nextStatus));
      } catch (error) {
        setStatus("empty");
      }
    };

    fetchStatus();
  }, [isLoaded, userId]);

  const content = useMemo(
    () => STATUS_CONTENT[normalizeStatus(status)],
    [status],
  );

  return (
    <Paper className="hackusf-card" sx={{ borderRadius: 16, p: 4, mb: 4 }}>
      <Typography
        align="center"
        sx={{ mb: 3, fontSize: "1.5rem", fontWeight: 700 }}
      >
        Application Progress
      </Typography>

      <ProgressTimeline status={status} />

      <Box
        sx={{
          mt: { xs: 2, sm: 4 },
          border: `4px solid ${content.borderColor}`,
          p: { xs: 2, sm: 3 },
          textAlign: "center",
          borderRadius: 6,
        }}
      >
        <Typography
          sx={{
            color: content.textColor,
            fontSize: "1.35rem",
            fontWeight: 700,
          }}
        >
          {content.banner}
        </Typography>

        <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
          {content.message}
        </Typography>

        {content.showApply ? (
          <Button
            variant="contained"
            sx={{
              bgcolor: "#4A7BA7",
              border: "2px solid var(--ink)",
              borderRadius: 12,
              transition: "background-color 120ms ease",
              "&:hover": {
                bgcolor: "#3E6B94",
              },
            }}
          >
            Apply Now
          </Button>
        ) : null}
      </Box>

      <AcceptedQrCode isVisible={status === "accepted"} userId={userId} />
    </Paper>
  );
}
