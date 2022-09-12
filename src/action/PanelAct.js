import { panelData } from "service/actionType";

export const fileHandler = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: panelData.fileData,
      payload: data,
    });
  });
};

export const languageHandler = (data) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: panelData.fileUpload,
      payload: data,
    });
  });
};
