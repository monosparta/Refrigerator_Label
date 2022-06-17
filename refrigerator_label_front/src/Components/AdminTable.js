import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, Paper, Button } from "@mui/material";
import DeleteAdmin from "../Components/DeleteAdminBtn";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const theme = createTheme({
  palette: {
    white: {
      main: "rgb(255,255,255)",
    },
    Button: {
      main: "#363F4E",
    },
  },
});

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "20%" }}>管理者名稱</TableCell>
            <TableCell align="right" sx={{ width: "20%" }}>
              信箱
            </TableCell>
            <TableCell align="right" sx={{ width: "20%" }}>
              身分組
            </TableCell>
            <TableCell sx={{ width: "20%" }}></TableCell>
            <TableCell sx={{ width: "20%" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">
                <ThemeProvider theme={theme}>
                  <Button
                    variant="contained"
                    sx={{
                      width: "124px",
                      height: "44px",
                      borderRadius: "10px",
                    }}
                    color="Button"
                  >
                    <Typography
                      sx={{ fontSize: "14px", fontWeight: 400 }}
                      color="White"
                    >
                      重設密碼
                    </Typography>
                  </Button>
                </ThemeProvider>
              </TableCell>
              <TableCell align="left">
                <ThemeProvider theme={theme}>
                  <DeleteAdmin />
                </ThemeProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
