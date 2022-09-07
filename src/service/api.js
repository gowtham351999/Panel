import { axiosInstance } from "./utilities";

import { logout } from "./utilities";

//api
export var api = async function ({
  method = "get",
  api,
  body,
  status = false,
  isForgotPassword = false,
  baseURL = "normal",
}) {
  return await new Promise((resolve, reject) => {
    // setting token
    if (localStorage.getItem("adminAuthToken") && !isForgotPassword) {
      axiosInstance.defaults.headers.common["x-access-token"] =
        localStorage.getItem("adminAuthToken");
    }
    axiosInstance[method](`${getServiceUrl(baseURL)}${api}`, body ? body : "")
      .then((data) => {
        resolve(statusHelper(status, data));
      })
      .catch((error) => {
        try {
          if (error.response) {
            reject(statusHelper(status, error.response));
          } else {
            reject(error);
          }
        } catch (err) {
          reject(err);
        }
      });
  });
};

//status Helper
var statusHelper = (status, data) => {
  if (data.status === 401 || data.status === 403) {
    logout();
  }
  if (status) {
    return {
      status: data.status,
      ...data.data,
    };
  } else {
    return data.data;
  }
};

//get Service Url
let getServiceUrl = (baseURL) => {
  let finalURL = "";
  switch (baseURL) {
    case "normal":
      finalURL = process.env.REACT_APP_API_BASE_URL;
      break;
    default:
      finalURL = process.env.REACT_APP_API_BASE_URL;
      break;
  }
  return finalURL;
};
