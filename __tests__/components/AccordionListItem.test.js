describe('AccordionListItem module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/AccordionListItem');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
