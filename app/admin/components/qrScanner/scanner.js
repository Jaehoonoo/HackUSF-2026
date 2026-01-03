import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Box, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';

const QRScannerComponent = ({ onScanSuccess, onScanError, resetSignal = 0, scanContextKey = "" }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [lastFrameUrl, setLastFrameUrl] = useState('');
  const [frameDimensions, setFrameDimensions] = useState({ width: 275, height: 180 });
  const scannerRef = useRef(null);
  const scannerDivRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const ignoreScanRef = useRef(false);
  const lastScannedRef = useRef(null);
  const scanningInProgressRef = useRef(false);
  const onScanSuccessRef = useRef(onScanSuccess);
  const onScanErrorRef = useRef(onScanError);

  const resetScannerState = () => {
    setScanResult(null);
    setError(null);
    setIsPaused(false);
    setLastFrameUrl('');
    ignoreScanRef.current = false;
    lastScannedRef.current = null;
    scanningInProgressRef.current = false;

    if (videoRef.current) {
      videoRef.current.play();
    }
  };



  // Initialize scanner when component mounts
  useEffect(() => {
    if (scannerDivRef.current) {
      scannerRef.current = new Html5Qrcode('qr-reader');
    }

    // Create canvas for screenshot
    canvasRef.current = document.createElement('canvas');

    // Cleanup on unmount
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => { });
      }
    };
  }, []);


  // Find and store the video element after scanner starts
  useEffect(() => {
    if (isScanning) {
      // Find the video element created by Html5Qrcode
      setTimeout(() => {
        const video = document.querySelector('#qr-reader video');
        if (video) {
          videoRef.current = video;
        }
      }, 500);
    }
  }, [isScanning]);

  useEffect(() => {
    if (resetSignal === 0) return;
    resetScannerState();
  }, [resetSignal]);

  useEffect(() => {
    if (!scanContextKey) return;
    resetScannerState();
  }, [scanContextKey]);

  useEffect(() => {
    onScanSuccessRef.current = onScanSuccess;
  }, [onScanSuccess]);

  useEffect(() => {
    onScanErrorRef.current = onScanError;
  }, [onScanError]);

  // Function to capture current frame
  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    setFrameDimensions({ width: video.videoWidth, height: video.videoHeight });

    // Draw current video frame to canvas
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL
    const frameUrl = canvas.toDataURL('image/jpeg');
    setLastFrameUrl(frameUrl);
  };

  const isValidScan = (data) => {
    if (data === null || typeof data !== 'string') {
      return false;
    }

    const pattern = /^user_[a-zA-Z0-9]{27}$/;
    return pattern.test(data);
  };

  const pauseScanning = () => {
    // Capture current frame before pausing
    captureFrame();

    setIsPaused(true);
    ignoreScanRef.current = true;

    // Pause video playback if available
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const resumeScanning = () => {
    setIsPaused(false);
    ignoreScanRef.current = false;
    setLastFrameUrl('');

    // Resume video playback if available
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const startScanner = () => {
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
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
    };

    const handleSuccess = (decodedText, decodedResult) => {
      if (ignoreScanRef.current || scanningInProgressRef.current) return;

      // Prevent re-processing

      // Prevent repeated calls with the same scanned value
      if (lastScannedRef.current === decodedText) {
        return;
      }
      scanningInProgressRef.current = true;

      console.log("Scan detected:", decodedText);
      pauseScanning();

      if (isValidScan(decodedText)) {
        lastScannedRef.current = decodedText;
        setScanResult(decodedText);

        if (onScanSuccessRef.current) {
          onScanSuccessRef.current(decodedText);
        }
      }

      // Resume after delay
      setTimeout(() => {
        lastScannedRef.current = null; // Allow new scans
        resumeScanning();
        scanningInProgressRef.current = false;
        console.log("Resuming scan after processing");
      }, 2000); // 2 second pause
    };


    const handleError = (error) => {
      if (onScanErrorRef.current) {
        onScanErrorRef.current(error);
      }
    };

    scannerRef.current.start(
      { facingMode: "environment" },
      config,
      handleSuccess,
      handleError
    ).then(() => {
      setIsScanning(true);
      console.log("Scanner started");
    }).catch((err) => {
      console.error("Error starting scanner:", err);
      setError(`Failed to start scanner: ${err.message || err}`);
    });
  };

  const stopScanner = () => {
    if (scannerRef.current && isScanning) {
      scannerRef.current.stop().then(() => {
        setIsScanning(false);
        setIsPaused(false);
        setLastFrameUrl('');
      }).catch((err) => {
        console.error("Error stopping scanner:", err);
        // Force update UI state even on error
        setIsScanning(false);
        setIsPaused(false);
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
      <div id="qr-reader" ref={scannerDivRef} style={{ width: '275px', position: 'relative' }}>
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
            {/* Next.js Image component for optimized image loading */}
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={lastFrameUrl}
                alt="Paused frame"
                fill
                style={{ objectFit: 'cover' }}
                // Enable base64 data URLs
                loader={({ src }) => src}
                unoptimized={true}
                priority
              />
            </div>
            <div style={{
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.5)',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CircularProgress color="info" />
            </div>
          </div>
        )}
      </div>

      <Box sx={{ mt: 2 }}>
        {!isScanning ? (
          <Button
            variant="contained"
            onClick={startScanner}
          >
            Start Scanner
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={stopScanner}
            disabled={isPaused}
          >
            Stop Scanner
          </Button>
        )}
      </Box>

      {isPaused && (
        <div style={{
          marginTop: '6px',
          padding: '8px',
          backgroundColor: '#FEF9C3',
          border: '1px solid #F59E0B',
          color: '#92400E',
          borderRadius: '4px',
          textAlign: 'center'
        }}>
          Processing scan...
        </div>
      )}
    </Box>
  );
};

export default QRScannerComponent;
