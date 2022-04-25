import * as React from "react"
import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Paper,
  IconButton,
  OutlinedInput,
  InputAdornment,
  FormControl,
  Alert,
} from "@mui/material"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import {
  createTheme,
  ThemeProvider,
} from "@mui/material/styles"

import "../App.css"

function Login() {
  const theme = createTheme({
    palette: {
      Button: {
        main: "#363F4E",
      },
    },
  })
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  })
  const handleChange = (prop) => (event) => {
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

  return (
    <div className="Login">
      <Paper className="Box" elevation={3}>
        <div className="Keyin">
          <div className="LoginTittle">
            <Typography
              variant="h5"
              sx={{ fontWeight: "700" }}
            >
              Sign in
            </Typography>
          </div>
          <Alert
            severity="error"
            className="Alert"
          >
            <Typography
              color="black"
              variant="body2"
              sx={{ fontWeight: 700 }}
            >
              非管理員身分，無法登入
            </Typography>
          </Alert>
          <div className="Account">
            <Typography variant="body2">
              帳號 Username or Email
            </Typography>
            <TextField
              error
              placeholder="請輸入帳號"
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="Password">
            <FormControl
              sx={{ width: "480px" }}
              variant="outlined"
            >
              <Typography variant="body2">
                密碼 Password
              </Typography>
              <OutlinedInput
                error
                placeholder="請輸入密碼"
                id="outlined-adornment-password"
                type={
                  values.showPassword
                    ? "text"
                    : "password"
                }
                value={values.password}
                onChange={handleChange(
                  "password"
                )}
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
          </div>
          <div className="Keeplogin">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="保持登入狀態"
              />
            </FormGroup>
          </div>
          <div className="ButtonLogin">
            <ThemeProvider theme={theme}>
              {/* <Link href='./ManagementPage' underline='none'> */}
              <Button
                variant="contained"
                fullWidth
                color="Button"
                style={{
                  maxWidth: "480px",
                  maxHeight: "64px",
                  minWidth: "480px",
                  minHeight: "64px",
                }}
              >
                <Typography
                  variant="h6"
                  color="white"
                  sx={{ fontWeight: "400" }}
                >
                  立即登入
                </Typography>
              </Button>
              {/* </Link> */}
            </ThemeProvider>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default Login
