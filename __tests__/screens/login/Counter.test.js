import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';

import Counter from '../../../src/screens/login/Counter';

describe('Counter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('shows countdown initially and decrements every second', () => {
    const { getByText } = render(<Counter resendOTP={jest.fn()} />);
    expect(getByText('Resend OTP in ')).toBeTruthy();
    expect(getByText(' 120')).toBeTruthy();

    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(getByText(' 117')).toBeTruthy();
  });

  it('shows Resend OTP button when count reaches zero and calls handler on press', () => {
    const resendOTP = jest.fn();
    const { getByText, queryByText } = render(<Counter resendOTP={resendOTP} />);

    // Fast-forward to zero
    act(() => {
      jest.advanceTimersByTime(120000);
    });

    // Countdown text should be gone, show button
    expect(queryByText('Resend OTP in ')).toBeNull();
    const button = getByText('Resend OTP');
    fireEvent.press(button);
    expect(resendOTP).toHaveBeenCalled();
  });
});
