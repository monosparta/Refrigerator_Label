import {
  Typography,
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

import "../App.css";

function Login() {
  console.log(process.env.REACT_APP_URL);
  return (
    <div className="Box">
      <div className="Keyin">
        <div className="LoginTittle">
          <Typography variant="h5" sx={{ fontWeight: "500" }}>
            Sign in
          </Typography>
        </div>
        <div className="Account">
          <Typography variant="body2">帳號 Username or Email</Typography>
          <TextField placeholder="請輸入帳號" variant="outlined" fullWidth />
        </div>
        <div className="Password">
          <Typography variant="body2">密碼 Password</Typography>
          <TextField placeholder="請輸入密碼" variant="outlined" fullWidth />
        </div>
        <div className="Keeplogin">
          <FormGroup>
            <FormControlLabel control={<Checkbox />} label="保持登入狀態" />
          </FormGroup>
        </div>
        <div className="ButtonLogin">
          <Button variant="contained" fullWidth>
            立即登入
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
