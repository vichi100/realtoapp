describe('SliderSmallNum module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/SliderSmallNum');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
