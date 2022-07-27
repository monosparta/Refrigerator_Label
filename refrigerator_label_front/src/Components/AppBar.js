import * as React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TokenContext } from "../Routers.js";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Link,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

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

export default function NavBar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { setTokenContext } = React.useContext(TokenContext);

  const handleChangeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("login_token");
    setTokenContext(null);
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="Button">
        <Box alignItems="center">
          <Toolbar>
            <Box>
              <Link href="/" underline="none">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, fontWeight: 600, fontSize: "24px" }}
                  color="White"
                >
                  {t("Project Title")}
                </Typography>
              </Link>
            </Box>
            <Box sx={{ ml: "auto" }}>
              <ThemeProvider theme={theme}>
                <FormControl size="small" sx={{ mr: "1vw", ml: "auto" }}>
                  <Select
                    labelId="select-language"
                    id="select-language-id"
                    defaultValue={i18n.language}
                    onChange={handleChangeLanguage}
                    autoWidth
                    sx={[
                      (theme) => ({
                        ".MuiSelect-select": {
                          color: "White",
                        },
                        ".MuiSelect-icon": {
                          color: "White",
                        },
                        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                          border: "White",
                          borderRadius: "5px",
                        },
                      }),
                    ]}
                    label="language"
                  >
                    <MenuItem value={"en"}>English</MenuItem>
                    <MenuItem value={"zh-TW"}>中文-繁體</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  color="white"
                  href="/Admins"
                  sx={{ mr: "1vw", ml: "auto" }}
                >
                  <Typography color="White">管理者列表</Typography>
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  color="white"
                  onClick={handleLogout}
                >
                  <Typography color="White" sx={{ fontSize: "14px" }}>
                    Logout
                  </Typography>
                </Button>
              </ThemeProvider>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </ThemeProvider>
  );
}
