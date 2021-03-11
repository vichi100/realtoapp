import { ACTION_TYPES } from "./ActionType";

export const setEmployeeList = payload => {
  // console.log(payload);
  return {
    type: ACTION_TYPES.SET_EMPLOYEE_LIST,
    payload
  };
};
export const setUserMobile = payload => {
  // console.log(payload);
  return {
    type: ACTION_TYPES.SET_USER_MOBILE_NUMBER,
    payload
  };
};

export const setUserDetails = payload => {
  // console.log("setUserDetails in action: " + JSON.stringify(payload));
  return {
    type: ACTION_TYPES.SET_USER_DETAILS,
    payload
  };
};

export const setPropReminderList = payload => {
  // console.log("setPropReminderList in action: " + JSON.stringify(payload));
  return {
    type: ACTION_TYPES.SET_PROP_REMINDER_LIST,
    payload
  };
};
