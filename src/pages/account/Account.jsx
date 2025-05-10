import { Autorenew, ContentCopy, PowerSettingsNew } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { accountActions, histories, serviceCenter } from "../../data";
import { Link } from "react-router-dom";
import { winnerTwo } from "../../images";
import { authService } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { alertActions, userDataActions } from "../../store";
import SettingPannel from "./components/SettingPannel";
import CopyIcon from "./copy-icon";
const Account = () => {
  const { name, id, balance } = useSelector(store => store.userData)
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(userDataActions.updateUser())
    dispatch(
      alertActions.showAlert({
        show: true,
        message: "Logout successfully",
        severity: "success",
      })
    );

    setTimeout(() => {
      dispatch(alertActions.showAlert());
    }, 3000);
  };

  return (
    <div className="relative bg-[#22275b]">
      
      <div className="bg-[#2b3270] h-60 rounded-b-3xl pt-6 ">
        <div className="flex gap-5 items-center ml-4">
          <img
            src={winnerTwo}
            alt="User Avatar"
            className="h-20 w-20 rounded-full"
          />
          <div>
            <p className="text-white font-semibold mb-1">{name}</p>
            <Button
              endIcon={<CopyIcon />}
              sx={{
                backgroundColor: "orange",
                color: "white",
                borderRadius: "50px",
                fontSize: "12px",
                padding: "1px 12px",
              }}
              variant="contained"
            >
              UID | {id}
            </Button>
            {/* <div className="text-white mt-2">{new Date().toLocaleString()}</div> */}
          </div>
        </div>
      </div>

      <div className="bg-[#374992] m-4 -mt-28 rounded-xl p-4 z-50">
        <p className="text-gray-300 text-lg">Total Balance</p>
        <div className="flex items-center text-white">
          <Typography  style={{ fontFamily: 'Inter, sans-serif',fontWeight: 500 }} fontSize="18px">₹{balance.toFixed(2)}</Typography>
          <Button class>
            <Autorenew sx={{ 
              color: "white",
              marginLeft: "8px",
              paddingBottom: "4px" }} />
          </Button>
        </div>
        <div className="grid grid-cols-3 mt-3">
          {accountActions.map((action) => (
            <Button key={action.id} component={Link} to={`/account/${id}${action.url}`}>
              <div className="flex flex-col gap-1 justify-center items-center text-white">
                {action.icon}
                {action.name}
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 m-4 gap-4">
        {histories.map((history) => (
          <Box
            key={history.id}
            component={Link}
            to={`/account/${id}${history.url}`}
            className="bg-[#2b3270] p-2 rounded-md flex gap-2 items-center w-full"
          >
            {history.icon}
            <div>
              <h1 className="text-white text-base">{history.title}</h1>
              <p className="text-xs text-gray-300">{history.description}</p>
            </div>
          </Box>
        ))}
      </div>
      <SettingPannel/>
      <div className="p-3 bg-[#2b3270] mt-4 mx-4 rounded-2xl shadow-md">
        <Typography variant="h6" sx={{ color: "white" }}>
          Service Center
        </Typography>
        <div className="grid grid-cols-3">
          {serviceCenter.map((service) => (
            <Link
              to={
                service.title === "Settings"
                  ? `/account/${id}${service.url}`
                  : service.url
              }
              key={service.id}
              className="flex flex-col items-center gap-2 my-3 text-gray-300 text-sm w-full"
            >
              {service.icon}

              <h1 className="text-center text-xs">
                {service.title}
              </h1>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center my-8 mx-4">
        <Button
          variant="outlined"
          startIcon={<PowerSettingsNew sx={{ fontSize: "1.3rem" }} />}
          onClick={handleLogout}
          sx={{
            borderRadius: "50px",
            paddingInline: "50px",
            py: "2px",
            borderColor: "#61a9ff",
            color: "#61a9ff",
            fontFamily: "Inter, sans-serif",
            width: "100%",
            textTransform: "capitalize",
            fontSize: "1.3rem", // Increase text size
          }}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Account;
