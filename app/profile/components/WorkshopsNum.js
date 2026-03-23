"use client";

import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

export default function WorkshopsNum({ userId }) {
  const [workshopsNum, setWorkshopsNum] = useState(0);
  const [checkIn, setCheckIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchWorkshopsData = async () => {
      try {
        const response = await fetch(`/api/getWorkshopsNum?userId=${userId}`);
        const data = await response.json();
        
        if (data.success) {
          setWorkshopsNum(data.workshopsNum);
          setCheckIn(data.checkIn);
        }
      } catch (error) {
        console.error("Error fetching workshops data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkshopsData();
  }, [userId]);

  // Only display if the user has checked in
  if (isLoading || checkIn !== true) return null;

  return (
    <Box
      sx={{
        mt: { xs: 2, sm: 3 },
        p: { xs: 2, sm: 3 },
        textAlign: "center",
        borderRadius: 5,
        border: "3px solid #fbb728",
        bgcolor: "rgba(251, 183, 40, 0.08)",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#fbb728",
          fontWeight: 700,
          mb: 1,
        }}
      >
        Workshops Attended
      </Typography>
      <Typography
        variant="h4"
        sx={{
          color: "#8e4110ff",
          fontWeight: 800,
        }}
      >
        {workshopsNum}
      </Typography>
    </Box>
  );
}
