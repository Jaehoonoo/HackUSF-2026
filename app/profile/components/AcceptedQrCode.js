"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import QRCode from "qrcode";

export default function AcceptedQrCode({ isVisible, userId }) {
  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (!isVisible) {
      setQrCode("");
      return;
    }
    if (!userId) return;

    QRCode.toDataURL(userId, {
      errorCorrectionLevel: "H",
      width: 200,
      margin: 1,
    })
      .then(setQrCode)
      .catch((error) => console.error("QR Code Generation Error:", error));
  }, [isVisible, userId]);

  if (!isVisible || !qrCode) return null;

  return (
    <Box
      sx={{
        mt: { xs: 2, sm: 3 },
        p: { xs: 2, sm: 3 },
        textAlign: "center",
        borderRadius: 5,
        border: "2px dashed #4A7BA7",
        bgcolor: "rgba(74, 123, 167, 0.08)",
      }}
    >
      <Typography sx={{ fontWeight: 700, mb: 1 }}>
        Your check-in QR
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
        This qrcode will be use for hackathon and food check-in.
      </Typography>
      <Box
        component="img"
        src={qrCode}
        alt="QR code for your HackUSF acceptance"
        sx={{
          width: { xs: 160, sm: 200 },
          height: { xs: 160, sm: 200 },
          borderRadius: 3,
          border: "1px solid rgba(0, 0, 0, 0.1)",
          bgcolor: "white",
          p: 1,
        }}
      />
    </Box>
  );
}
