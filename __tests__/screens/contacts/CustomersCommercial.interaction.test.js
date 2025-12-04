import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers } from 'redux';
import { render, fireEvent } from '@testing-library/react-native';

import CustomersCommercial from '../../../src/screens/contacts/commercial/CustomersCommercial';
import AppReducer from '../../../src/reducers/AppReducer';
import dataRefreshReducer from '../../../src/reducers/dataRefreshReducer';

const rootReducer = combineReducers({ AppReducer, dataRefresh: dataRefreshReducer });
const makeStore = (preloaded = {}) => createStore(rootReducer, { AppReducer: preloaded, dataRefresh: { shouldRefresh: false } });

describe('CustomersCommercial screen interactions', () => {
  it('renders with minimal commercial customers and toggles a tab/segment if present', () => {
    const store = makeStore({
      userDetails: { id: 'u1', works_for: 'agent-123' },
      commercialCustomerList: [
        { id: 'cc1', name: 'Delta LLC', locality: 'Business Bay', customer_locality: { property_type: 'Commercial', property_for: 'Rent' } },
        { id: 'cc2', name: 'Echo Inc.', locality: 'Tech Park', customer_locality: { property_type: 'Commercial', property_for: 'Buy' } },
      ],
    });

    const screen = render(
      <Provider store={store}>
        <NavigationContainer>
          <CustomersCommercial route={{ params: {} }} />
        </NavigationContainer>
      </Provider>
    );
    // Render smoke: ensure tree exists without strict content assertions
    expect(screen.toJSON()).toBeTruthy();

    const segmentBuy = screen.queryByTestId?.('segment-buy');
    if (segmentBuy) {
      fireEvent.press(segmentBuy);
      // Smoke check again after interaction
      expect(screen.toJSON()).toBeTruthy();
    }
  });
});
