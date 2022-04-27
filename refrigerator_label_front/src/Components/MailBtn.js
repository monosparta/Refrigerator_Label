import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import emailjs from "emailjs-com";
import "../App.css";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import { Paper, Typography, Divider, Chip, styled } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SnackBar from './SnackBar'
import axios from "../Axios.config.js";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleOpen = () => {
    console.log("123")
  }
  const handleClose = () => {

    
    setOpen(false);
  };

  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Corbin" },
    { key: 1, label: "Gary" },
    { key: 2, label: "Pohan" },
  ]);

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const theme = createTheme({
    palette: {
      Button: {
        main: "#363F4E",
      },
    },
  });
  return (
    <div>
      <ThemeProvider theme={theme}>
        <IconButton onClick={handleClickOpen}>
          <EmailIcon color="Button" />
        </IconButton>
      </ThemeProvider>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form>
          <div className="MailTittle">
            <Typography variant="h6" sx={{ fontWeight: 700 }} align="center">
              寄送到期提醒信件
            </Typography>
          </div>
          <div className="MailBox">
            <div className="User">
              <div className="Belone">
                <Typography>物品所屬人</Typography>
              </div>
              <div className="Chips">
                <Paper
                  type="email"
                  className="form-control"
                  placeholder="garyopen1876@gmail.com"
                  name="email"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 0.5,
                    m: 0,
                    height: 40,
                  }}
                  component="ul"
                  elevation={0}
                >
                  {chipData.map((data) => {
                    let icon;
                    return (
                      <ListItem key={data.key}>
                        <Chip
                          icon={icon}
                          label={data.label}
                          onDelete={
                            data.label === "React"
                              ? undefined
                              : handleDelete(data)
                          }
                        />
                      </ListItem>
                    );
                  })}
                </Paper>
              </div>
            </div>
            <Divider variant="inset" />
            <div className="TextBox">
              <div className="MContent">
                <Typography>提醒內容</Typography>
              </div>
              <div className="MText">
                <TextareaAutosize
                  className="Message"
                  id=""
                  placeholder="請輸入提醒內容"
                  name="message"
                  style={{ height: 100, width: 300 }}
                />
              </div>
            </div>
          </div>
          <div className="ButtonG">
            <ThemeProvider theme={theme}>
              <DialogActions>
                <Button type="submit" onClick={handleClose} disableElevation>
                  <SnackBar BtnText="確認" Message="寄信成功" />
                </Button>
                <Button
                  onClick={handleClose}
                  autoFocus
                  variant="outlined"
                  color="Button"
                  className="BtnNosend"
                >
                  <Typography variant="h7">取消</Typography>
                </Button>
              </DialogActions>
            </ThemeProvider>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
