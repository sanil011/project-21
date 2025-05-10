import { CircularProgress, Backdrop, Box } from "@mui/material";

function Loader() {
  return (
    // Loader Container
    <Box className="flex justify-center items-center w-full h-full">
      {/* Loader Shadow */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={true}
      >
        {/* Loader */}
        <CircularProgress />
      </Backdrop>
    </Box>
  );
}

export default Loader;
