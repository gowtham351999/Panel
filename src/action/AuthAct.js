import { authApi } from "../service/apiVariables";

// login
export const login =
  (body) =>
  (dispatch, getState, { api, Toast }) => {
    return new Promise((resolve, reject) => {
      api({ ...authApi.loginApi, body })
        .then(({ message, token, data }) => {
          localStorage.setItem("adminAuthToken", token);
          localStorage.setItem("adminDetails", JSON.stringify(data));
          Toast({ type: "success", message });
          resolve(data);
        })
        .catch(({ message }) => {
          reject(Toast({ type: "error", message }));
        });
    });
  };
