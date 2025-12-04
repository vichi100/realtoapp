describe('reducers/ActionType', () => {
  it('exports ACTION_TYPES with expected keys', () => {
    const { ACTION_TYPES } = require('../../src/reducers/ActionType');
    expect(ACTION_TYPES).toBeTruthy();
    expect(typeof ACTION_TYPES).toBe('object');
    // Spot-check a few important action keys
    expect(ACTION_TYPES).toHaveProperty('SET_USER_MOBILE_NUMBER');
    expect(ACTION_TYPES).toHaveProperty('SET_PROPERTY_DETAILS');
    expect(ACTION_TYPES).toHaveProperty('SET_START_NAVIGATION_POINT');
  });
});
