describe('reducers/Action creators', () => {
  const actions = require('../../src/reducers/Action');
  const { ACTION_TYPES } = require('../../src/reducers/ActionType');

  const cases = [
    ['setEmployeeList', 'SET_EMPLOYEE_LIST'],
    ['setUserMobile', 'SET_USER_MOBILE_NUMBER'],
    ['setUserDetails', 'SET_USER_DETAILS'],
    ['setPropReminderList', 'SET_PROP_REMINDER_LIST'],
    ['setPropListForMeeting', 'SET_PROP_LIST_FOR_MEETING'],
    ['setCustomerDetailsForMeeting', 'SET_CUSTOMER_DETAILS_FOR_MEETING'],
    ['setResidentialPropertyList', 'SET_RESIDENTIAL_PROPERTY_LIST'],
    ['setCommercialPropertyList', 'SET_COMMERCIAL_PROPERTY_LIST'],
    ['setResidentialCustomerList', 'SET_RESIDENTIAL_CUSTOMER_LIST'],
    ['setCommercialCustomerList', 'SET_COMMERCIAL_CUSTOMER_LIST'],
    ['setCustomerListForMeeting', 'SET_CUSTOMER_LIST_FOR_MEETING'],
    ['setPropertyListingForMeeting', 'SET_PROPERTY_LIST_FOR_MEETING'],
    ['setPropertyType', 'SET_PROPERTY_TYPE'],
    ['setGlobalSearchResult', 'SET_GLOBAL_SEARCH_RESULT'],
    ['setAnyItemDetails', 'SET_ANY_ITEM_DETAILS'],
    ['setPropertyDetails', 'SET_PROPERTY_DETAILS'],
    ['setCustomerDetails', 'SET_CUSTOMER_DETAILS'],
    ['setStartNavigationPoint', 'SET_START_NAVIGATION_POINT'],
  ];

  it('exports expected action creators', () => {
    cases.forEach(([fn]) => {
      expect(typeof actions[fn]).toBe('function');
    });
  });

  it.each(cases)('%s returns correct type and payload', (fnName, typeKey) => {
    const payload = { sample: 'value' };
    const action = actions[fnName](payload);
    expect(action).toEqual({ type: ACTION_TYPES[typeKey], payload });
  });
});
