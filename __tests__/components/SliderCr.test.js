describe('SliderCr module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/SliderCr');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
