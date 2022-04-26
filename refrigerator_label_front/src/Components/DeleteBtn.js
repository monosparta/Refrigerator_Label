import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";

const theme2 = createTheme({
  palette: {
    Button: {
      main: "#363F4E",
    },
  },
});

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      <ThemeProvider theme={theme2}>
        <IconButton onClick={handleClickOpen} >
          <DeleteIcon color="Button"/>
        </IconButton>
      </ThemeProvider>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'>
        <div className='Diacontent'>
          <div className='DTittle'>
            <DialogTitle id='responsive-dialog-title'>
              <Typography variant='boby2' sx={{ fontWeight: "700" }}>
                確認刪除所選項目？
              </Typography>
            </DialogTitle>
          </div>
          <DialogActions>
            <div className='BtnGroup'>
              <ThemeProvider theme={theme2}>
                <div className='BtnOK'>
                  <Button
                    autoFocus
                    onClick={handleClose}
                    variant='contained'
                    color='Button'
                    style={{
                      maxWidth: "108px",
                      maxHeight: "36px",
                      minWidth: "108px",
                      minHeight: "36px",
                    }}>
                    <Typography color='white'>確認</Typography>
                  </Button>
                </div>
                <div className='BtnNo'>
                  <Button
                    onClick={handleClose}
                    autoFocus
                    variant='outlined'
                    color='Button'
                    style={{
                      maxWidth: "108px",
                      maxHeight: "36px",
                      minWidth: "108px",
                      minHeight: "36px",
                    }}>
                    取消
                  </Button>
                </div>
              </ThemeProvider>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
