"use client";

import { Box, Typography, Button, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    setTimeout(() => {
      setEmail("");
    }, 1000);
  };

  return (
    <Box height="100vh">
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box></Box>
        <Box textAlign="left">
          <Typography
            variant="h1"
            fontWeight="600"
            fontSize={{
              xs: "42px",
              sm: "64px",
            }}
          >
            HackUSF 2026
          </Typography>
          <Typography
            variant="h4"
            pb={4}
            fontSize={{
              xs: "30px",
              sm: "48px",
            }}
          >
            April 4 - 5
          </Typography>
          <Typography
            variant="h5"
            pb={1}
            fontSize={{
              xs: "16px",
              sm: "20px",
            }}
          >
            Get notified when we open applications!
          </Typography>
          <Box
            component="form"
            action="https://docs.google.com/forms/d/e/1FAIpQLSeQG0imBZ1zCKKiWMoTMpoAe08RfrqqXD7KQlEDj5EUxSgCaA/formResponse"
            method="POST"
            target="_blank"
            onSubmit={handleSubmit}
            width="100%"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              gap={1}
              width="100%"
              flexDirection={{
                xs: "column",
                sm: "row",
              }}
            >
              <TextField
                name="entry.926826217"
                type="email"
                label="Email"
                variant="outlined"
                size="small"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  width: {
                    xs: "100%",
                    sm: "100%",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  width: {
                    xs: "100%",
                    sm: "40%",
                  },
                }}
              >
                Notify me
              </Button>
            </Box>
          </Box>
        </Box>
        {/* Footer */}
        <Box pb={1.5}>
          <Typography>
            Interested in sponsoring us? Contact us at{" "}
            <a href="mailto:gdscatusf@gmail.com">gdscatusf@gmail.com</a>.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
