describe('navigation/main/RootStackNavigator', () => {
  it('module loads and exports a component', () => {
    const mod = require('../../../src/navigation/main/RootStackNavigator');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
