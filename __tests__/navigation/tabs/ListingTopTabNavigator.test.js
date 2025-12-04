describe('navigation/tabs/ListingTopTabNavigator', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/tabs/ListingTopTabNavigator');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
