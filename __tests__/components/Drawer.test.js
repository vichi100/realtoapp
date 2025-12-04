// Mock missing image asset referenced by Drawer
jest.mock('../../src/components/images/menu.png', () => 'menu.png', { virtual: true });

describe('Drawer module', () => {
  it('loads without crashing', () => {
    const mod = require('../../src/components/Drawer');
    const exp = mod.default || mod;
    expect(exp).toBeTruthy();
  });
});
