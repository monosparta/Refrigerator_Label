import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import emailjs from "emailjs-com";
import "../App.css";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import { Paper, Typography, Divider,Chip } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const handleClosedelete = () => {
  //     setOpen(false);
  //     //delete function
  // };

  function sendEmail(e) {
    console.log("34", e);
    e.preventDefault();

    emailjs
      .sendForm("mailtest", "template_3y67klp", e.target, "B7qzZTQ8Vz_TGmxKl")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EmailIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <form onSubmit={sendEmail}>
          <DialogTitle id="responsive-dialog-title">
            {"寄送到期提醒信件"}
          </DialogTitle>
          <div className="MailBox">
            <div className="User">
              <div className="Belone">
                <Typography>物品所屬人</Typography>
              </div>
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <Paper
                type="email"
                className="form-control"
                placeholder="corbinn0419@gmail.com"
                name="email"
              >
                <Chip
                  label="Corbin"
                />
              </Paper>
            </div>
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
                  style={{ height: 100, width: 280 }}
                />
              </div>
            </div>
          </div>
          <div className="ButtonG">
            <DialogActions>
              <Button type="submit" autoFocus onClick={handleClose} fullWidth>
                確認寄送
              </Button>
              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                style={{ background: "gray" }}
              />
              <Button onClick={handleClose} autoFocus fullWidth>
                取消
              </Button>
            </DialogActions>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
