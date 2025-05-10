import { Box } from "@mui/material";
import { ArrowBackIos } from "@mui/icons-material";
import { logo } from "../../../images";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const CommonHeader = () => {
  // Get the current pathname
  const location = useLocation();
  const pathname = location.pathname;

  // Conditionally set the background color
  const backgroundColor = pathname.includes("virtual-games/dice") ? "#342e3d" : "#2b3270";

  return (
    <Box className="w-full relative" style={{ backgroundColor }}>
      <Link to="/" className="absolute top-3 left-5">
        <ArrowBackIos sx={{ color: "white" }} />
      </Link>
      <img src={logo} alt="Play247" className="h-10 mx-auto rounded-lg pt-1" />
    </Box>
  );
};

export default CommonHeader;
