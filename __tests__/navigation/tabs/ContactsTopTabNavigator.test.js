describe('navigation/tabs/ContactsTopTabNavigator', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/tabs/ContactsTopTabNavigator');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
