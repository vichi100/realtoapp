describe('navigation/stacks/LocalityDetailsStack', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/stacks/LocalityDetailsStack');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
