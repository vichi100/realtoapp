// starter.test.js
module.exports = function starterTests() {
  describe('Onboarding and Login Screen', () => {

    beforeAll(async () => {
      await device.launchApp({ newInstance: false });
    });

    it('should display the logo, tagline, input field, play button, and skip button', async () => {
      await expect(element(by.text('Supercharge Your Property Broking'))).toBeVisible();
      await expect(element(by.text('Enter Mobile Number'))).toBeVisible();
      await waitFor(element(by.id('controller_play_login_icon'))).toBeVisible().withTimeout(5000);
      await expect(element(by.text('Skip'))).toBeVisible();
    });

    it('should navigate to the next screen after entering a mobile number and tapping the play button', async () => {
      const mobileNumber = '9000000001';

      await element(by.id('mobileInput')).tap();
      await element(by.id('mobileInput')).typeText(mobileNumber);
      await element(by.label('Done')).atIndex(0).tap();
      await element(by.id('controller_play_login_icon')).tap();

      await expect(element(by.text('OTP SENT TO MOBILE'))).toBeVisible();
    });
  });
};
