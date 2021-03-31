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

export const setPropListForMeeting = payload => {
  // console.log("setPropListForMeeting in action: " + JSON.stringify(payload));
  return {
    type: ACTION_TYPES.SET_PROP_LIST_FOR_MEETING,
    payload
  };
};

export const setCustomerDetailsForMeeting = payload => {
  console.log(
    "setCustomerDetailsForMeeting in action: " + JSON.stringify(payload)
  );
  return {
    type: ACTION_TYPES.SET_CUSTOMER_DETAILS_FOR_MEETING,
    payload
  };
};

export const setResidentialPropertyList = payload => {
  console.log(
    "setResidentialPropertyList in action: " + JSON.stringify(payload)
  );
  return {
    type: ACTION_TYPES.SET_RESIDENTIAL_PROPERTY_LIST,
    payload
  };
};

export const setCommercialPropertyList = payload => {
  console.log(
    "setCommercialPropertyList in action: " + JSON.stringify(payload)
  );
  return {
    type: ACTION_TYPES.SET_COMMERCIAL_PROPERTY_LIST,
    payload
  };
};

export const setResidentialCustomerList = payload => {
  console.log(
    "setResidentialCustomerList in action: " + JSON.stringify(payload)
  );
  return {
    type: ACTION_TYPES.SET_RESIDENTIAL_CUSTOMER_LIST,
    payload
  };
};

export const setCommercialCustomerList = payload => {
  console.log(
    "setCommercialCustomerList in action: " + JSON.stringify(payload)
  );
  return {
    type: ACTION_TYPES.SET_COMMERCIAL_CUSTOMER_LIST,
    payload
  };
};
