import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { Box, Button, CircularProgress } from '@mui/material';
import Image from 'next/image';

const QRScannerComponent = ({ onScanSuccess, onScanError, resetSignal = 0, scanContextKey = "" }) => {
  const [isScanning, setIsScanning] = useState(false);
  const isScanningRef = useRef(isScanning); // REF to track current scanning state
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

  // Keep ref in sync with state
  useEffect(() => {
    isScanningRef.current = isScanning;
  }, [isScanning]);

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

  useEffect(() => {
    if (scannerDivRef.current) {
      scannerRef.current = new Html5Qrcode('qr-reader');
    }

    canvasRef.current = document.createElement('canvas');

    return () => {
      if (scannerRef.current && isScanningRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  useEffect(() => {
    if (isScanning) {
      setTimeout(() => {
        const video = document.querySelector('#qr-reader video');
        if (video) videoRef.current = video;
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

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    setFrameDimensions({ width: video.videoWidth, height: video.videoHeight });

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
    if (videoRef.current) videoRef.current.pause();
  };

  const resumeScanning = () => {
    setIsPaused(false);
    ignoreScanRef.current = false;
    setLastFrameUrl('');
    if (videoRef.current) videoRef.current.play();
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
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    };

    const handleSuccess = (decodedText) => {
      if (ignoreScanRef.current || scanningInProgressRef.current) return;
      if (lastScannedRef.current === decodedText) return;

      scanningInProgressRef.current = true;
      pauseScanning();

      if (isValidScan(decodedText)) {
        lastScannedRef.current = decodedText;
        setScanResult(decodedText);
        onScanSuccessRef.current?.(decodedText);
      }

      setTimeout(() => {
        lastScannedRef.current = null;
        resumeScanning();
        scanningInProgressRef.current = false;
      }, 2000);
    };

    const handleError = (err) => {
      onScanErrorRef.current?.(err);
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
    if (scannerRef.current && isScanningRef.current) {
      scannerRef.current.stop().then(() => {
        setIsScanning(false);
        setIsPaused(false);
        setLastFrameUrl('');
      }).catch((err) => {
        console.error("Error stopping scanner:", err);
        setIsScanning(false);
        setIsPaused(false);
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', position: 'relative' }}>
      <div id="qr-reader" ref={scannerDivRef} style={{ width: '275px', position: 'relative' }}>
        {isPaused && lastFrameUrl && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image src={lastFrameUrl} alt="Paused frame" fill style={{ objectFit: 'cover' }} loader={({ src }) => src} unoptimized priority />
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
    </Box>
  );
};

export default QRScannerComponent;