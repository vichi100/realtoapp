describe('SwitchButton module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/SwitchButton');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
