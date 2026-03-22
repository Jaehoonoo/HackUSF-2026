"use client";

import { useState, useEffect } from "react";
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
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [userId, setUserId] = useState(null);
  const [workshopsNum, setWorkshopsNum] = useState(null);
  const [shirtReceived, setShirtReceived] = useState(null);

  useEffect(() => {
    const checkCameraPermission = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
      } catch (error) {
        console.error("Camera permission denied:", error);
        setHasCameraPermission(false);
      }
    };
    checkCameraPermission();
  }, []);

  useEffect(() => {
    if (!userId) {
      setWorkshopsNum(null);
      setShirtReceived(null);
      return;
    }

    fetchGetWorkshopsNum(userId)
      .then((data) => {
        if (!data.success) {
          setWorkshopsNum(null);
          setShirtReceived(null);
          return;
        }
        setWorkshopsNum(
          typeof data.workshopsNum === "number" ? data.workshopsNum : null,
        );
        setShirtReceived(
          typeof data.shirtReceived === "boolean"
            ? data.shirtReceived
            : null,
        );
      })
      .catch(() => {
        setWorkshopsNum(null);
        setShirtReceived(null);
      });
  }, [userId]);

  const handleScanSuccess = (scannedUserId) => {
    setUserId(scannedUserId);
  };

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
        <Button variant="contained" sx={{ mt: 3 }}>
          Shirt received
        </Button>

        <Box sx={{ width: "100%", mt: 4, textAlign: "left" }}>
          {hasCameraPermission === null && (
            <Alert severity="info">Checking camera permissions...</Alert>
          )}
          {hasCameraPermission === false && (
            <Alert severity="error">
              Camera access is required. Please enable permissions and refresh.
            </Alert>
          )}
          {hasCameraPermission === true && (
            <QRScannerComponent
              onScanSuccess={handleScanSuccess}
              scanContextKey="shirt-validation"
            />
          )}
        </Box>
      </Box>
    </Container>
  );
}
