import { ACTION_TYPES } from "./ActionType";

export const setEmployeeList = payload => {
  console.log(payload);
  return {
    type: ACTION_TYPES.SET_EMPLOYEE_LIST,
    payload
  };
};
