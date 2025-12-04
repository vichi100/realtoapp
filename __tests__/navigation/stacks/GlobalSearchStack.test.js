describe('navigation/stacks/GlobalSearchStack', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/stacks/GlobalSearchStack');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
