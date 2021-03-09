import { ACTION_TYPES } from "./ActionType";

const initialState = {
  employeeList: [],
  agentMobileNumber: null
};
const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_EMPLOYEE_LIST:
      console.log("SET_EMPLOYEE_LIST");
      return {
        ...state,
        employeeList: action.payload
      };
    case ACTION_TYPES.SET_AGENT_MOBILE_NUMBER:
      console.log("SET_AGENT_MOBILE_NUMBER");
      return {
        ...state,
        agentMobileNumber: action.payload
      };
    default:
      return state;
  }
};
export default AppReducer;
