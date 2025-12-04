describe('CustomButtonGroup module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/CustomButtonGroup');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
