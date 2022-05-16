import * as React from "react";
import Button from "@mui/material/Button";
import "../App.css";
import EditIcon from "@mui/icons-material/Edit";
import { Grid, TextField, Popover, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

export default function EditBtn(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [btnLoading, setBtnLoading] = React.useState(false);

  //備註
  const [note, setNote] = React.useState("");
  const onChangeNote = (e) => {
    setNote(e.target.value);
  };

  const handleEdit = async () => {
    setBtnLoading(true);
    await props.handleEdit(props.id, note);
    setAnchorEl(null);
    setBtnLoading(false);
  };
  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
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
        <Button
          onClick={handleClickOpen}
          startIcon={<EditIcon />}
          color="Button"
          variant="outlined"
        >
          編輯
        </Button>
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
            style: { width: "40vw", height: "50px" },
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <TextField
              sx={{
                
                width: "50%",
                marginTop: "6px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              size="small"
              placeholder="編輯備註"
              defaultValue={props.textValue}
              onChange={onChangeNote}
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
                  marginLeft: "auto",
                  marginRight: "auto",
                  marginTop: "6px",
                }}
              >
                <Typography variant="h7" color="white" sx={{ fontWeight: 500 }}>
                  確認
                </Typography>
              </LoadingButton>
              <Button
                onClick={handleClose}
                disableElevation
                variant="outlined"
                color="Button"
                style={{
                  width: "10%",
                  marginLeft: "8px",
                  marginRight: "8px",
                  marginTop: "6px",
                }}
              >
                取消
              </Button>
            </div>
          </Grid>
        </Popover>
      </ThemeProvider>
    </div>
  );
}
