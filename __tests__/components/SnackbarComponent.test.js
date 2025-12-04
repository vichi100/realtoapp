describe('SnackbarComponent module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/SnackbarComponent');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
