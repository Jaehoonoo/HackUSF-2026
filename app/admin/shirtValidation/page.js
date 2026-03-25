"use client";

import { useState, useEffect, useCallback } from "react";
import { Container, Typography, Box, Button, Alert } from "@mui/material";
import QRScannerComponent from "../components/qrScanner/scanner";

async function fetchGetWorkshopsNum(userId) {
  const res = await fetch(
    `/api/getWorkshopsNum?userId=${encodeURIComponent(userId)}`,
    { method: "GET" },
  );
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, ...data };
}

function formatShirtReceived(val) {
  if (val === null || val === undefined) return "—";
  if (typeof val === "boolean") return val ? "Yes" : "No";
  return String(val);
}

export default function ShirtValidationPage() {
  const [userId, setUserId] = useState(null);
  const [workshopsNum, setWorkshopsNum] = useState(null);
  const [shirtReceived, setShirtReceived] = useState(null);
  const [shirtSubmitting, setShirtSubmitting] = useState(false);
  const [shirtFeedback, setShirtFeedback] = useState(null);

  const applyWorkshopsResponse = useCallback((data) => {
    if (!data.success) {
      setWorkshopsNum(null);
      setShirtReceived(null);
      return;
    }
    setWorkshopsNum(
      typeof data.workshopsNum === "number" ? data.workshopsNum : null,
    );
    setShirtReceived(
      typeof data.shirtReceived === "boolean" ? data.shirtReceived : null,
    );
  }, []);

  useEffect(() => {
    if (!userId) {
      setWorkshopsNum(null);
      setShirtReceived(null);
      setShirtFeedback(null);
      return;
    }

    fetchGetWorkshopsNum(userId)
      .then(applyWorkshopsResponse)
      .catch(() => {
        setWorkshopsNum(null);
        setShirtReceived(null);
      });
  }, [userId, applyWorkshopsResponse]);

  const handleScanSuccess = useCallback((scannedUserId) => {
    setShirtFeedback(null);
    setUserId(scannedUserId);
  }, []);

  const handleShirtReceivedClick = async () => {
    if (!userId) return;

    setShirtSubmitting(true);
    setShirtFeedback(null);

    try {
      const res = await fetch("/api/shirtReceived", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json().catch(() => ({}));

      if (!data.success) {
        setShirtFeedback({
          severity: "error",
          message: data.error || "Could not update shirt status",
        });
        return;
      }

      setShirtFeedback({
        severity: "success",
        message: data.message || "Shirt marked as received",
      });
      await fetchGetWorkshopsNum(userId).then(applyWorkshopsResponse);
    } catch {
      setShirtFeedback({
        severity: "error",
        message: "Network error. Try again.",
      });
    } finally {
      setShirtSubmitting(false);
    }
  };

  const notEnoughWorkshops =
    userId != null &&
    typeof workshopsNum === "number" &&
    workshopsNum < 2;

  return (
    <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
      <Box>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
          Shirt Validation
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: "italic" }}>
          Workshops Attended:{" "}
          {workshopsNum === null || workshopsNum === undefined
            ? "—"
            : workshopsNum}
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: "italic" }}>
          Received Shirt: {formatShirtReceived(shirtReceived)}
        </Typography>

        {notEnoughWorkshops ? (
          <Alert severity="warning" sx={{ mt: 2, textAlign: "left" }}>
            Not eligible for receiving T-shirt. Not enough workshops attended.
          </Alert>
        ) : userId != null && typeof workshopsNum === "number" ? (
          <Alert severity="success" sx={{ mt: 2, textAlign: "left" }}>
            Eligible for receiving T-shirt
          </Alert>
        ) : null}

        {shirtFeedback && (
          <Alert severity={shirtFeedback.severity} sx={{ mt: 2, textAlign: "left" }}>
            {shirtFeedback.message}
          </Alert>
        )}

        <Button
          variant="contained"
          sx={{ mt: 3 }}
          disabled={!userId || shirtSubmitting || notEnoughWorkshops}
          onClick={handleShirtReceivedClick}
        >
          {shirtSubmitting ? "Saving…" : "Shirt received"}
        </Button>

        <Box sx={{ width: "100%", mt: 4, textAlign: "left" }}>
          <QRScannerComponent
            onScanSuccess={handleScanSuccess}
            scanContextKey=""
          />
        </Box>
      </Box>
    </Container>
  );
}
