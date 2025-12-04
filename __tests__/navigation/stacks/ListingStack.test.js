describe('navigation/stacks/ListingStack', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/stacks/ListingStack');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
