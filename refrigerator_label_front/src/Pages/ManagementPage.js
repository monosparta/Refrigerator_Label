import * as React from "react";
import Bar from "../Components/AppBar";
import axios from "../Axios.config.js";
import { DataGrid } from "@mui/x-data-grid";
import { Chip } from "@mui/material";
import { Box } from "@mui/system";
import DeleteBtn from "../Components/DeleteBtn";
import { useNavigate } from "react-router-dom";
import MailBtn from "../Components/MailBtn";
import EditBtn from "../Components/EditBtn";
import PrinterStates from "../Components/PrinterStates.js";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TokenContext } from "../App.js";

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
  let navigate = useNavigate();
  //token
  const { setTokenContext } = React.useContext(TokenContext);

  // label_data
  const [rowData, setRowData] = React.useState([]);
  // printer_state
  const [printerState, setPrinterState] = React.useState();

  // select_data_id
  const [select_data_id, setSelectDataId] = React.useState([]);

  //snackbar
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [AlertText, setAlertText] = React.useState("");
  const [Severity, setSeverity] = React.useState("");

  //close Alert
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const { vertical, horizontal, open } = state;

  const loadingData = React.useCallback(() => {
    const loadData = async () => {
      await axios
        .get("api/find_label_all", {
          headers: { token: localStorage.getItem("login_token") },
        })
        .then((response) => {
          const label_data = response["data"]["message"];
          setRowData(label_data);
          const printer_state = response["data"]["printer_state"][0]["state"];
          printer_state === "success"
            ? setPrinterState("裝置運行中")
            : setPrinterState("裝置停止中");
        })
        .catch((error) => {
          //overtime
          if (error.response.status === 402 || 403) {
            localStorage.removeItem("login_token");
            setTokenContext();
            navigate("/");
          }
        });
    };
    loadData();
  }, [navigate, setTokenContext]);

  React.useEffect(() => {
    const update = setInterval(() => {
      loadingData();
    }, 1000);
    return () => clearInterval(update);
  }, [loadingData]);

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

  //編輯功能
  const handleEdit = async (label_id, update_note) => {
    await axios
      .put(
        "api/label",
        {
          id: label_id,
          note: update_note,
        },
        { headers: { token: localStorage.getItem("login_token") } }
      )
      .then((response) => {
        if (response.status === 200) {
          setSeverity("success");
        } else {
          setSeverity("error");
        }
        setAlertText(response.data["message"]);
      })
      .catch((error) => {
        setAlertText(error.response.data["message"]);
        setSeverity("error");
      });
    setState({
      open: true,
      ...{
        vertical: "top",
        horizontal: "center", //position of popout
      },
    });
  };

  //刪除功能
  const handleDelete = async () => {
    const delete_data = getSelectData("labelId");
    if (delete_data.length !== 0) {
      await axios
        .delete("api/label", {
          headers: { token: localStorage.getItem("login_token") },
          data: { labelId: delete_data },
        })
        .then((response) => {
          if (response.status === 200) {
            setSeverity("success");
            loadingData();
          } else {
            setSeverity("error");
          }
          setAlertText(response.data["message"]);
        })
        .catch((error) => {
          setAlertText(error.response.data["message"]);
          setSeverity("error");
        });
      setState({
        isLoading: true,
        open: true,
        ...{
          vertical: "top",
          horizontal: "center",
        },
      });
    }
  };

  //讀取要寄信的人
  const handleMailPeople = () => {
    const get_mail_people = getSelectData("name");
    const get_mail_label_id = getSelectData("labelId");
    const get_mail_data = getSelectData("mail");
    const people = [];

    for (let count = 0; count < get_mail_people.length; count++) {
      people.push({
        key: count,
        label: get_mail_people[count] + "-" + get_mail_label_id[count],
        mail: get_mail_data[count],
        labelId: get_mail_label_id[count],
      });
    }
    return people;
  };

  //寄信功能
  const handleSendMail = async (mail_users, mail_content) => {
    if (mail_users.length !== 0) {
      await axios
        .post(
          "api/manual_send_mail",
          {
            users: mail_users,
            text: mail_content,
          },
          {
            headers: { token: localStorage.getItem("login_token") },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            setSeverity("success");
          } else {
            setSeverity("error");
          }
          setAlertText(response.data["message"]);
        })
        .catch((error) => {
          setAlertText(error.response.data["message"]);
          setSeverity("error");
        });
      setState({
        open: true,
        ...{
          vertical: "top",
          horizontal: "center",
        },
      });
      setSelectDataId([]);
    }
  };

  // data grid columns definition
  const columns = [
    {
      field: "name",
      headerName: "物品所屬者",
      minWidth: 110,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "labelId",
      headerName: "ID",
      minWidth: 110,
      flex: 1,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "date",
      headerName: "放入日期",
      type: "date",
      minWidth: 220,
      flex: 2,
      disableColumnMenu: true,
      renderCell: (params) => {
        const string = params.value.split("- ");
        let chip_color = "#6cba6f";
        if (params.value.split("- ").pop().split("days ago")[0] >= 7) {
          chip_color = "#ee9852";
        }
        return (
          <div>
            {string[0]}
            <Chip
              size="small"
              label={string[1]}
              color="primary"
              sx={{ backgroundColor: chip_color, borderRadius: "8px", ml: 1 }}
            />
          </div>
        );
      },
    },
    {
      field: "note",
      headerName: "備註",
      minWidth: 180,
      flex: 4,
      disableColumnMenu: true,
      sortable: false,
    },
    {
      field: "actions",
      type: "actions",
      minWidth: 50,
      flex: 1,
      cellClassName: "actions",
      align: "center",
      // headerAlign:"left"
      getActions: (params) => {
        return [
          <EditBtn
            id={params.row.id}
            textValue={params.row.note}
            handleEdit={handleEdit}
          />,
        ];
      },
    },
  ];

  return (
    <div className="Home">
      <Bar />
      <Box
        className="DataGrid"
        sx={{
          width: "100%",
          height: "85vh",
        }}
      >
        <ThemeProvider theme={theme}>
          <Box sx={{ display: "flex", m: "8px 24px" }}>
            <Box>
              <PrinterStates printerState={printerState} />
            </Box>
            <Box sx={{ display: "flex", p: "1vh 0 1vh 1vh", ml: "auto" }}>
              <Box>
                <DeleteBtn handleDelete={handleDelete} />
              </Box>
              <Box sx={{ ml: "16px" }}>
                <MailBtn
                  endIcon={<SendIcon />}
                  handleSendMail={handleSendMail}
                  handleMailPeople={handleMailPeople}
                />
              </Box>
            </Box>
          </Box>
        </ThemeProvider>
        <DataGrid
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus":
              {
                outline: "none",
              },
            margin: "0 24px",
          }}
          rows={rowData}
          columns={columns}
          // pageSize={100}
          // rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          localeText={localizedTextsMap}
          onSelectionModelChange={(details) => {
            setSelectDataId(details);
          }}
          selectionModel={select_data_id}
        />
      </Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={Severity} sx={{ width: "100%" }}>
          {AlertText}
        </Alert>
      </Snackbar>
    </div>
  );
}
