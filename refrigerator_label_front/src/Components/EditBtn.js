import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  Grid,
  TextField,
  Popover,
  Typography,
  Button,
  IconButton,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";

export default function EditBtn(props) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [btnLoading, setBtnLoading] = React.useState(false);

  //備註-內容
  const noteContentCheck = () => {
    let contentSplit = props.note ? props.note.split("-") : [""];
    if (
      contentSplit[0] === "Upper(refrigerator)" ||
      contentSplit[0] === "Lower(freezer)"
    ) {
      return contentSplit.slice(1).join("-");
    }
    return props.note;
  };
  const [noteContent, setNoteContent] = React.useState(noteContentCheck);

  //備註-存放位置
  const itemLocationCheck = () => {
    let contentSplit = props.note ? props.note.split("-") : [""];
    if (
      contentSplit[0] === "Upper(refrigerator)" ||
      contentSplit[0] === "Lower(freezer)"
    ) {
      return contentSplit[0] + "-";
    }
    return "";
  };
  const [itemLocation, setItemLocation] = React.useState(itemLocationCheck);

  const handleChangeSelect = (e) => {
    setItemLocation(e.target.value);
  };

  const handleChangeNoteContent = (e) => {
    setNoteContent(e.target.value);
  };

  const handleEdit = async () => {
    setBtnLoading(true);
    await props.handleEdit(props.id, itemLocation + noteContent);
    setAnchorEl(null);
    setBtnLoading(false);
    setItemLocation(itemLocationCheck);
    setNoteContent(noteContentCheck);
  };

  const handleClickOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setItemLocation(itemLocationCheck);
    setNoteContent(noteContentCheck);
    setAnchorEl(null);
    setBtnLoading(false);
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
        <IconButton
          color="Button"
          aria-label="upload picture"
          component="span"
          onClick={handleClickOpen}
        >
          <EditIcon />
        </IconButton>
        <Popover
          id={id}
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "right",
          }}
          PaperProps={{
            style: { width: "85vw", height: "50px" },
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <FormControl
              sx={{
                marginTop: "6px",
                marginLeft: "8px",
                minWidth: 120,
              }}
              size="small"
            >
              <InputLabel id="demo-select-small"></InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={itemLocation}
                onChange={handleChangeSelect}
              >
                <MenuItem value={"Upper(refrigerator)-"}>
                  {t("Upper(refrigerator)")}
                </MenuItem>
                <MenuItem value={"Lower(freezer)-"}>
                  {t("Lower(freezer)")}
                </MenuItem>
                <MenuItem value={""}>{t("None")}</MenuItem>
              </Select>
            </FormControl>
            <TextField
              sx={{
                width: "50%",
                marginTop: "6px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              size="small"
              placeholder={t("Edit note")}
              defaultValue={noteContent}
              onChange={handleChangeNoteContent}
              fullWidth
            />
            <div>
              <LoadingButton
                loading={btnLoading}
                onClick={handleEdit}
                disableElevation
                variant="contained"
                color="Button"
                style={{
                  minWidth: "10%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "6px",
                }}
              >
                <Typography variant="h7" color="white" sx={{ fontWeight: 500 }}>
                  {t("Confirm")}
                </Typography>
              </LoadingButton>
              <Button
                onClick={handleClose}
                disableElevation
                variant="outlined"
                color="Button"
                style={{
                  minWidth: "10%",
                  marginLeft: "8px",
                  marginRight: "8px",
                  marginTop: "6px",
                }}
              >
                {t("Cancel")}
              </Button>
            </div>
          </Grid>
        </Popover>
      </ThemeProvider>
    </div>
  );
}
