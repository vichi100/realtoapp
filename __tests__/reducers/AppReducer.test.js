import AppReducer from '../../src/reducers/AppReducer';
import { ACTION_TYPES } from '../../src/reducers/ActionType';

describe('AppReducer', () => {
  it('returns initial state shape', () => {
    const state = AppReducer(undefined, {});
    expect(state).toHaveProperty('userMobileNumber', null);
    expect(state).toHaveProperty('userDetails', null);
    expect(state).toHaveProperty('countryCode', '+91');
    expect(state).toHaveProperty('propertyType', 'Residential');
  });

  it('handles SET_USER_MOBILE_NUMBER', () => {
    const initialState = AppReducer(undefined, {});
    const action = {
      type: ACTION_TYPES.SET_USER_MOBILE_NUMBER,
      payload: '9990000001',
    };
    const newState = AppReducer(initialState, action);
    expect(newState.userMobileNumber).toBe('9990000001');
  });

  it('handles SET_USER_DETAILS', () => {
    const userDetails = {
      id: '123',
      name: 'Test User',
      mobile: '9990000001',
    };
    const initialState = AppReducer(undefined, {});
    const action = {
      type: ACTION_TYPES.SET_USER_DETAILS,
      payload: userDetails,
    };
    const newState = AppReducer(initialState, action);
    expect(newState.userDetails).toEqual(userDetails);
  });

  it('handles SET_PROPERTY_TYPE', () => {
    const initialState = AppReducer(undefined, {});
    const action = {
      type: ACTION_TYPES.SET_PROPERTY_TYPE,
      payload: 'Commercial',
    };
    const newState = AppReducer(initialState, action);
    expect(newState.propertyType).toBe('Commercial');
  });

  it('preserves other state when updating', () => {
    const initialState = AppReducer(undefined, {});
    const stateWithUser = {
      ...initialState,
      userMobileNumber: '9990000001',
    };
    const action = {
      type: ACTION_TYPES.SET_USER_DETAILS,
      payload: { id: '123', name: 'Test' },
    };
    const newState = AppReducer(stateWithUser, action);
    expect(newState.userMobileNumber).toBe('9990000001');
    expect(newState.userDetails).toEqual({ id: '123', name: 'Test' });
  });
});
