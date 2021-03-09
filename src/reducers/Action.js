import { ACTION_TYPES } from "./ActionType";

export const setEmployeeList = payload => {
  console.log(payload);
  return {
    type: ACTION_TYPES.SET_EMPLOYEE_LIST,
    payload
  };
};
export const setAgentMobile = payload => {
  console.log(payload);
  return {
    type: ACTION_TYPES.SET_AGENT_MOBILE_NUMBER,
    payload
  };
};
