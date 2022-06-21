import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper } from "@mui/material";
import DeleteAdmin from "../Components/DeleteAdminBtn";
import Reset from "../Components/PasswordResetBtn";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

export default function BasicTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "20%" }}>管理者名稱</TableCell>
            <TableCell sx={{ width: "20%" }}>信箱</TableCell>
            <TableCell sx={{ width: "20%" }}>身分組</TableCell>
            <TableCell sx={{ width: "10%" }}></TableCell>
            <TableCell sx={{ width: "1%" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.adminData.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell>{row.mail}</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell align="right">
                <Reset
                  username={row.username}
                  handleResetPassword={props.handleResetPassword}
                />
              </TableCell>
              <TableCell align="left">
                <ThemeProvider theme={theme}>
                  <DeleteAdmin
                    username={row.username}
                    handleDeleteAdmin={props.handleDeleteAdmin}
                  />
                </ThemeProvider>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
