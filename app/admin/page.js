// /app/admin/page.js
"use client";

import Link from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";

export default function AdminDashboardHome() {
  return (
    <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
        Admin Dashboard
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Button to CheckIn */}
        <Link href="/admin/checkIn">
          <Button variant="contained" size="large">
            Check In
          </Button>
        </Link>

        {/* Button to Meal Scanner */}
        <Link href="/admin/mealIn">
          <Button variant="contained" size="large">
            Meal Scanner
          </Button>
        </Link>

        {/* Button to Event Scanner */}
        <Link href="/admin/eventIn">
          <Button variant="contained" size="large">
            Event Scanner
          </Button>
        </Link>

         {/* Button to T-Shirt Validation */}
        <Link href="/admin/shirtValidation">
          <Button variant="contained" size="large">
            Shirt Validation
          </Button>
        </Link>
      </Box>
    </Container>
  );
}