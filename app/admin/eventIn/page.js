// /app/admin/eventIn/page.js
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Alert,
  Button,
  Box,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import QRScannerComponent from "../components/qrScanner/scanner";

// TODO: Replace with real event info
const EVENTS = [
  { id: "react_101", name: "React Workshop", type: "workshop" },
  { id: "nextjs_deep_dive", name: "Next.js Deep Dive", type: "workshop" },
  { id: "ai_demo_day", name: "AI Demo Day", type: "event" },
  { id: "founder_panel", name: "Founder Panel", type: "event" },
];

export default function EventInPage() {
  const [eventType, setEventType] = useState("");
  const [eventId, setEventId] = useState("");

  const filteredEvents = useMemo(() => {
    if (!eventType || eventType === "expo") {
      return [];
    }

    return EVENTS.filter((eventItem) => eventItem.type === eventType);
  }, [eventType]);

  const shouldRenderScanner = eventType === "expo" || (eventType && eventId);

  const handleEventTypeChange = (nextEventType) => {
    setEventType(nextEventType);
    setEventId("");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button component={Link} href="/admin" variant="outlined" sx={{ alignSelf: "flex-start" }}>
          Back to Admin
        </Button>

        <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "center" }}>
          Event Check-In Scanner
        </Typography>

        <Alert severity="info">
          Choose the event details first, then scan attendee QR codes.
        </Alert>

        <FormControl fullWidth>
          <InputLabel id="event-type-label">Event Type</InputLabel>
          <Select
            labelId="event-type-label"
            label="Event Type"
            value={eventType}
            onChange={(event) => handleEventTypeChange(event.target.value)}
          >
            <MenuItem value="">
              <em>Select Type</em>
            </MenuItem>
            <MenuItem value="workshop">Workshop</MenuItem>
            <MenuItem value="event">Event</MenuItem>
            <MenuItem value="expo">Company Expo</MenuItem>
          </Select>
        </FormControl>

        {eventType !== "expo" && (
          <FormControl fullWidth disabled={!eventType}>
            <InputLabel id="event-id-label">Event ID</InputLabel>
            <Select
              labelId="event-id-label"
              label="Event ID"
              value={eventId}
              onChange={(event) => setEventId(event.target.value)}
            >
              <MenuItem value="">
                <em>Select Event</em>
              </MenuItem>
              {filteredEvents.map((eventItem) => (
                <MenuItem key={eventItem.id} value={eventItem.id}>
                  {eventItem.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {!shouldRenderScanner && (
          <Alert severity="warning">
            Select an event type and event ID to enable scanning.
          </Alert>
        )}

        {shouldRenderScanner && (
          <Box sx={{ mt: 1 }}>
            <QRScannerComponent
              eventType={eventType}
              eventId={eventId}
              scanContextKey={`${eventType}:${eventId}`}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}