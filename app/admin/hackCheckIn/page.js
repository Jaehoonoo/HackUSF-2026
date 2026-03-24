"use client";

import { useState } from "react";
import { Alert, Box, Typography } from "@mui/material";
import QRScannerComponent from "../components/qrScanner/scanner";

const parseUserIdFromQrPayload = (payload) => {
  if (typeof payload !== "string") {
    return null;
  }

  const trimmedPayload = payload.trim();
  const clerkUserIdPattern = /^user_[a-zA-Z0-9]{27}$/;

  if (clerkUserIdPattern.test(trimmedPayload)) {
    return trimmedPayload;
  }

  return null;
};

export default function HackCheckInPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkInResult, setCheckInResult] = useState(null);

  const markAsCheckedIn = async (userId) => {
    try {
      const response = await fetch("/api/hackCheckIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      return await response.json();
    } catch (error) {
      console.error("Error checking user in:", error);
      return {
        success: false,
        message: "Failed to check in user",
      };
    }
  };

  const handleScanSuccess = async (qrPayload) => {
    const userId = parseUserIdFromQrPayload(qrPayload);

    if (!userId) {
      setCheckInResult({
        success: false,
        message: "Invalid QR code",
      });
      return;
    }

    setIsProcessing(true);
    setCheckInResult(null);

    const result = await markAsCheckedIn(userId);
    setCheckInResult(result);
    setIsProcessing(false);
  };

  return (
    <Box
      height="100%"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        pb: 10,
      }}
    >
      <Box
        mb={1.5}
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h4">Hackathon Check In Page</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          maxWidth: "500px",
          gap: 1.2,
        }}
      >
        <Alert severity="info" sx={{ width: "100%" }}>
          Scan an attendee QR code to mark them as checked in.
        </Alert>

        {isProcessing && (
          <Alert severity="info" sx={{ width: "100%" }}>
            Processing check-in...
          </Alert>
        )}

        {checkInResult && (
          <Alert
            severity={checkInResult.success ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {checkInResult.message}
          </Alert>
        )}

        <Box sx={{ width: "100%", marginTop: 1 }}>
          <QRScannerComponent onScanSuccess={handleScanSuccess} />
        </Box>
      </Box>
    </Box>
  );
}
