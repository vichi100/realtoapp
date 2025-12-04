describe('navigation/tabs/BottomTabNavigator', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/tabs/BottomTabNavigator');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
