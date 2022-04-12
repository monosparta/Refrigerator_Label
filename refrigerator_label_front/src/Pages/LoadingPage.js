import { Typography } from "@mui/material";
import Logo from "../Pictures/monologo.png";

import "../App.css";

function Loading() {
  console.log(process.env.REACT_APP_URL);
  return (
    <div className="Body">
      <div className="Tittle">
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          冰箱物品管理系統
        </Typography>
      </div>
      <div className="Logo" style={{ maxWidth: 200, minWidth: 200 }}>
        <img src={Logo} alt="monologo" width="80%" />
      </div>
    </div>
  );
}

export default Loading;
