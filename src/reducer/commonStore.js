import { chefDataType, panelData } from "service/actionType";

const initialState = {
  chefData: {},
  fileData: {},
};
const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case chefDataType.chefData:
      return {
        ...state,
        chefData: action.payload,
      };
      case panelData.fileData:
      return {
        ...state,
        fileData: action.payload,
      };
    default:
      return state;
  }
};

export default commonReducer;
