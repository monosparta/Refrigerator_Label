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
import Logo from "../Pictures/monologo.jpg";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect } from "react";
import { TokenContext } from "../App.js";
import { styled } from "@mui/material/styles";

function Login() {
  let navigate = useNavigate();

  const { setTokenContext } = React.useContext(TokenContext);
  const [username, setUsername] = React.useState("");
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
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (prop) => (event) => {
    setPassword({
      ...password,
      [prop]: event.target.value,
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
    if (username === "" && password.password === "") {
      setAlertText("請輸入帳號密碼!");
      setInputErrorA(true);
      setInputErrorP(true);
      setHidden(false);
      process.exit();
    } else if (username === "") {
      setAlertText("請輸入帳號!");
      setInputErrorA(true);
      setInputErrorP(false);
      setHidden(false);
      process.exit();
    } else if (password.password === "") {
      setAlertText("請輸入密碼!");
      setInputErrorA(false);
      setInputErrorP(true);
      setHidden(false);
      process.exit();
    } else {
      setInputErrorA(false);
      setInputErrorP(false);
      setHidden(true);
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
        setAlertText(error.response.data["message"]);
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

  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

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
              雲端智慧標籤系統
            </Typography>
            <Img src={Logo} />
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
                  width: "550px",
                  height: "90%",
                  minHeight: "500px",
                  borderRadius: "10px",
                }}
              >
                <Box sx={{ m: "60px 36px 0 36px" }}>
                  <Typography component="h1" variant="h4">
                    Sign in
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
                ) : (<Box sx={{ width: "90%", m: "8px 24px" }}></Box>)}
                <Box
                  component="form"
                  onSubmit={onHandleLogin}
                  noValidate
                  sx={{ m: "16px 36px" }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 500 }}>
                      帳號 USERNAME
                    </Typography>
                    <OutlinedInput
                      error={inputErrorA}
                      fullWidth
                      required
                      type="string"
                      id="username"
                      placeholder="Enter your username or email"
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
                      密碼 PASSWORD
                    </Typography>
                    <OutlinedInput
                      fullWidth
                      sx={{
                        marginTop: 1,
                        borderRadius: "4px",
                      }}
                      placeholder="Enter your password"
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
                      label="保持登入"
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
                        立即登入
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

export default Login;
