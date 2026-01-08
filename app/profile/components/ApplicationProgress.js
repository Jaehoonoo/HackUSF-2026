"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
  const [rsvp, setRsvp] = useState(false);
  const [isRsvpLoading, setIsRsvpLoading] = useState(false);
  const [rsvpError, setRsvpError] = useState("");
  const cachedProfileRef = useRef({ userId: null, status: "empty", rsvp: false });
  const isFinalized = (nextStatus, nextRsvp) =>
    nextStatus === "accepted" && nextRsvp;

  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!userId) {
      setStatus("empty");
      setRsvp(false);
      return;
    }

    const fetchStatus = async () => {
      try {
        const cachedStatus = cachedProfileRef.current.status;
        const cachedRsvp = cachedProfileRef.current.rsvp;
        if (
          cachedProfileRef.current.userId === userId &&
          isFinalized(cachedStatus, cachedRsvp)
        ) {
          setStatus(cachedStatus);
          setRsvp(cachedRsvp);
          return;
        }

        const docRef = doc(db, "users", userId);
        const snap = await getDoc(docRef);
        const data = snap.exists() ? snap.data() : null;
        const nextStatus = normalizeStatus(data?.status || "");
        const nextRsvp = Boolean(data?.rsvp);
        setStatus(nextStatus);
        setRsvp(nextRsvp);
        if (isFinalized(nextStatus, nextRsvp)) {
          cachedProfileRef.current = {
            userId,
            status: nextStatus,
            rsvp: nextRsvp,
          };
        }
      } catch (error) {
        setStatus("empty");
        setRsvp(false);
      }
    };

    fetchStatus();
  }, [isLoaded, userId]);

  const handleRsvpConfirm = async () => {
    if (!userId) return;
    setIsRsvpLoading(true);
    setRsvpError("");

    try {
      const response = await fetch("/api/confirmRSVP", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, rsvp: true }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || "Unable to confirm RSVP");
      }

      setRsvp(true);
      if (isFinalized(status, true)) {
        cachedProfileRef.current = {
          userId,
          status,
          rsvp: true,
        };
      }
    } catch (error) {
      setRsvpError(error.message || "Unable to confirm RSVP");
    } finally {
      setIsRsvpLoading(false);
    }
  };

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
            onClick={() => router.push("application")}
          >
            Apply Now
          </Button>
        ) : null}
      </Box>

      {status === "accepted" && !rsvp ? (
        <Box
          sx={{
            mt: 3,
            p: { xs: 2.5, sm: 3 },
            borderRadius: 6,
            border: "2px solid #4A7BA7",
            bgcolor: "rgba(74, 123, 167, 0.12)",
            textAlign: "center",
          }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: "1.15rem", mb: 1 }}>
            RSVP required to unlock your QR code
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Let us know you are coming so we can save your spot at HackUSF 2026.
          </Typography>
          {rsvpError ? (
            <Typography variant="body2" sx={{ color: "#C6473E", mb: 2 }}>
              {rsvpError}
            </Typography>
          ) : null}
          <Button
            variant="contained"
            onClick={handleRsvpConfirm}
            disabled={isRsvpLoading}
            sx={{
              bgcolor: "#4A7BA7",
              border: "2px solid var(--ink)",
              borderRadius: 12,
              px: 3,
              "&:hover": {
                bgcolor: "#3E6B94",
              },
            }}
          >
            {isRsvpLoading ? "Confirming..." : "Confirm RSVP"}
          </Button>
        </Box>
      ) : null}

      <AcceptedQrCode isVisible={status === "accepted" && rsvp} userId={userId} />
    </Paper>
  );
}
