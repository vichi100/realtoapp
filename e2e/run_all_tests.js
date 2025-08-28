// run_all_tests.js
const starterTests = require('./starter.test.js');
const loginTests = require('./login.test.js');
const addResidentialRentTests = require('./add_residential_rent.test.js');
// const productTests = require('./products.test.js');

describe('Full User Flow', () => {
  beforeAll(async () => {
    await device.launchApp({
    newInstance: true,
    permissions: {
      photos: 'YES', // Grants access to the photo library
      camera: 'YES', // Grants access to the camera
    },
  });

  });

  // run the other test suites in order
  starterTests();
  loginTests();
  addResidentialRentTests();
  // productTests();
});
