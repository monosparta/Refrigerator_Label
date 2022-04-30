import * as React from "react";
import axios from "../Axios.config";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Box,
  Paper,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

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

    axios
      .post("api/login", {
        username: username,
        password: values.password,
      })
      .then((response) => {
        localStorage.setItem("login_token", response["data"]["token"]);
        navigate("/ManageMentPage");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Login">
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
          <Box component="form" onSubmit={onHandleLogin} noValidate>
            <div className="Account">
              <Typography>帳號 Username or Email</Typography>
              <OutlinedInput
                margin="normal"
                fullWidth
                required
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
                <Typography>密碼 Password</Typography>
                <OutlinedInput
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
    </div>
  );
}

export default Login;
