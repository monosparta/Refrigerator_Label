import * as React from "react"
import Bar from "../Components/AppBar";
import axios from "../Axios.config.js";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import BtnG from "../Components/BtnDelete&Mail.js";
import SaveBtn from "../Components/SnackBar";
import { TextField } from "@mui/material";

//css
const useStyles = makeStyles({
  grid: {
    display: "flex",
    flexDirection: "column-reverse",
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

const columns = [
  {
    field: "User",
    headerName: "物品所屬者",
    width: 120,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "date_id",
    headerName: "ID",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "date",
    headerName: "放入日期",
    type: "date",
    width: 180,
    disableColumnMenu: true,
  },
  {
    field: "remark",
    type: "actions",
    headerName: "備註",
    width: 150,
    disableColumnMenu: true,
    sortable: false,
    getActions: () => {
      return [<TextField size='small' placeholder='編輯備註'/>];
    },
  },
  {
    field: "actions",
    type: "actions",
    headerName: <BtnG/>,
    width: 100,
    cellClassName: "actions",
    getActions: () => {
      return [<SaveBtn BtnText='儲存' Message="編輯成功"/>];
    },
  },
];

function ManagementPage() {

  const classes = useStyles();

  //label_data
  const [rowData, setRowData] = React.useState([]);
  
  const loadingData = async() =>{
    await axios
    .get("api/find_label_all",{
      headers: { 'token' : localStorage.getItem('login_token') }
    })
    .then((response) => {
      const label_data = response["data"]["message"];
      setRowData(label_data);
    })
    .catch((error) => {
      console.log(error)
    });
  }

  React.useEffect(() => {
    loadingData();
  }, []);
  
  //select_data_id
  const [select_data_id, setSelectDataId] = React.useState([]);

  const getData = (field) =>{
    const select_data = [];
    rowData.forEach(function(each_label){
      select_data_id.forEach(function(select_label_id){
        if(each_label['id'] === select_label_id){
          select_data.push(each_label[field]);
        }
      })
    })
    return select_data
  }

  const handleDelete = () =>{
    const delete_data = getData('date_id');
    axios
    .delete("api/delete_label", { data:{date_id: delete_data}})
    .then((response) =>{
        console.log(response);
        // this.forceUpdate();
    }).catch((error) => {
        console.log(error);
    });
    loadingData();
  }

  return (
    <div className="Home">
      <Bar/>
      <div style={{ height: 800, width: "100%" }}>
        <button onClick={ handleDelete }>Delete</button>
        <DataGrid
          className={classes.grid}
          rows={rowData}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          localeText={localizedTextsMap}
          onSelectionModelChange = {(details) =>{ setSelectDataId(details) }}
        />
      </div>
    </div>
  );
}

export default ManagementPage;
