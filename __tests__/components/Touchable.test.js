describe('Touchable module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/Touchable');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
