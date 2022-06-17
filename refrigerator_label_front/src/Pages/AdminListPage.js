import * as React from "react";
import { Typography, Box, Button } from "@mui/material";
import "../App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Bar from "../Components/AppBar";
import Admins from "../Components/AdminTable";

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

export default function AdminList() {
  return (
    <div>
      <Bar />
      <Box sx={{ width: "95%", m: "auto" }}>
        <Box
          sx={{
            height: "44px",
            width: "95%",
            maxWidth: "1167px",
            display: "flex",
            m: "auto",
            mt: "66px",
            mb: "19px",
          }}
        >
          <Typography sx={{ fontSize: "36px", fontWeight: 700 }}>
            管理者
          </Typography>
          <ThemeProvider theme={theme}>
            <Button
              variant="outlined"
              color="Button"
              sx={{ ml: "auto", width: "124px", height: "44px" }}
              href="/Register"
            >
              <Typography>新增管理者</Typography>
            </Button>
          </ThemeProvider>
        </Box>
        <Box
          sx={{
            width: "95%",
            maxWidth: "1167px",
            height: "470px",
            m: "0 auto",
          }}
        >
          <Admins />
        </Box>
      </Box>
    </div>
  );
}
