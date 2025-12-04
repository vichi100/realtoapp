describe('navigation/stacks/AddCustomerStack', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/stacks/AddCustomerStack');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
