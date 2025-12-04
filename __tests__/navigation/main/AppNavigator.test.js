describe('navigation/main/AppNavigator', () => {
  it('module loads and exports a component', () => {
    const mod = require('../../../src/navigation/main/AppNavigator');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
