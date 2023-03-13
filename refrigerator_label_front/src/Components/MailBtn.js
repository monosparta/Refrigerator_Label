import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// import MailOutlineIcon from "@mui/icons-material/MailOutline";
import MailOutlineIcon from '@mui/icons-material/Send';
import {
  Paper,
  Typography,
  Divider,
  Chip,
  styled,
  DialogContent,
  IconButton,
  Box,
  Modal,
  Backdrop,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";

function ChildModal(props) {
  const { Chips } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme({
    palette: {
      Button: {
        main: "#363F4E",
      },
    },
  });
  
  return (
    <React.Fragment>
      <IconButton
        sx={{ width: "25px", height: "25px", mt: "10px" }}
        onClick={handleOpen}
      >
        <MoreVertIcon />
      </IconButton>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <Modal
          hideBackdrop
          open={open}
          onClose={handleClose}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box
            sx={{
              width: "350px",
              bgcolor: "#F5F5F5	",
              pt: 2,
              px: 4,
              pb: 3,
              margin: "30vh auto",
              borderRadius: "8px",
            }}
          >
            <ThemeProvider theme={theme}>
              <IconButton
                onClick={handleClose}
                color="Button"
                sx={{
                  marginLeft: "98%",
                  width: "25px",
                  height: "25px",
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </ThemeProvider>
            <Paper
              className="ChipData"
              sx={{
                display: "flex",
                justifyContent: "left",
                flexWrap: "wrap",
                p: 2,
                m: 2,
                width: 300,
                maxHeight: 450,
                overflow: "scroll",
                // border: 1,
              }}
              elevation={0}
            >
              {Chips}
            </Paper>
          </Box>
        </Modal>
      </Backdrop>
    </React.Fragment>
  );
}

export default function MailBtn(props) {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [mailContent, setMailContent] = React.useState();
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [chipData, setChipData] = React.useState([]);
  const [hidden, setHidden] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
    const mail_people = props.handleMailPeople();
    setChipData(mail_people);
    if (mail_people.length > 2) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  };

  const sendMail = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const mail_user_data = [];
    chipData.forEach(function (item) {
      mail_user_data.push([item["mail"], item["labelId"]]);
    });
    await props.handleSendMail(mail_user_data, mailContent);
    setOpen(false);
    setBtnLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeContent = (e) => {
    const mail_content = e.target.value;
    setMailContent(mail_content);
  };

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
        <Button
          onClick={handleClickOpen}
          startIcon={<MailOutlineIcon />}
          color="Button"
          variant="outlined"
        >
          <Typography variant="h7" sx={{ pt: "2px" }}>
            {t("Send a Email")}
          </Typography>
        </Button>
      </ThemeProvider>
      <Dialog open={open} onClose={handleClose}>
        <Paper sx={{ width: 500 }}>
          <form>
            <DialogContent>
              <Typography variant="h6" sx={{ fontWeight: 700 }} align="center">
                {t("Send Due Reminder Email")}
              </Typography>
              <div className="owner" display="flex">
                <Typography
                  variant="h7"
                  sx={{ fontWeight: 400 }}
                  className="ownertext"
                >
                  {t("Owner")}
                </Typography>
                <div className="chips">
                  <div className="Choosen">
                    <Paper
                      type="email"
                      className="form-control"
                      name="email"
                      sx={{
                        display: "flex",
                        justifyContent: "left",
                        listStyle: "none",
                        p: 0.5,
                        m: 0,
                        width: 300,
                        minHeight: 36,
                        // border: 1,
                      }}
                      component="ul"
                      elevation={0}
                    >
                      {chipData.slice(0, 2).map((data) => {
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
                    {!hidden ? (
                      <ChildModal
                        Chips={chipData.map((data) => {
                          let icon;
                          return (
                            <ListItem
                              key={data.key}
                              sx={{
                                listStyle: "none",
                              }}
                              display="flex"
                            >
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
                      />
                    ) : null}
                  </div>
                  <Divider sx={{ width: 320 }} />
                </div>
              </div>
              <div className="mailcontent" display="flex">
                <Typography
                  variant="h7"
                  sx={{ fontWeight: 400 }}
                  className="ownertext"
                >
                  {t("Reminder content")}
                </Typography>
                <div className="contentBox">
                  <TextareaAutosize
                    className="mail_content"
                    id="mail_content"
                    placeholder={t("Please enter reminder content")}
                    onChange={onChangeContent}
                    name="mail_content"
                    style={{
                      height: "92px",
                      width: "287px",
                      padding: "8px",
                      resize: "none",
                    }}
                  />
                </div>
              </div>
              <Box
                sx={{
                  marginLeft: "115px",
                  marginTop: "16px ",
                  width: "250px",
                }}
              >
                <ThemeProvider theme={theme}>
                  <LoadingButton
                    type="submit"
                    onClick={sendMail}
                    loading={btnLoading}
                    disableElevation
                    variant="contained"
                    color="Button"
                    style={{
                      maxWidth: "108px",
                      maxHeight: "36px",
                      minWidth: "108px",
                      minHeight: "36px",
                    }}
                  >
                    <Typography
                      variant="h7"
                      color="white"
                      sx={{ fontWeight: 500 }}
                    >
                      {t("Confirm")}
                    </Typography>
                  </LoadingButton>
                  <Button
                    onClick={handleClose}
                    className="BtnNosend"
                    disableElevation
                    variant="outlined"
                    color="Button"
                    style={{
                      maxWidth: "108px",
                      maxHeight: "36px",
                      minWidth: "108px",
                      minHeight: "36px",
                    }}
                  >
                    {t("Cancel")}
                  </Button>
                </ThemeProvider>
              </Box>
            </DialogContent>
          </form>
        </Paper>
      </Dialog>
    </div>
  );
}
