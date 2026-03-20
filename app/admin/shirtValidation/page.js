// /app/admin/workshopIn/page.js
"use client";

import { Container, Typography, Box } from "@mui/material";

export default function WorkshopInPlaceholder() {
  return (
    <Container maxWidth="sm" sx={{ py: 6, textAlign: "center" }}>
      <Box>
        <Typography variant="h4" sx={{ mb: 4, fontWeight: 700 }}>
          Workshop Scanner
        </Typography>
        <Typography variant="body1" sx={{ fontStyle: "italic" }}>
          🚧 In process – coming soon!
        </Typography>
      </Box>
    </Container>
  );
}