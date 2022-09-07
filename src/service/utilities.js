import axios from "axios";

import { history } from "../service/helpers";

//axios Instance
export const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  headers: {},
});

//logout
export const logout = () => {
  axiosInstance.defaults.headers.common["Authorization"] = "";
  localStorage.clear();
  history.push("/");
  window.location.reload(true);
};
