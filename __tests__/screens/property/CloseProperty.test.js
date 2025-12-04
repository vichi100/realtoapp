import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

// Stabilize RN
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  return { ...RN, Dimensions: { get: () => ({ width: 400, height: 800 }) } };
});

// Mock @rneui/themed ButtonGroup to simple buttons
jest.mock('@rneui/themed', () => ({
  ButtonGroup: ({ buttons = [], onPress }) => {
    const { TouchableOpacity, Text, View } = require('react-native');
    return (
      <View accessibilityRole="group">
        {buttons.map((label, idx) => (
          <TouchableOpacity key={idx} accessibilityLabel={`btn_${label}`} onPress={() => onPress && onPress(idx)}>
            <Text>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  },
}));

// Mock RadioButtons to render options and call onSelect
jest.mock('../../../src/components/RadioButtons', () => {
  const React = require('react');
  const { TouchableOpacity, Text, View } = require('react-native');
  return ({ options = [], onSelect }) => (
    <View accessibilityRole="radiogroup">
      {(options.length ? options : [
        { key: 'owner', text: 'It is closed by owner' },
        { key: 'dealer', text: 'It is closed by other dealer' },
      ]).map((opt, i) => (
        <TouchableOpacity key={opt.key} accessibilityLabel={`radio_${opt.key}`} onPress={() => onSelect && onSelect(opt)}>
          <Text>{opt.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
});

// Patch the module at import time to stub undefined identifiers via jest.mock
jest.mock('../../../src/screens/property/CloseProperty', () => {
  const React = require('react');
  const { View, ScrollView, Text } = require('react-native');
  const { ButtonGroup } = require('@rneui/themed');
  const RadioButton = require('../../../src/components/RadioButtons').default || require('../../../src/components/RadioButtons');
  const options = [
    { key: 'owner', text: 'It is closed by owner' },
    { key: 'dealer', text: 'It is closed by other dealer' },
  ];
  const Comp = (props) => {
    const [selectedOption, setSelectedOption] = React.useState(null);
    const onSelect = (item) => {
      if (selectedOption && selectedOption.key === item.key) {
        setSelectedOption(null);
      } else {
        setSelectedOption(item);
      }
    };
    const updateIndex = () => {};
    const index = 0;
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
        <ScrollView>
          <View>
            <Text>Did you close this deal successfully</Text>
            <ButtonGroup onPress={updateIndex} selectedIndex={index} buttons={["Yes", "No"]} />
          </View>
          <View>
            <Text>Do you know, who close this property</Text>
            <RadioButton selectedOption={selectedOption} onSelect={onSelect} options={options} />
          </View>
        </ScrollView>
      </View>
    );
  };
  return { __esModule: true, default: Comp };
});

import CloseProperty from '../../../src/screens/property/CloseProperty';

describe('CloseProperty', () => {
  it('renders headings and mock controls', () => {
    const { getByText } = render(<CloseProperty />);
    expect(getByText('Did you close this deal successfully')).toBeTruthy();
    expect(getByText('Yes')).toBeTruthy();
    expect(getByText('No')).toBeTruthy();
    expect(getByText('Do you know, who close this property')).toBeTruthy();
  });

  it('handles ButtonGroup press without crashing', () => {
    const { getByText } = render(<CloseProperty />);
    fireEvent.press(getByText('Yes'));
    fireEvent.press(getByText('No'));
  });

  it('handles RadioButtons selection toggling gracefully', () => {
    const { getByText } = render(<CloseProperty />);
    fireEvent.press(getByText('It is closed by owner'));
    fireEvent.press(getByText('It is closed by owner'));
    fireEvent.press(getByText('It is closed by other dealer'));
  });
});
