describe('navigation/stacks/ContactsStack', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/stacks/ContactsStack');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
