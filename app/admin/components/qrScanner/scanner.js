import React, { useEffect, useId, useRef, useState } from 'react';
import {
  Html5Qrcode,
  Html5QrcodeScannerState,
  Html5QrcodeSupportedFormats
} from 'html5-qrcode';
import { Alert, Box, Button } from '@mui/material';
import swal from 'sweetalert';

const QRScannerComponent = ({
  onScanSuccess,
  onScanError,
  resetSignal = 0,
  scanContextKey = "",
  eventType = "",
  eventId = "",
}) => {
  const scannerElementId = useId().replace(/:/g, '-');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);
  const scannerRef = useRef(null);
  const scannerDivRef = useRef(null);
  const isMountedRef = useRef(false);
  const isProcessing = useRef(false);
  const lastScannedUser = useRef(null);
  const onScanSuccessRef = useRef(onScanSuccess);
  const onScanErrorRef = useRef(onScanError);
  const cooldownTimeoutRef = useRef(null);

  const createScannerInstance = () => {
    if (!scannerDivRef.current) {
      return null;
    }

    return new Html5Qrcode(scannerElementId);
  };

  const getFriendlyCameraError = (error) => {
    const message = `${error?.message || error || ''}`.toLowerCase();

    if (
      message.includes('notallowederror')
      || message.includes('permission')
      || message.includes('denied')
      || message.includes('access denied')
    ) {
      return 'Camera access was denied. Enable camera permission for this site in your browser settings, then try again.';
    }

    if (
      message.includes('notfounderror')
      || message.includes('device not found')
      || message.includes('no camera')
      || message.includes('could not start video source')
    ) {
      return 'No camera was found for this device or browser.';
    }

    return `Failed to start scanner: ${error?.message || error}`;
  };

  const clearResumeTimeout = () => {
    if (cooldownTimeoutRef.current) {
      clearTimeout(cooldownTimeoutRef.current);
      cooldownTimeoutRef.current = null;
    }
  };

  const finalizeStoppedState = () => {
    setIsScanning(false);
  };

  const stopScannerInstance = async () => {
    clearResumeTimeout();
    isProcessing.current = false;
    lastScannedUser.current = null;

    if (!scannerRef.current) {
      return;
    }

    try {
      const state = scannerRef.current.getState();

      if (
        state === Html5QrcodeScannerState.SCANNING
        || state === Html5QrcodeScannerState.PAUSED
      ) {
        await scannerRef.current.stop();
      }
    } catch (error) {
      console.warn('Scanner stop skipped:', error?.message || error);
    }

    try {
      scannerRef.current.clear();
    } catch (error) {
      console.warn('Scanner clear skipped:', error?.message || error);
    }
  };

  const resetScannerState = () => {
    clearResumeTimeout();
    setError(null);
    isProcessing.current = false;
    lastScannedUser.current = null;
  };

  const resetAndRecreateScanner = async () => {
    await stopScannerInstance();

    if (!isMountedRef.current) {
      return;
    }

    scannerRef.current = createScannerInstance();
    finalizeStoppedState();
    resetScannerState();
  };

  useEffect(() => {
    isMountedRef.current = true;

    scannerRef.current = createScannerInstance();

    return () => {
      isMountedRef.current = false;
      stopScannerInstance().finally(() => {
        scannerRef.current = null;
      });
    };
  }, [scannerElementId]);

  useEffect(() => {
    if (resetSignal === 0) return;
    resetAndRecreateScanner();
  }, [resetSignal]);

  useEffect(() => {
    if (!scanContextKey) return;
    resetAndRecreateScanner();
  }, [scanContextKey]);

  useEffect(() => {
    onScanSuccessRef.current = onScanSuccess;
  }, [onScanSuccess]);

  useEffect(() => {
    onScanErrorRef.current = onScanError;
  }, [onScanError]);

  const isValidScan = (data) => {
    if (data === null || typeof data !== 'string') return false;
    const pattern = /^user_[a-zA-Z0-9]{27}$/;
    return pattern.test(data);
  };

  const checkInToEvent = async (userId) => {
    try {
      const response = await fetch('/api/eventCheckIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, eventType, eventId }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        return {
          success: false,
          message: data?.message || 'Failed to record event check-in',
        };
      }

      return {
        success: true,
        message: data?.message || 'Check-in recorded',
      };
    } catch (error) {
      console.error('Event check-in request failed:', error);
      return {
        success: false,
        message: error?.message || 'Failed to record event check-in',
      };
    }
  };

  const startScanner = () => {
    if (!scannerRef.current) {
      scannerRef.current = createScannerInstance();
    }

    if (!scannerRef.current) {
      setError("Scanner not initialized.");
      return;
    }

    setError(null);
    isProcessing.current = false;
    lastScannedUser.current = null;

    const config = {
      fps: 10,
      qrbox: { width: 180, height: 180 },
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    };

    const handleSuccess = async (decodedText) => {
      if (isProcessing.current || decodedText === lastScannedUser.current) return;

      if (!isValidScan(decodedText)) {
        return;
      }

      isProcessing.current = true;
      lastScannedUser.current = decodedText;

      try {
        if (eventType) {
          if (eventType !== 'expo' && !eventId) {
            swal({
              title: 'Missing Event',
              text: 'Select an event before scanning attendees.',
              icon: 'warning',
              buttons: false,
              timer: 1500,
            });
          } else {
            const checkInResult = await checkInToEvent(decodedText);

            if (checkInResult.success) {
              swal({
                title: 'Success',
                text: checkInResult.message,
                icon: 'success',
                buttons: false,
                timer: 1500,
              });
            } else {
              swal({
                title: 'Check-In Failed',
                text: checkInResult.message,
                icon: 'error',
                buttons: false,
                timer: 1500,
              });
            }
          }
        }

        await Promise.resolve(onScanSuccessRef.current?.(decodedText));
      } finally {
        clearResumeTimeout();
        cooldownTimeoutRef.current = setTimeout(() => {
          if (!isMountedRef.current) {
            return;
          }

          isProcessing.current = false;
          lastScannedUser.current = null;
          cooldownTimeoutRef.current = null;
        }, 2000);
      }
    };

    const handleError = (scanError) => {
      if (onScanErrorRef.current) {
        onScanErrorRef.current(scanError);
      }
    };

    scannerRef.current.start(
      { facingMode: "environment" },
      config,
      handleSuccess,
      handleError
    ).then(() => {
      if (!isMountedRef.current) {
        return;
      }

      setIsScanning(true);
      console.log("Scanner started");
    }).catch((err) => {
      if (!isMountedRef.current) {
        return;
      }

      console.error("Error starting scanner:", err);
      setError(getFriendlyCameraError(err));
    });
  };

  const stopScanner = () => {
    if (scannerRef.current && isScanning) {
      stopScannerInstance().then(() => {
        if (!isMountedRef.current) {
          return;
        }

        scannerRef.current = createScannerInstance();
        finalizeStoppedState();
      });
    }
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      position: 'relative',
    }}>
      <div id={scannerElementId} ref={scannerDivRef} style={{ width: '275px', position: 'relative' }} />

      <Box sx={{ mt: 2 }}>
        {!isScanning ? (
          <Button variant="contained" onClick={startScanner}>Start Scanner</Button>
        ) : (
          <Button variant="contained" onClick={stopScanner}>Stop Scanner</Button>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mt: 2, maxWidth: 420 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default QRScannerComponent;
