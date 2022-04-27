import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { makeStyles } from "@mui/styles";
import axios from "../Axios.config.js";
import BtnG from "./BtnG.js";
import SaveBtn from "./SnackBar";
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
    headerName: <BtnG />,
    width: 100,
    cellClassName: "actions",
    getActions: () => {
      return [<SaveBtn BtnText='儲存' Message="編輯成功"/>];
    },
  },
];

export default function DataGridDemo() {
  const classes = useStyles();

  //data
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    axios
    .get("api/find_label_all")
    .then((response) => {
      const label_data = response["data"]["message"];
      setRowData(label_data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);
  //console.log(rowData[0])
  //data
  const [data, setData] = useState([]);
  const handleGetData = () =>{
    console.log(data)
  }

  return (
    <div style={{ height: 800, width: "100%" }}>
      <button onClick={handleGetData}>Activate Lasers</button>
      <DataGrid
        className={classes.grid}
        rows={rowData}
        columns={columns}
        pageSize={100}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        localeText={localizedTextsMap}
       // getRowClassName={(ids)=>{console.log(ids.row.date_id)}}
        onSelectionModelChange = {(details) =>{ setData(details) }}
      />
    </div>
  );
}
