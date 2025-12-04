describe('Slideshow copy module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/Slideshow copy');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
