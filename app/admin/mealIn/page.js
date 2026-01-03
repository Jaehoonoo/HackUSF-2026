"use client";

import { useState } from "react";
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
  // State for dropdown selections
  const [currentMeal, setCurrentMeal] = useState("");
  const [currentMealGroup, setCurrentMealGroup] = useState("");

  // State for processing and results
  const [isProcessing, setIsProcessing] = useState(false);
  const [mealInResult, setMealInResult] = useState(null);

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

  // This function will be called when QR is successfully scanned
  const handleScanSuccess = async (userId) => {
    // Validate that meal and group are selected
    if (!currentMeal || !currentMealGroup) {
      setMealInResult({
        success: false,
        message: "Please select both meal type and location group before scanning"
      });
      return;
    }

    setIsProcessing(true);
    setMealInResult(null);

    console.log(`Processing check-in for user: ${userId}`);
    console.log(`Meal: ${currentMeal}, Group: ${currentMealGroup}`);

    const result = await markAsMealed(userId, currentMeal, currentMealGroup);
    setMealInResult(result);

    setIsProcessing(false);
  };

  // const handleScanError = (error) => {
  //     // console.error("Scanning error:", error);
  //     setCheckInResult({
  //         success: false,
  //         message: `Scanning error: ${error}`
  //     });
  // };

  // Handle dropdown changes
  const handleMealChange = (event) => {
    setCurrentMeal(event.target.value);
    // setMealInResult(null);
  };

  const handleGroupChange = (event) => {
    setCurrentMealGroup(event.target.value);
    // setMealInResult(null);
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
      {/* Header */}
      <Box mb={1.5} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">Meal Check In Page</Typography>
      </Box>

      {/* Main Container */}
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "500px",
        gap: 1.2
      }}>
        {/* Dropdown Menus */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="meal-type-label">Meal</InputLabel>
            <Select
              labelId="meal-type-label"
              id="meal-type"
              label="Meal"
              value={currentMeal}
              onChange={handleMealChange}
              variant="outlined">
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
              id="group"
              label="Group Name"
              value={currentMealGroup}
              onChange={handleGroupChange}
              variant="outlined">
              <MenuItem value="Gods">Gods</MenuItem>
              <MenuItem value="Group 1">Group 1</MenuItem>
              <MenuItem value="Group 2">Group 2</MenuItem>
              <MenuItem value="Group 3">Group 3</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Status Messages */}
        {(!currentMeal || !currentMealGroup) && (
          <Alert severity="info" sx={{ width: "100%" }}>
            Please select both meal type and location group before scanning
          </Alert>
        )}

        {isProcessing && (
          <Alert severity="info" sx={{ width: "100%" }}>
            Processing check-in...
          </Alert>
        )}

        {mealInResult && (
          <Alert
            severity={mealInResult.success ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {mealInResult.message}
          </Alert>
        )}

        {/* QR Scanner */}
        <Box sx={{ width: "100%", marginTop: 1 }}>
          <QRScannerComponent
            onScanSuccess={handleScanSuccess}
          // onScanError={handleScanError}
          />
        </Box>
      </Box>
    </Box>
  );
}
