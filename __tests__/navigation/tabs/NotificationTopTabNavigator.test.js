describe('navigation/tabs/NotificationTopTabNavigator', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/tabs/NotificationTopTabNavigator');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
