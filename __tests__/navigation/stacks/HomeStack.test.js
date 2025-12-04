describe('navigation/stacks/HomeStack', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/stacks/HomeStack');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
