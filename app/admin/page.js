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
        {/* Button to User Management */}
        <Link href="/admin/users">
          <Button variant="contained" size="large">
            User Management
          </Button>
        </Link>

        {/* Button to Meal Scanner */}
        <Link href="/admin/mealIn">
          <Button variant="contained" size="large">
            Meal Scanner
          </Button>
        </Link>

        {/* Button to Workshop Scanner */}
        <Link href="/admin/workshopIn">
          <Button variant="contained" size="large">
            Workshop Scanner
          </Button>
        </Link>
      </Box>
    </Container>
  );
}