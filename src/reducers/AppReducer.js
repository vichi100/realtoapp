import { ACTION_TYPES } from "./ActionType";

const initialState = {
  employeeList: []
};
const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_EMPLOYEE_LIST:
      console.log("vichi2");
      return {
        ...state,
        employeeList: action.payload
      };
    default:
      return state;
  }
};
export default AppReducer;
