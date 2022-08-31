import Axios from "axios";
const axios = (_baseURL) => {
  return Axios.create({
    baseURL: process.env.REACT_APP_BACK_END, //back-end
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 8000,
  });
};
export { axios };
export default axios();
