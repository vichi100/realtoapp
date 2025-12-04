describe('DoughnutChart module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/DoughnutChart');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
