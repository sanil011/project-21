import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const AlertBox = () => {
  const showAlert = useSelector((store) => store.showAlert);

  return (
    showAlert.show && (
      <div className="fixed bottom-20 w-fit left-[50%] translate-x-[-50%] z-50">
        <Alert
          severity={showAlert.severity}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {showAlert.message}
        </Alert>
      </div>
    )
  );
};

export default AlertBox;
