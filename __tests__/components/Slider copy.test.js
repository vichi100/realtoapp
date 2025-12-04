describe('Slider copy module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/Slider copy');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
