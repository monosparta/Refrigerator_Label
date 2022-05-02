import * as React from "react";
import axios from "../Axios.config";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Box,
  Paper,
  Alert,
} from "@mui/material";
import Grow from "@mui/material/Grow";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Logo from "../Pictures/monologo.jpg";
import LoadingScreen from "react-loading-screen";
import { useEffect } from "react";

import "../App.css";

function Login() {
  let navigate = useNavigate();

  const theme = createTheme({
    palette: {
      Button: {
        main: "#363F4E",
      },
    },
  });

  const [username, setUsername] = React.useState("");
  const [helperTextCorrectA, sethelperTextErrorA] = React.useState(
    "帳號 Username or Email"
  );
  const [helperTextCorrectP, sethelperTextErrorP] =
    React.useState("密碼 Password");
  const [num] = React.useState("");
  const [InputError, setInputError] = React.useState(false);
  const [hidden, setHidden] = React.useState(true);
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const [checked, setChecked] = React.useState(false);

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const onChangePassword = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onHandleLogin = (e) => {
    e.preventDefault();
    if (num === "") {
      sethelperTextErrorA("帳號 Username or Email");
      sethelperTextErrorP("密碼 Password");
      setInputError(true);
      setHidden(false);
      setChecked((prev) => !prev);
    } else {
      setInputError(false);
      setHidden(true);
    }
    axios
      .post("api/login", {
        username: username,
        password: values.password,
      })
      .then((response) => {
        localStorage.setItem("login_token", response["data"]["token"]);
        navigate("/ManagementPage");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [isLoading, setisLoading] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 2500);
  }, []);

  return (
    <div className="Login">
      {isLoading ? (
        <LoadingScreen
          loading={true}
          bgColor="#363f4e"
          textColor="#ffff"
          text="冰箱物品管理系統"
          logoSrc={Logo}
        />
      ) : (
        <ThemeProvider theme={theme}>
          <Paper
            className="login"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="SigninTittle">
              <Typography component="h1" variant="h4">
                Sign in
              </Typography>
            </div>
            {!hidden ? (
              <Grow in={checked} {...(checked ? { timeout: 400 } : {})}>
                <Alert severity="error" className="Alert" show="false">
                  <Typography
                    color="black"
                    variant="body2"
                    sx={{ fontWeight: 700, width: 420, height: 2 }}
                  >
                    非管理員身分，無法登入
                  </Typography>
                </Alert>
              </Grow>
            ) : null}
            <Box component="form" onSubmit={onHandleLogin} noValidate>
              <div className="Account">
                <Typography>{helperTextCorrectA}</Typography>
                <OutlinedInput
                  error={InputError}
                  fullWidth
                  required
                  type="string"
                  id="username"
                  placeholder="user@example.com"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={onChangeUsername}
                  sx={{
                    marginTop: 1,
                  }}
                />
              </div>
              <div className="Password">
                <FormControl sx={{ width: "480px" }} variant="outlined">
                  <Typography>{helperTextCorrectP}</Typography>
                  <OutlinedInput
                    error={InputError}
                    sx={{
                      marginTop: 1,
                    }}
                    placeholder="password"
                    id="password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={onChangePassword("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </div>
              <div className="Keeplogin">
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="保持登入"
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                className="ButtonLogin"
                color="Button"
                disableElevation
              >
                <Typography variant="h5" color="white" fontWeight={540}>
                  立即登入
                </Typography>
              </Button>
            </Box>
          </Paper>
        </ThemeProvider>
      )}
    </div>
  );
}

export default Login;
