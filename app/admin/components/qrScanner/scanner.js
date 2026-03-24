import React, { useEffect, useId, useRef, useState } from 'react';
import {
  Html5Qrcode,
  Html5QrcodeScannerState,
  Html5QrcodeSupportedFormats
} from 'html5-qrcode';
import { Alert, Box, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';

const QRScannerComponent = ({ onScanSuccess, onScanError, resetSignal = 0, scanContextKey = "" }) => {
  const scannerElementId = useId().replace(/:/g, '-');
  const [isScanning, setIsScanning] = useState(false);
  const isScanningRef = useRef(isScanning); // REF to track current scanning state
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [lastFrameUrl, setLastFrameUrl] = useState('');
  const scannerRef = useRef(null);
  const scannerDivRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const isMountedRef = useRef(false);
  const ignoreScanRef = useRef(false);
  const lastScannedRef = useRef(null);
  const scanningInProgressRef = useRef(false);
  const onScanSuccessRef = useRef(onScanSuccess);
  const onScanErrorRef = useRef(onScanError);
  const resumeTimeoutRef = useRef(null);

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
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  const finalizeStoppedState = () => {
    videoRef.current = null;
    setIsScanning(false);
    setIsPaused(false);
    setLastFrameUrl('');
  };

  const stopScannerInstance = async () => {
    clearResumeTimeout();
    ignoreScanRef.current = true;
    lastScannedRef.current = null;
    scanningInProgressRef.current = false;

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

  // Keep ref in sync with state
  useEffect(() => {
    isScanningRef.current = isScanning;
  }, [isScanning]);

  const resetScannerState = () => {
    clearResumeTimeout();
    setScanResult(null);
    setError(null);
    setIsPaused(false);
    setLastFrameUrl('');
    ignoreScanRef.current = false;
    lastScannedRef.current = null;
    scanningInProgressRef.current = false;

    if (videoRef.current) {
      scannerRef.current?.resume();
    }
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

    canvasRef.current = document.createElement('canvas');

    return () => {
      isMountedRef.current = false;
      stopScannerInstance().finally(() => {
        scannerRef.current = null;
        videoRef.current = null;
        canvasRef.current = null;
      });
    };
  }, [scannerElementId]);

  useEffect(() => {
    if (isScanning) {
      setTimeout(() => {
        const video = document.querySelector(`#${scannerElementId} video`);
        if (video) {
          videoRef.current = video;
        }
      }, 500);
    }
  }, [isScanning, scannerElementId]);

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

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const frameUrl = canvas.toDataURL('image/jpeg');
    setLastFrameUrl(frameUrl);
  };

  const isValidScan = (data) => {
    if (data === null || typeof data !== 'string') return false;
    const pattern = /^user_[a-zA-Z0-9]{27}$/;
    return pattern.test(data);
  };

  const pauseScanning = () => {
    captureFrame();
    setIsPaused(true);
    ignoreScanRef.current = true;

    if (videoRef.current) {
      try {
        scannerRef.current?.pause(true);
      } catch (error) {
        console.warn('Scanner pause skipped:', error?.message || error);
      }
    }
  };

  const resumeScanning = () => {
    setIsPaused(false);
    ignoreScanRef.current = false;
    setLastFrameUrl('');

    if (videoRef.current) {
      try {
        scannerRef.current?.resume();
      } catch (error) {
        console.warn('Scanner resume skipped:', error?.message || error);
      }
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
    setScanResult(null);
    ignoreScanRef.current = false;
    setIsPaused(false);
    setLastFrameUrl('');

    const config = {
      fps: 10,
      qrbox: { width: 180, height: 180 },
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    };

    const handleSuccess = async (decodedText) => {
      if (ignoreScanRef.current || scanningInProgressRef.current) return;
      if (lastScannedRef.current === decodedText) return;

      scanningInProgressRef.current = true;
      pauseScanning();

      if (!isValidScan(decodedText)) {
        scanningInProgressRef.current = false;
        resumeScanning();
        return;
      }

      lastScannedRef.current = decodedText;
      setScanResult(decodedText);

      try {
        await Promise.resolve(onScanSuccessRef.current?.(decodedText));
      } finally {
        clearResumeTimeout();
        resumeTimeoutRef.current = setTimeout(() => {
          if (!isMountedRef.current) {
            return;
          }

          resumeScanning();
          scanningInProgressRef.current = false;
          resumeTimeoutRef.current = null;
          console.log("Resuming scan after processing");
        }, 600);
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
      <div id={scannerElementId} ref={scannerDivRef} style={{ width: '275px', position: 'relative' }}>
        {isPaused && lastFrameUrl && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={lastFrameUrl}
                alt="Paused frame"
                fill
                style={{ objectFit: 'cover' }}
                loader={({ src }) => src}
                unoptimized={true}
                priority
              />
            </div>
            <div style={{ position: 'absolute', backgroundColor: 'rgba(0,0,0,0.5)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress color="info" />
            </div>
          </div>
        )}
      </div>

      <Box sx={{ mt: 2 }}>
        {!isScanning ? (
          <Button variant="contained" onClick={startScanner}>Start Scanner</Button>
        ) : (
          <Button variant="contained" onClick={stopScanner} disabled={isPaused}>Stop Scanner</Button>
        )}
      </Box>

      {isPaused && (
        <div style={{ marginTop: '6px', padding: '8px', backgroundColor: '#FEF9C3', border: '1px solid #F59E0B', color: '#92400E', borderRadius: '4px', textAlign: 'center' }}>
          Processing scan...
        </div>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2, maxWidth: 420 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default QRScannerComponent;
