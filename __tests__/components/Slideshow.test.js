describe('Slideshow module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/Slideshow');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
