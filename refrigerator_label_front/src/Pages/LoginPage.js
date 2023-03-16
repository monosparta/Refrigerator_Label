import * as React from "react";
import axios from "../Axios.config";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../Assets/image/monologo.jpg";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from "react";
import { TokenContext } from "../Routers.js";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { setTokenContext } = React.useContext(TokenContext);

  const [username, setUsername] = React.useState({});
  const [password, setPassword] = React.useState({
    password: "",
    showPassword: false,
  });
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [AlertText, setAlertText] = React.useState("");
  const [inputErrorA, setInputErrorA] = React.useState(false);
  const [inputErrorP, setInputErrorP] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (prop) => (e) => {
    setPassword({
      ...password,
      [prop]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

 const onHandleLogin = async (event) => {
    event.preventDefault();
    let checkError = false;
    let errorText = t("Please enter");
    setInputErrorA(false);
    setInputErrorP(false);
    setHidden(true);

    if (!username) {
      checkError = true;
      errorText += " " + t("Username");
      setInputErrorA(true);
    }
    if (!password.password) {
      checkError = true;
      errorText += " " + t("Password");
      setInputErrorP(true);
    }
    if (checkError === true) {
      setAlertText(errorText + " " + t("!"));
      setHidden(false);
      process.exit();
    }

    setBtnLoading(true);
    await axios
      .post("api/login", {
        username: username,
        password: password.password,
      })
      .then((response) => {
        const token = response["data"]["token"];
        localStorage.setItem("login_token", token);
        setTokenContext(token);
        navigate("/ManagementPage");
      })
      .catch((error) => {
        setAlertText(t(error.response.data["message"]));
        setHidden(false);
      });
    setBtnLoading(false);
  };

  const [isLoading, setisLoading] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 2500);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            backgroundColor: "#363f4e",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: 24,
                color: "white",
                margin: "16px auto",
                fontWeight: 700,
              }}
              color="text.secondary"
              gutterBottom
            >
              {t("Project title")}
            </Typography>
            <img
              style={{
                margin: "auto",
                display: "block",
              }}
              src={Logo}
              alt="Logo"
            />
          </Box>
        </div>
      ) : (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            backgroundColor: "#f5f5f5",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <ThemeProvider
              theme={createTheme({
                palette: {
                  Button: {
                    main: "#363F4E",
                  },
                },
              })}
            >
              <Paper
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "auto",
                  width: "500px",
                  height: "80%",
                  minHeight: "400px",
                  borderRadius: "10px",
                }}
              >
                <Box sx={{ m: "40px 36px 0 36px" }}>
                  <Typography component="h1" variant="h4">
                    {t("Sign in")}
                  </Typography>
                </Box>
                {!hidden ? (
                  <Box sx={{ width: "90%", m: "8px 24px" }}>
                    <Alert severity="error" className="Alert" show="false">
                      <Typography
                        color="black"
                        variant="body2"
                        sx={{ fontWeight: 700 }}
                      >
                        {AlertText}
                      </Typography>
                    </Alert>
                  </Box>
                ) : (
                  <Box sx={{ width: "90%", m: "8px 24px" }}></Box>
                )}
                <Box
                  component="form"
                  onSubmit={onHandleLogin}
                  noValidate
                  sx={{ m: "16px 36px" }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>
                      {t("Username")}
                    </Typography>
                    <OutlinedInput
                      error={inputErrorA}
                      fullWidth
                      required
                      type="string"
                      id="username"
                      placeholder={t("Enter your username or email")}
                      name="username"
                      autoComplete="username"
                      autoFocus
                      onChange={onChangeUsername}
                      sx={{
                        marginTop: 1,
                        borderRadius: "4px",
                      }}
                    />
                  </Box>
                  <Box sx={{ m: "11px 0" }}>
                    <Typography sx={{ fontWeight: 500 }}>
                      {t("Password")}
                    </Typography>
                    <OutlinedInput
                      fullWidth
                      sx={{
                        marginTop: 1,
                        borderRadius: "4px",
                      }}
                      placeholder={t("Enter your password")}
                      id="password"
                      error={inputErrorP}
                      type={password.showPassword ? "text" : "password"}
                      value={password.password}
                      onChange={onChangePassword("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {password.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Box>
                  <Box>
                    <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label={t("Keep signed in")}
                    />
                  </Box>
                  <Box sx={{ mb: "30px", mt: "16px" }}>
                    <LoadingButton
                      loading={btnLoading}
                      type="submit"
                      variant="contained"
                      className="ButtonLogin"
                      color="Button"
                      disableElevation
                      sx={{ width: "100%", height: "100%" }}
                    >
                      <Typography variant="h5" color="white" fontWeight={540}>
                        {t("Sign now")}
                      </Typography>
                    </LoadingButton>
                  </Box>
                </Box>
              </Paper>
            </ThemeProvider>
          </Box>
        </div>
      )}
    </div>
  );
}
