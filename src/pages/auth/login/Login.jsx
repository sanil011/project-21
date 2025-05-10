import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { userDataActions, alertActions } from "../../../store";
import {
  AppBar,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../../utils";
import { CommonHeader } from "../../../components";
import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  VpnKeyOutlined,
  SupportAgent,
} from "@mui/icons-material";

const Login = () => {
  const [passwordType, setPasswordType] = useState("password");
  const [loginError, setLoginError] = useState(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordType = () => {
    setPasswordType((prev) => (prev === "password" ? "text" : "password"));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await authService.login({
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    });

    if (response) {
      dispatch(
        alertActions.showAlert({
          show: true,
          message: response.message,
          severity: response.severity,
        })
      );

      if (response.severity === "success" && response.data) {
        dispatch(userDataActions.updateUser(response.data));
        localStorage.setItem("confirmation-modal", "false");
        localStorage.setItem("lucky-game-user", JSON.stringify(response.data));
        // console.log(response.data.accountStatus);
        setLoginError(null); // Clear error if login successful
        if (response.data.accountStatus === "NEW") {
          navigate(`/change-password`);
        } else if (response.data.accountStatus === "ACTIVE") {
          navigate("/");
        }
      } else {
        setLoginError("Invalid username or password");
      }

      setTimeout(() => {
        dispatch(alertActions.showAlert());
      }, 3000);
    }
  };

  return (
    <div className="h-full w-full text-white">
      <AppBar position="static" sx={{ backgroundColor: "#22275b" }}>
        <CommonHeader />
        <Box className="bg-[#2b3270] p-4">
          <Typography variant="h5" pl={1}>
            Login
          </Typography>
          <Typography variant="body2" mt={1} pl={1}>
            Please login with your username and password. If you forgot your
            password, please contact customer service.
          </Typography>
        </Box>
      </AppBar>

      <form
        onSubmit={handleLogin}
        className="w-full flex flex-col items-center px-6 py-16 gap-6"
      >
        {loginError && (
          <Typography
            sx={{
              color: "red",
              fontSize: "0.95rem",
              fontWeight: 500,
              textAlign: "center",
              maxWidth: 500,
              width: "100%",
            }}
          >
            {loginError}
          </Typography>
        )}

        <TextField
          inputRef={usernameRef}
          label="Username"
          variant="outlined"
          required
          fullWidth
          autoComplete="off"
          spellCheck={false}
          placeholder="Enter username"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 500,
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />

        <TextField
          inputRef={passwordRef}
          label="Password"
          variant="outlined"
          required
          fullWidth
          autoComplete="off"
          spellCheck={false}
          type={passwordType}
          placeholder="Enter password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={togglePasswordType}>
                  {passwordType === "text" ? (
                    <Visibility sx={{ color: "white" }} />
                  ) : (
                    <VisibilityOff sx={{ color: "white" }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 500,
            "& .MuiInputLabel-root": { color: "white" },
            "& .MuiOutlinedInput-root": {
              color: "white",
              "& fieldset": { borderColor: "white" },
              "&:hover fieldset": { borderColor: "white" },
              "&.Mui-focused fieldset": { borderColor: "white" },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            maxWidth: 500,
            borderRadius: "30px",
            fontSize: "1rem",
            py: 1.5,
            backgroundColor: "#53A9FF",
          }}
        >
          Login
        </Button>

        <Button
          component={Link}
          to="/register"
          variant="outlined"
          fullWidth
          sx={{
            maxWidth: 500,
            borderRadius: "30px",
            fontSize: "1rem",
            py: 1.5,
            color: "#53A9FF",
            borderColor: "#53A9FF",
          }}
        >
          Register
        </Button>
      </form>

      {/* Support Options */}
      <Box className="w-full flex justify-center items-center gap-10 pb-10">
        <Box
          component={Link}
          to="/forgot-password"
          className="flex flex-col items-center text-white no-underline"
        >
          <VpnKeyOutlined sx={{ fontSize: 48, color: "#53A9FF" }} />
          <Typography mt={1} fontSize="0.9rem">
            Forgot Password
          </Typography>
        </Box>
        <Box
          component={Link}
          to="/customer-service"
          className="flex flex-col items-center text-white no-underline"
        >
          <SupportAgent sx={{ fontSize: 48, color: "#53A9FF" }} />
          <Typography mt={1} fontSize="0.9rem">
            Customer Service
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Login;
