import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme,createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField, Typography, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";

const theme2 = createTheme({
  palette: {
    Button: {
      main: "#363F4E",
    },
    White: {
      main: "#ffff",
    },
  },
});

export default function PasswordResetBtn(props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const [newPassword, setNewPassword] = React.useState();
  const [newPasswordAgain, setNewPasswordAgain] = React.useState();
  const [inputErrorNP, setInputErrorNP] = React.useState(false);
  const [inputErrorNPA, setInputErrorNPA] = React.useState(false);

  const onChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const onChangeNewPasswordAgain = (e) => {
    setNewPasswordAgain(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setInputErrorNP(false);
    setInputErrorNPA(false);
    setOpen(false);
  };

  const handleReset = async () => {
    let checkError = false;
    let errorText = t("Please enter");
    props.setSeverity("error");
    setInputErrorNP(false);
    setInputErrorNPA(false);

    if (!newPassword) {
      checkError = true;
      setInputErrorNP(true);
      errorText += " " + t("Password");
    }

    if (!newPasswordAgain) {
      checkError = true;
      setInputErrorNPA(true);
      errorText += " " + t("Confirm password");
    }

    if (newPassword !== newPasswordAgain) {
      checkError = true;
      setInputErrorNP(true);
      setInputErrorNPA(true);
      errorText = t("Two passwords aren't same !");
    }

    if (checkError) {
      props.setAlertText(errorText);
      props.setState({
        open: true,
        ...{
          vertical: "top",
          horizontal: "center",
        },
      });
    } else {
      setBtnLoading(true);
      await props.handleResetPassword(props.username, newPassword);
      setOpen(false);
      setBtnLoading(false);
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme2}>
        <Button
          onClick={handleClickOpen}
          disableElevation
          variant="contained"
          color="Button"
        >
          <Typography sx={{ fontSize: "14px", fontWeight: 400 }} color="white">
            {t("Reset password")}
          </Typography>
        </Button>
      </ThemeProvider>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box sx={{ p: 1 }}>
          <Box sx={{ width: "400px", height: "40px" }}>
            <Typography
              sx={{ fontWeight: "700", fontSize: "26px", m: "0 140px" }}
            >
              {t("Reset password")}
            </Typography>
          </Box>
          <Box sx={{ width: "300px", height: "110px", m: "0 auto" }}>
            <TextField
              error={inputErrorNP}
              size="small"
              placeholder={t("Enter your new password")}
              fullWidth
              type="password"
              sx={{ mt: "11px" }}
              onChange={onChangeNewPassword}
            />
            <TextField
              error={inputErrorNPA}
              size="small"
              placeholder={t("Enter your new password again")}
              fullWidth
              type="password"
              onChange={onChangeNewPasswordAgain}
              sx={{ mt: "11px" }}
            />
          </Box>
          <Box sx={{ width: "280px", m: "0 auto", p: 1 }}>
            <ThemeProvider theme={theme2}>
              <LoadingButton
                autoFocus
                onClick={handleReset}
                loading={btnLoading}
                variant="contained"
                color="Button"
                style={{
                  maxWidth: "128px",
                  maxHeight: "36px",
                  minWidth: "128px",
                  minHeight: "36px",
                }}
              >
                <Typography color="white">{t("Confirm")}</Typography>
              </LoadingButton>
              <Button
                onClick={handleClose}
                autoFocus
                variant="outlined"
                color="Button"
                style={{
                  maxWidth: "128px",
                  maxHeight: "36px",
                  minWidth: "128px",
                  minHeight: "36px",
                }}
                sx={{ ml: "16px" }}
              >
                {t("Cancel")}
              </Button>
            </ThemeProvider>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
