import { Box, Container } from "@mui/material";
import ApplicationProgress from "./components/ApplicationProgress";
import GradientDivider from "./components/GradientDivider";
import ProfileHeader from "./components/ProfileHeader";

export default function Page() {
  return (
    <Box
      className="profile-page"
      sx={{ minHeight: "100dvh", pb: { xs: 3, sm: 6 } }}
    >
      <ProfileHeader />
      {/* <GradientDivider /> */}

      <Container maxWidth="md" sx={{ mt: { xs: 2, sm: 4 }, mb: 0 }}>
        <ApplicationProgress />
      </Container>
    </Box>
  );
}
