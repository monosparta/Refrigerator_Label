import * as React from "react";
import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from '@mui/material/Alert';
import "../App.css";


function Login() {
  console.log(process.env.REACT_APP_URL);
  const theme = createTheme({
    palette: {
      Button: {
        main: "#363F4E",
      },
    },
  });
  return (
    <div className='Login'>
      <Paper className='Box' elevation={3}>
        <div className='Keyin'>
          <div className='LoginTittle'>
            <Typography variant='h5' sx={{ fontWeight: "700" }}>
              Sign in
            </Typography>
              <Alert severity='error' className="Alert">
                <Typography
                  color='black'
                  variant='body2'
                  sx={{ fontWeight: 700 }}>
                  非管理員身分，無法登入
                </Typography>
              </Alert>
          </div>
          <div className='Account'>
            <Typography variant='body2'>帳號 Username or Email</Typography>
            <TextField
              error
              placeholder='請輸入帳號'
              variant='outlined'
              fullWidth
            />
          </div>
          <div className='Password'>
            <Typography variant='body2'>密碼 Password</Typography>
            <TextField
              error
              placeholder='請輸入密碼'
              variant='outlined'
              fullWidth
            />
          </div>
          <div className='Keeplogin'>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label='保持登入狀態' />
            </FormGroup>
          </div>
          <div className='ButtonLogin'>
            <ThemeProvider theme={theme}>
              {/* <Link href='./ManagementPage' underline='none'> */}
              <Button
                variant='contained'
                fullWidth
                color='Button'
                style={{
                  maxWidth: "480px",
                  maxHeight: "64px",
                  minWidth: "480px",
                  minHeight: "64px",
                }}>
                <Typography
                  variant='h6'
                  color='white'
                  sx={{ fontWeight: "400" }}>
                  立即登入
                </Typography>
              </Button>
              {/* </Link> */}
            </ThemeProvider>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Login;
