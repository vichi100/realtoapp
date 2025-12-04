import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, combineReducers } from 'redux';
import { render, fireEvent } from '@testing-library/react-native';

import ContactsResidential from '../../../src/screens/contacts/residential/ContactsResidential';
import AppReducer from '../../../src/reducers/AppReducer';
import dataRefreshReducer from '../../../src/reducers/dataRefreshReducer';

const rootReducer = combineReducers({ AppReducer, dataRefresh: dataRefreshReducer });
const makeStore = (preloaded = {}) => createStore(rootReducer, { AppReducer: preloaded, dataRefresh: { shouldRefresh: false } });

describe('ContactsResidential screen interactions', () => {
  it('renders with minimal store and toggles a simple control if present', () => {
    const store = makeStore({
      userDetails: { id: 'u1', works_for: 'agent-123' },
      residentialCustomerList: [
        { id: 'c1', name: 'Alice', locality: 'Downtown', customer_locality: { property_type: 'Residential', property_for: 'Rent' } },
        { id: 'c2', name: 'Bob', locality: 'Midtown', customer_locality: { property_type: 'Residential', property_for: 'Buy' } },
      ],
    });

    const screen = render(
      <Provider store={store}>
        <NavigationContainer>
          <ContactsResidential route={{ params: {} }} />
        </NavigationContainer>
      </Provider>
    );
    // Render smoke: ensure tree exists without strict content assertions
    expect(screen.toJSON()).toBeTruthy();

    // If there is a filter toggle button, press it (safe-guarded)
    const filterBtn = screen.queryByTestId?.('filter-toggle') || null;
    if (filterBtn) {
      fireEvent.press(filterBtn);
      // Still just a smoke check after interaction
      expect(screen.toJSON()).toBeTruthy();
    }
  });
});
