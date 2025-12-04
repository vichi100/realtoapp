describe('TabBarIcon module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/TabBarIcon');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
