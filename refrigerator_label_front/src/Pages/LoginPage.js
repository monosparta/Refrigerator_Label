import * as React from "react"
import axios from "../Axios.config";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Avatar,
  CssBaseline,
  Box,
  Container,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import "../App.css"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


function Login() {
  let history = useNavigate();

  const theme = createTheme({
    palette: {
      Button: {
        main: "#363F4E",
      },
    },
  })

  const [username, setUsername] = React.useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  })

  const onChangePassword = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
    })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const onHandleLogin = (e) => {

    e.preventDefault();

    axios
    .post("api/login",{
      username: username,
      password: values.password
    })
    .then((response) => {
      localStorage.setItem('login_token', response['data']['token'])
      history("/ManageMentPage")
    })
    .catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="Login">
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={onHandleLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              required
              id="username"
              label="帳號 Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={onChangeUsername}
            />
            <FormControl sx={{ width: "480px" }} variant="outlined">
              <InputLabel htmlFor="password">密碼 Password</InputLabel>
              <OutlinedInput
                id="password"
                type={
                  values.showPassword
                    ? "text"
                    : "password"
                }
                value={values.password}
                onChange={onChangePassword("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={
                        handleClickShowPassword
                      }
                      onMouseDown={
                        handleMouseDownPassword
                      }
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="保持登入"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                立刻登入
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default Login
