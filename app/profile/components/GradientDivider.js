
import { Box } from "@mui/material";

export default function GradientDivider() {
  return (
    <Box
      sx={{
        height: 20,
        backgroundImage:
          "linear-gradient(180deg, #385BB2 0%, rgba(56, 91, 178, 0.25) 60%, transparent 100%)",
      }}
    />
  );
}
