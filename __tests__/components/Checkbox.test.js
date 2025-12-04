describe('Checkbox module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/Checkbox');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
