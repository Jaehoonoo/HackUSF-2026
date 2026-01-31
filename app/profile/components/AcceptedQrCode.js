"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Modal,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import QRCode from "qrcode";

export default function AcceptedQrCode({
  isVisible,
  userId,
  mealGroup,
  isMealGroupLoading,
}) {
  const [qrCode, setQrCode] = useState("");
  const [qrCodeLarge, setQrCodeLarge] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (!isVisible) {
      setQrCode("");
      setQrCodeLarge("");
      return;
    }
    if (!userId) return;

    // Generate regular QR code
    QRCode.toDataURL(userId, {
      errorCorrectionLevel: "H",
      width: 200,
      margin: 1,
    })
      .then(setQrCode)
      .catch((error) => console.error("QR Code Generation Error:", error));

    // Generate larger QR code for modal
    QRCode.toDataURL(userId, {
      errorCorrectionLevel: "H",
      width: 400,
      margin: 2,
    })
      .then(setQrCodeLarge)
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
      {isMealGroupLoading ? (
        <Typography
          variant="body1"
          sx={{
            mb: 1.5,
            color: "text.secondary",
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.15rem" },
          }}
        >
          Assigning your meal group...
        </Typography>
      ) : mealGroup ? (
        <Typography
          variant="body1"
          sx={{
            mb: 1.5,
            color: "#385BB2",
            fontWeight: 700,
            fontSize: { xs: "1rem", sm: "1.15rem" },
          }}
        >
          Group: {mealGroup}
        </Typography>
      ) : null}
      <Typography variant="body2" sx={{ mb: 2, color: "text.secondary" }}>
        This QR code will be used for hackathon and food check-in.
      </Typography>

      {isMobile ? (
        <>
          <Button
            onClick={() => setModalOpen(true)}
            sx={{
              p: 0,
              minWidth: 0,
              borderRadius: 3,
              "&:hover": {
                opacity: 0.8,
              },
            }}
          >
            <Box
              component="img"
              src={qrCode}
              alt="QR code for your HackUSF acceptance"
              sx={{
                width: 160,
                height: 160,
                borderRadius: 3,
                border: "1px solid rgba(0, 0, 0, 0.1)",
                bgcolor: "white",
                p: 1,
                cursor: "pointer",
              }}
            />
          </Button>
          <Typography
            variant="caption"
            sx={{
              mt: 1,
              color: "text.secondary",
              fontStyle: "italic",
              display: "block",
            }}
          >
            Tap to enlarge
          </Typography>
        </>
      ) : (
        <Box
          component="img"
          src={qrCode}
          alt="QR code for your HackUSF acceptance"
          sx={{
            width: 200,
            height: 200,
            borderRadius: 3,
            border: "1px solid rgba(0, 0, 0, 0.1)",
            bgcolor: "white",
            p: 1,
          }}
        />
      )}

      {/* Modal for larger QR code on mobile */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            bgcolor: "background.paper",
            borderRadius: 4,
            p: 3,
            maxWidth: "90vw",
            maxHeight: "90vh",
            outline: "none",
            textAlign: "center",
          }}
        >
          <IconButton
            onClick={() => setModalOpen(false)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "text.secondary",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ fontWeight: 700, mb: 2, fontSize: "1.2rem" }}>
            Your check-in QR
          </Typography>
          {mealGroup && (
            <Typography
              variant="body1"
              sx={{
                mb: 2,
                color: "#385BB2",
                fontWeight: 700,
                fontSize: "1.1rem",
              }}
            >
              Group: {mealGroup}
            </Typography>
          )}
          <Box
            component="img"
            src={qrCodeLarge}
            alt="QR code for your HackUSF acceptance"
            sx={{
              width: "100%",
              maxWidth: 400,
              height: "auto",
              borderRadius: 3,
              border: "1px solid rgba(0, 0, 0, 0.1)",
              bgcolor: "white",
              p: 2,
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
}
