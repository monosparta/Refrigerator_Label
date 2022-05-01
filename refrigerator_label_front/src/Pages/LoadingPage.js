import { Typography } from "@mui/material";
import Logo from "../Pictures/monologo.jpg";
import "../App.css";

function Loading() {
  return (
    <div className="Loading">
      <div className="Body">
        <div className="Tittle">
          <Typography variant="h5" sx={{ fontWeight: "700" }} color="white">
            冰箱物品管理系統
          </Typography>
        </div>
        <div className="Logo">
          <img
            src={Logo}
            alt="monologo"
            style={{ maxWidth: 150, minWidth: 150 }}
          />
        </div>
      </div>
    </div>
  );
}

export default Loading;
