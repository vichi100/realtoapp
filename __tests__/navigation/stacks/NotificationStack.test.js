describe('navigation/stacks/NotificationStack', () => {
  it('loads and exports', () => {
    const mod = require('../../../src/navigation/stacks/NotificationStack');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
