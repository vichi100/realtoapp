describe('Slider module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/Slider');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
