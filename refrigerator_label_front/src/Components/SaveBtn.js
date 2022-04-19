import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiAlert from "@mui/material/Alert";

const theme = createTheme({
  palette: {
    Button: {
      main: "#363F4E",
    },
  },
});
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function PositionedSnackbar() {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Button
          onClick={handleClick({
            vertical: "top",
            horizontal: "right",
          })}
          className="Enter"
          variant="contained"
          color="Button"
          disableElevation
        >
          <Typography color="white" variant="h7" sx={{ fontWeight: "700" }}>
            儲存
          </Typography>
        </Button>
      </ThemeProvider>
    </React.Fragment>
  );
  return (
    <div>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "85%" }}>
          編輯成功
        </Alert>
      </Snackbar>
    </div>
  );
}
