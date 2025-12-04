import { numDifferentiation, dateFormat, addDays, formatIsoDateToCustomString, camalize, formatClientNameForDisplay, formatMobileNumber } from '../../src/utils/methods';

describe('utils/methods', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('numDifferentiation formats numbers with units', () => {
    expect(numDifferentiation(500)).toBe(500);
    expect(numDifferentiation(1500)).toBe('1.5 K');
    expect(numDifferentiation(250000)).toBe('2.5 Lac');
    expect(numDifferentiation(20000000)).toBe('2 Cr');
  });

  it('dateFormat trims ISO string to 16 chars', () => {
    const str = '2024-12-04T10:30:45Z';
    expect(dateFormat(str)).toBe('2024-12-04T10:30');
  });

  it('addDays adds days to a date', () => {
    const d = new Date('2024-12-01T00:00:00Z');
    const out = addDays(d, 10);
    expect(out instanceof Date).toBe(true);
    expect(out.getTime()).toBe(d.getTime() + 10 * 24 * 60 * 60 * 1000);
  });

  it('formatIsoDateToCustomString formats valid ISO and handles invalid', () => {
    const iso = '2024-12-04T10:30:00Z';
    const formatted = formatIsoDateToCustomString(iso);
    expect(typeof formatted).toBe('string');
    expect(formatted).toMatch(/\w{3} \w{3} \d{1,2} \d{4}/);

    const invalid = formatIsoDateToCustomString('not-a-date');
    expect(invalid).toBe('Invalid Date');
  });

  it('camalize capitalizes each word', () => {
    expect(camalize('john doe')).toBe('John Doe');
    expect(camalize('')).toBe('');
    expect(camalize(null)).toBe('');
  });

  it('formatClientNameForDisplay inserts newline after second word when >2 words', () => {
    expect(formatClientNameForDisplay('John Doe')).toBe('John Doe');
    expect(formatClientNameForDisplay('John Middle Doe')).toBe('John Middle\nDoe');
    expect(formatClientNameForDisplay('Single')).toBe('Single');
    expect(formatClientNameForDisplay('')).toBe('');
  });

  it('formatMobileNumber normalizes with +91 prefix and space', () => {
    expect(formatMobileNumber('9876543210')).toBe('+91 9876543210');
    expect(formatMobileNumber('+919876543210')).toBe('+91 9876543210');
    expect(formatMobileNumber('')).toBe('');
    expect(formatMobileNumber(null)).toBe('');
  });

  it('makeCall prefixes +91 and calls Linking.openURL', () => {
    jest.isolateModules(() => {
      jest.doMock('react-native', () => ({ Linking: { openURL: jest.fn(() => Promise.resolve()) } }));
      const { makeCall } = require('../../src/utils/methods');
      const { Linking } = require('react-native');
      makeCall('9876543210');
      expect(Linking.openURL).toHaveBeenCalledWith('tel://+919876543210');
      makeCall('+919876543210');
      expect(Linking.openURL).toHaveBeenCalledWith('tel://+919876543210');
    });
  });
});
// Example utility function tests
// Add your utility functions from methods.js here

describe('Utility Methods', () => {
  it('should be a placeholder test', () => {
    expect(true).toBe(true);
  });

  // Example: Phone number validation
  describe('Phone number validation', () => {
    it('validates correct phone number', () => {
      const isValidPhone = (phone) => /^\d{10}$/.test(phone);
      expect(isValidPhone('9990000001')).toBe(true);
    });

    it('rejects invalid phone number', () => {
      const isValidPhone = (phone) => /^\d{10}$/.test(phone);
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('abcdefghij')).toBe(false);
    });
  });

  // Example: OTP validation
  describe('OTP validation', () => {
    it('validates correct OTP', () => {
      const isValidOTP = (otp) => /^\d{6}$/.test(otp);
      expect(isValidOTP('999999')).toBe(true);
    });

    it('rejects invalid OTP', () => {
      const isValidOTP = (otp) => /^\d{6}$/.test(otp);
      expect(isValidOTP('123')).toBe(false);
      expect(isValidOTP('1234567')).toBe(false);
    });
  });
});
