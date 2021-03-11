import { ACTION_TYPES } from "./ActionType";

const initialState = {
  employeeList: [],
  userMobileNumber: null,
  userDetails: null,
  propReminderList: []
};
const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_EMPLOYEE_LIST:
      // console.log("SET_EMPLOYEE_LIST");
      return {
        ...state,
        employeeList: action.payload
      };
    case ACTION_TYPES.SET_USER_MOBILE_NUMBER:
      // console.log("SET_USER_MOBILE_NUMBER");
      return {
        ...state,
        userMobileNumber: action.payload
      };
    case ACTION_TYPES.SET_USER_DETAILS:
      // console.log("SET_USER_DETAILS");
      return {
        ...state,
        userDetails: action.payload
      };
    case ACTION_TYPES.SET_PROP_REMINDER_LIST:
      // console.log("SET_USER_DETAILS");
      return {
        ...state,
        propReminderList: action.payload
      };
    default:
      return state;
  }
};
export default AppReducer;
