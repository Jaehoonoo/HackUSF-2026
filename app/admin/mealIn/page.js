"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";
import QRScannerComponent from "../components/qrScanner/scanner";

export default function MealPage() {
  // NEW: Camera permission state
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  // State for dropdown selections
  const [currentMeal, setCurrentMeal] = useState("");
  const [currentMealGroup, setCurrentMealGroup] = useState("");

  // State for processing and results
  const [isProcessing, setIsProcessing] = useState(false);
  const [mealInResult, setMealInResult] = useState(null);

  // ✅ NEW: Check camera permission on mount
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

  const markAsMealed = async (userId, currentMeal, currentMealGroup) => {
    try {
      const response = await fetch(`/api/mealCheckIn`, {
        method: "POST",
        body: JSON.stringify({
          userId: userId,
          currentMeal: currentMeal,
          currentMealGroup: currentMealGroup
        })
      });
      return await response.json();
    } catch (error) {
      console.error("Error marking user as Mealed:", error);
      return null;
    }
  };

  const handleScanSuccess = async (userId) => {
    if (!currentMeal || !currentMealGroup) {
      setMealInResult({
        success: false,
        message: "Please select both meal type and location group before scanning"
      });
      return;
    }

    setIsProcessing(true);
    setMealInResult(null);

    const result = await markAsMealed(userId, currentMeal, currentMealGroup);
    setMealInResult(result);

    setIsProcessing(false);
  };

  const handleMealChange = (event) => {
    setCurrentMeal(event.target.value);
  };

  const handleGroupChange = (event) => {
    setCurrentMealGroup(event.target.value);
  };

  return (
    <Box height="100%" sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 2,
      pb: 10
    }}>
      <Box mb={1.5} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">Meal Check In Page</Typography>
      </Box>

      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "500px",
        gap: 1.2
      }}>
        {/* Dropdowns */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="meal-type-label">Meal</InputLabel>
            <Select
              labelId="meal-type-label"
              value={currentMeal}
              onChange={handleMealChange}
              label="Meal"
            >
              <MenuItem value="lunch1">Lunch 1</MenuItem>
              <MenuItem value="dinner">Dinner</MenuItem>
              <MenuItem value="midnightSnack">MidnightSnack</MenuItem>
              <MenuItem value="breakfast">Breakfast</MenuItem>
              <MenuItem value="lunch2">Lunch 2</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="meal-group-label">Group Name</InputLabel>
            <Select
              labelId="meal-group-label"
              value={currentMealGroup}
              onChange={handleGroupChange}
              label="Group Name"
            >
              <MenuItem value="Primordials">Primordials</MenuItem>
              <MenuItem value="Olympians">Olympians</MenuItem>
              <MenuItem value="Titans">Titans</MenuItem>
              <MenuItem value="Daemones">Daemones</MenuItem>
              <MenuItem value="Demigods">Demigods</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Status messages */}
        {(!currentMeal || !currentMealGroup) && (
          <Alert severity="info" sx={{ width: "100%" }}>
            Please select both meal type and group before scanning
          </Alert>
        )}

        {isProcessing && (
          <Alert severity="info" sx={{ width: "100%" }}>
            Processing check-in...
          </Alert>
        )}

        {mealInResult && (
          <Alert severity={mealInResult.success ? "success" : "error"} sx={{ width: "100%" }}>
            {mealInResult.message}
          </Alert>
        )}

        {/* 🚨 NEW: Camera handling */}
        <Box sx={{ width: "100%", marginTop: 1 }}>
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
              scanContextKey={`${currentMeal}|${currentMealGroup}`}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}