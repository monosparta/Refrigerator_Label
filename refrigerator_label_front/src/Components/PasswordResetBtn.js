import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField, Typography, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

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

export default function DeleteBtn(props) {
  const [open, setOpen] = React.useState(false);
  //   const [btnLoading, setBtnLoading] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = async () => {
    // setBtnLoading(true);
    setOpen(false);
    // setBtnLoading(false);
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
            重設密碼
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
              重設密碼
            </Typography>
          </Box>
          <Box sx={{ width: "300px", height: "100px", m: "0 auto" }}>
            <TextField size="small" placeholder="輸入新密碼" fullWidth />
            <TextField
              size="small"
              placeholder="再次輸入新密碼"
              fullWidth
              sx={{ mt: "11px" }}
            />
          </Box>
          <Box sx={{ width: "280px", m: "0 auto", p: 1 }}>
            <ThemeProvider theme={theme2}>
              <LoadingButton
                autoFocus
                onClick={handleReset}
                // loading={btnLoading}
                variant="contained"
                color="Button"
                style={{
                  maxWidth: "128px",
                  maxHeight: "36px",
                  minWidth: "128px",
                  minHeight: "36px",
                }}
              >
                <Typography color="white">確認</Typography>
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
                取消
              </Button>
            </ThemeProvider>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
