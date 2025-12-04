describe('navigation/stacks/AddPropertyStack', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/stacks/AddPropertyStack');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
