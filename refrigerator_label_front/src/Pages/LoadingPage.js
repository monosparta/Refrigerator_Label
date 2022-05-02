import { Typography } from "@mui/material";
import Logo from "../Pictures/monologo.jpg";
import LoadingScreen from "react-loading-screen";
import "../App.css";

function Loading() {
  return (
    <LoadingScreen
      loading={true}
      bgColor="#363f4e"
      textColor="#ffff"
      text='冰箱物品管理系統'
      logoSrc={Logo}
    >
    </LoadingScreen>
  );
}

export default Loading;
