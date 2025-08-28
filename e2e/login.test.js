// login.test.js
module.exports = function loginTests() {
  describe('Login Screen', () => {

    beforeAll(async () => {
      await device.launchApp({ newInstance: false }); // reuse existing instance
    });

    it('should navigate to the next screen after entering a mobile number and tapping the play button', async () => {
      const mobileNumber = '9000000001';
      const OtpInput = '999999';

      // Try mobileInput again (if required on this screen)
      try {
        await element(by.id('mobileInput')).tap();
        await element(by.id('mobileInput')).typeText(mobileNumber);
        await element(by.label('Done')).atIndex(0).tap();
        await element(by.id('controller_play_login_icon')).tap();
      } catch (err) {
        console.warn("⚠️ mobileInput not found, assuming we're already on OTP screen");
      }

      await expect(element(by.text('OTP SENT TO MOBILE'))).toBeVisible();
      // await expect(element(by.text(`+91 ${mobileNumber}`))).toBeVisible();

      await element(by.id('OtpInputTextField')).tap();
      await element(by.id('OtpInputTextField')).typeText(OtpInput);
    });
  });
};
