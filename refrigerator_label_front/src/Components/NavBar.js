import * as React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import PublicIcon from "@mui/icons-material/Public";
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
  Menu,
  Text,
  Chip,
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

const username='12345678';

export default function NavBar() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { setTokenContext } = React.useContext(TokenContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setAnchorEl(null);
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
                  {t("Project title")}
                </Typography>
              </Link>
            </Box>
            <Box sx={{ ml: "auto" }}>
              <ThemeProvider theme={theme}>
                <Chip label={"帳號：" + username } variant="outlined" sx={{ mr: "1vw", ml: "auto", color: "#FFFFFF" }} ></Chip>
                <Button
                  id="language-button"
                  aria-controls={open ? "language" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  variant="outlined"
                  color="white"
                  sx={{ mr: "1vw", ml: "auto" }}
                >
                  <PublicIcon />
                  &nbsp;
                  {t("Language")}
                </Button>
                <Menu
                  id="language"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                  MenuListProps={{
                    "aria-labelledby": "language-button",
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                >
                  <MenuItem onClick={() => handleChangeLanguage("en")}>
                    English
                  </MenuItem>
                  <MenuItem onClick={() => handleChangeLanguage("zh-TW")}>
                    繁體中文
                  </MenuItem>
                  <MenuItem onClick={() => handleChangeLanguage("jp")}>
                    日本語
                  </MenuItem>
                </Menu>
                <Button
                  variant="outlined"
                  color="white"
                  href="/Admins"
                  sx={{ mr: "1vw", ml: "auto" }}
                >
                  <Typography color="White">{t("Admin list")}</Typography>
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<LogoutIcon />}
                  color="white"
                  onClick={handleLogout}
                >
                  <Typography color="White" sx={{ fontSize: "14px" }}>
                    {t("Sign out")}
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
