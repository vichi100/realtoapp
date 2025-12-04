import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../../src/components/Button';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(<Button title="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Click Me" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Click Me'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <Button title="Styled Button" style={customStyle} testID="custom-button" />
    );
    
    const button = getByTestId('custom-button');
    expect(button).toBeTruthy();
  });
});
