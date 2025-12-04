describe('SliderX module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/SliderX');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
