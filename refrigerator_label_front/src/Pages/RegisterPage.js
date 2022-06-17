import * as React from "react";
import { Typography, Box, Paper, TextField, Button } from "@mui/material";
import "../App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Bar from "../Components/AppBar";



const theme = createTheme({
  palette: {
    white: {
      main: "rgb(255,255,255)",
    },
    Button: {
      main: "#363F4E",
    },
  },
});

export default function Register() {
  return (
    <div>
      <Bar />
      <Paper
        sx={{
          width: "478px",
          height: "470px",
          m: "20vh auto",
          display: "flex",
        }}
      >
        <Box sx={{ m: "0 auto", height: "40px" }}>
          <Box sx={{ m: "25px 186px" }}>
            <Typography sx={{ fontSize: "36px", fontWeight: 700 }}>
              註冊
            </Typography>
          </Box>
          <Box sx={{ width: "408px", m: "0 35px" }}>
            <TextField size="small" fullWidth placeholder="使用者名稱" />
            <TextField
              size="small"
              fullWidth
              placeholder="電子郵件"
              sx={{ mt: "11px" }}
            />
            <TextField
              size="small"
              fullWidth
              placeholder="密碼"
              sx={{ mt: "11px" }}
            />
            <TextField
              size="small"
              fullWidth
              placeholder="再次輸入密碼"
              sx={{ mt: "11px" }}
            />
          </Box>
          <Box sx={{ width: "408px", m: "55px 35px 71px 35px" }}>
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                fullWidth
                sx={{ height: "44px" }}
                color="Button"
              >
                <Typography
                  sx={{ fontSize: "14px" }}
                  color="White"
                  className="Signup"
                >
                  註冊
                </Typography>
              </Button>
            </ThemeProvider>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
