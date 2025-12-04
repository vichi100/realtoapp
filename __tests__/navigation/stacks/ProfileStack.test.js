describe('navigation/stacks/ProfileStack', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/stacks/ProfileStack');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
