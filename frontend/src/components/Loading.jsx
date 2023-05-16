import { Box, CircularProgress } from "@mui/material";

export const FullLoading = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};
