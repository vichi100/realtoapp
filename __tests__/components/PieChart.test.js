describe('PieChart module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/PieChart');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
