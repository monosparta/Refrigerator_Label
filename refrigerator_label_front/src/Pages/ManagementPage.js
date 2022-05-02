import * as React from "react";
import Bar from "../Components/AppBar";
import axios from "../Axios.config.js";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import { Button, TextField, Typography } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import DeleteBtn from "../Components/DeleteBtn";
import MailBtn from "../Components/MailBtn";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//css
const useStyles = makeStyles({
  grid: {
    display: "flex",
    flexDirection: "column-reverse",
  },
});
const theme = createTheme({
  palette: {
    Button: {
      main: "#363F4E",
    },
  },
});
// 我為Menu功能，進行中文化，但我鎖住了，不用理
const localizedTextsMap = {
  columnMenuUnsort: "原始排列",
  columnMenuSortAsc: "升序排列",
  columnMenuSortDesc: "降序排列",
  columnMenuFilter: "篩選",
  columnMenuHideColumn: "隱藏此列",
  columnMenuShowColumns: "顯示此列",
  footerRowSelected: (count) => `已選擇 ${count} 項 `,
};
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ManagementPage() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const handleClick = (newState) => () => {
    axios
      .put("api/update_label", {
        card_id: "1255870309",
        date: "2022-04-13 14:13:35",
        label_id: "0413002",
        note: "cola",
        id: "2",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setState({ open: true, ...newState });
    console.log("SAVE");
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const { vertical, horizontal, open } = state;

  // label_data
  const [rowData, setRowData] = React.useState([]);

  const loadingData = async () => {
    await axios
      .get("api/find_label_all", {
        headers: { token: localStorage.getItem("login_token") },
      })
      .then((response) => {
        const label_data = response["data"]["message"];
        setRowData(label_data);
      })
      .catch((error) => {
        console.log(error.response.data["message"]);
      });
  };

  React.useEffect(() => {
    loadingData();
  }, []);

  // select_data_id
  const [select_data_id, setSelectDataId] = React.useState([]);

  const getSelectData = (field) => {
    const select_data = [];
    rowData.forEach(function (each_label) {
      select_data_id.forEach(function (select_label_id) {
        if (each_label["id"] === select_label_id) {
          select_data.push(each_label[field]);
        }
      });
    });
    return select_data;
  };

  const handleDelete = () => {
    const delete_data = getSelectData("label_id");

    axios
      .delete("api/label", {
        headers: { token: localStorage.getItem("login_token") },
        data: { label_id: delete_data },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data["message"]);
      });
    loadingData();
  };

  const handleMailPeople = () => {
    const get_mail_people = getSelectData("name");
    const get_mail_label_id = getSelectData("label_id");
    const get_mail_data = getSelectData("mail");
    const people = [];

    for (let count = 0; count < get_mail_people.length; count++) {
      people.push({
        key: count,
        label: get_mail_people[count] + "-" + get_mail_label_id[count],
        mail: get_mail_data[count],
      });
    }
    return people;
  };

  const handleSendMail = (mail_users, mail_content) => {
    axios
      .get("api/manual_send_mail", {
        headers: { token: localStorage.getItem("login_token") },
        params: {
          users: mail_users,
          subject: "Mono冰箱主動提醒通知",
          text: mail_content,
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data["message"]);
      });
  };

  // data grid columns definition
  const columns = [
    {
      field: "name",
      headerName: "物品所屬者",
      width: 120,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "label_id",
      headerName: "ID",
      width: 110,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "date",
      headerName: "放入日期",
      type: "date",
      width: 220,
      disableColumnMenu: true,
      cellClassName: (params) => {
        if (params.value.split("- ").pop().split(" day ago")[0]>=7) {
          return "over-seven-day";
        }
      },
    },
    {
      field: "note",
      type: "actions",
      headerName: "備註",
      width: 200,
      disableColumnMenu: true,
      sortable: false,
      getActions: () => {
        return [<TextField size="small" placeholder="編輯備註" />];
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: (
        <Box sx={{ flexGrow: 1 }} display="flex">
          <DeleteBtn handleDelete={handleDelete} />
          <MailBtn
            handleSendMail={handleSendMail}
            handleMailPeople={handleMailPeople}
          />
        </Box>
      ),
      width: 100,
      cellClassName: "actions",
      getActions: () => {
        return [
          <ThemeProvider theme={theme}>
            <Button
              onClick={handleClick({
                vertical: "top",
                horizontal: "center", //position of popout
              })}
              color="Button"
              variant="contained"
              disableElevation
            >
              <Typography color="white" variant="h7" sx={{ fontWeight: "500" }}>
                儲存
              </Typography>
            </Button>
          </ThemeProvider>,
        ];
      },
    },
  ];

  return (
    <div className="Home">
      <Bar />
      <Box
        style={{ height: 1100, width: "100%" }}
        className="DataGrid"
        sx={{
          "& .over-seven-day": {
            color: "#c74e4e",
          },
        }}
      >
        <DataGrid
          className={classes.grid}
          rows={rowData}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          localeText={localizedTextsMap}
          onSelectionModelChange={(details) => {
            setSelectDataId(details);
          }}
        />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          編輯成功
        </Alert>
      </Snackbar>
    </div>
  );
}
