import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import emailjs from "emailjs-com";
import "../App.css";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import { Paper, Typography, Divider, Chip, styled } from "@mui/material";
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

  const [chipData, setChipData] = React.useState([
    { key: 0, label: "Corbin -0411001" },
    { key: 1, label: "Gary -0411002" },
    { key: 2, label: "Pohan -0411003" }
  ]);

  const ListItem = styled("li")(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };
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
          <DialogTitle id="responsive-dialog-title" variant="h5">
            {"寄送到期提醒信件"}
          </DialogTitle>
          <div className="MailBox">
            <div className="User">
              <div className="Belone">
                <Typography>物品所屬人</Typography>
              </div>
              <div className="Chips">
                <Paper
                  type="email"
                  className="form-control"
                  placeholder="corbinn0419@gmail.com" //之後要撈資料
                  name="email"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    listStyle: "none",
                    p: 0.5,
                    m: 0,
                    height: 40
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
