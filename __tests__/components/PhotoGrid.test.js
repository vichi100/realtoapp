describe('PhotoGrid module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/PhotoGrid');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
