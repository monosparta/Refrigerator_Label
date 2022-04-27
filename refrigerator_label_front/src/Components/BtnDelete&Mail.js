import * as React from "react";
import Box from "@mui/material/Box";
import Delete from "./DeleteBtn"
import Mail from './MailBtn'


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }} display="flex">
      <Delete />
      <Mail/>
    </Box>
  );
}
