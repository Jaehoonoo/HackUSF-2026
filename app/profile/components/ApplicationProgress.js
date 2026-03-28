"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Paper, Typography, Box, Button } from "@mui/material";
import { doc, onSnapshot, getDocFromCache } from "firebase/firestore";
import ProgressTimeline from "./ProgressTimeline";
import AcceptedQrCode from "./AcceptedQrCode";
import WorkshopsNum from "./WorkshopsNum";
import { db } from "@/firebase";

const STATUS_CONTENT = {
  empty: {
    banner: "Applications open",
    message: "Start your HackUSF application when you are ready!",
    borderColor: "#FFB84D",
    textColor: "#C9851A",
    showApply: true,
  },
  // empty: {
  //   banner: "Applications Closed",
  //   message:
  //     "We are no longer accepting applications for HackUSF 2026. Stay tuned for next year!",
  //   borderColor: "#FFB84D",
  //   textColor: "#C9851A",
  //   showApply: false,
  // },
  submitted: {
    banner: "Submitted",
    message: "Thanks for applying! We will email you ASAP.",
    borderColor: "#7BDE95",
    textColor: "#3A8B52",
    showEdit: true,
  },
  in_review: {
    banner: "In Review",
    message: "We are carefully reviewing your application!",
    borderColor: "#7BDE95",
    textColor: "#3A8B52",
    showEdit: true,
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
      "Thank you for applying. We hope you'll consider joining us next year.",
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
  const [mealGroupLoading, setMealGroupLoading] = useState(false);
  const [mealGroup, setMealGroup] = useState("");
  const [rsvpError, setRsvpError] = useState("");
  const cachedProfileRef = useRef({
    userId: null,
    status: "empty",
    rsvp: false,
  });
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

    const docRef = doc(db, "users", userId);

    // Try to load from cache immediately for instant display
    (async () => {
      try {
        const cachedSnap = await getDocFromCache(docRef);
        if (cachedSnap.exists()) {
          const data = cachedSnap.data();
          const cachedStatus = normalizeStatus(data?.status || "");
          const cachedRsvp = Boolean(data?.rsvp);
          setStatus(cachedStatus);
          setRsvp(cachedRsvp);
          console.log("Profile status loaded from: cache (immediate)");
        }
      } catch (error) {
        // Cache miss is expected on first load, listener will handle it
        console.log("No cache available, waiting for listener");
      }
    })();

    // Set up real-time listener with cache support
    const unsubscribe = onSnapshot(
      docRef,
      { includeMetadataChanges: true },
      (snap) => {
        const fromCache = snap.metadata.fromCache;
        console.log(
          `Profile status loaded from: ${fromCache ? "cache" : "server"}`,
        );

        const data = snap.exists() ? snap.data() : null;
        const nextStatus = normalizeStatus(data?.status || "");
        const nextRsvp = Boolean(data?.rsvp);

        setStatus(nextStatus);
        setRsvp(nextRsvp);

        // If still "submitted" and it's March 13+, bump to in_review
        if (nextStatus === "submitted" && !fromCache) {
          fetch("/api/checkReviewDate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          }).catch((err) => console.error("checkReviewDate failed:", err));
        }

        if (isFinalized(nextStatus, nextRsvp)) {
          cachedProfileRef.current = {
            userId,
            status: nextStatus,
            rsvp: nextRsvp,
          };
        }
      },
      (error) => {
        console.error("Error fetching profile status:", error);
        setStatus("empty");
        setRsvp(false);
      },
    );

    // Cleanup listener on unmount or when userId changes
    return () => unsubscribe();
  }, [isLoaded, userId]);

  const setMealGroupforUser = async () => {
    if (!userId) return null;
    setMealGroupLoading(true);
    try {
      const response = await fetch("/api/setMealGroup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.success) {
        throw new Error(
          payload.error || payload.message || "Failed to set meal group.",
        );
      }
      setMealGroup(payload.mealGroup || "");
      return payload.mealGroup || "";
    } catch (error) {
      setRsvpError(error.message || "Failed to set meal group.");
      return null;
    } finally {
      setMealGroupLoading(false);
    }
  };

  useEffect(() => {
    if (status !== "accepted" || !rsvp || !userId) {
      setMealGroup("");
      return;
    }

    setMealGroupLoading(true);
    const docRef = doc(db, "users", userId);

    // Set up real-time listener for meal group with cache support
    const unsubscribe = onSnapshot(
      docRef,
      { includeMetadataChanges: true },
      (snap) => {
        const fromCache = snap.metadata.fromCache;
        console.log(
          `Meal group loaded from: ${fromCache ? "cache" : "server"}`,
        );

        const data = snap.exists() ? snap.data() : null;
        const mealGroupValue = data?.mealGroup || "";
        setMealGroup(mealGroupValue);
        setMealGroupLoading(false);
      },
      (error) => {
        console.error("Error fetching meal group:", error);
        setRsvpError("Unable to load meal group.");
        setMealGroupLoading(false);
      },
    );

    // Cleanup listener on unmount or when dependencies change
    return () => unsubscribe();
  }, [status, rsvp, userId]);

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
      await setMealGroupforUser();
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
    <Paper className="hackusf-card" sx={{ borderRadius: 16, p: 4, mb: 2 }}>
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

        {content.showEdit ? (
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
            Edit Application
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

      <AcceptedQrCode
        isVisible={status === "accepted" && rsvp}
        userId={userId}
        mealGroup={mealGroup}
        isMealGroupLoading={mealGroupLoading}
      />
      <WorkshopsNum userId={userId} />
    </Paper>
  );
}
