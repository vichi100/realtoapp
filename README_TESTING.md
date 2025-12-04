# Unit Testing with Jest + React Native Testing Library

## Overview
This project uses Jest and React Native Testing Library (RNTL) for unit and integration testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- Login.test.js

# Run tests matching pattern
npm test -- --testNamePattern="Login"
```

## Test Structure

Tests are organized in a dedicated `__tests__` directory at the project root, mirroring the `src` structure:

```
__tests__/
├── components/
│   └── Button.test.js
├── screens/
│   └── login/
│       ├── Login.test.js
│       └── OtpScreen.test.js
├── reducers/
│   └── AppReducer.test.js
└── utils/
    └── methods.test.js

src/
├── components/
│   └── Button.js
├── screens/
│   └── login/
│       ├── Login.js
│       └── OtpScreen.js
├── reducers/
│   └── AppReducer.js
└── utils/
    └── methods.js
```

### Benefits of this structure:
- ✅ Cleaner `src` directory (only production code)
- ✅ Easier to exclude tests from builds
- ✅ Clear separation of concerns
- ✅ Easier to configure test-specific linting rules
- ✅ Better for large projects with many tests

## Writing Tests

### Component Testing

```javascript
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

test('button calls onPress when pressed', () => {
  const mockOnPress = jest.fn();
  const { getByText } = render(<Button title="Click" onPress={mockOnPress} />);
  
  fireEvent.press(getByText('Click'));
  expect(mockOnPress).toHaveBeenCalled();
});
```

### Testing with Redux

```javascript
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

test('component with redux', () => {
  const store = mockStore({ AppReducer: { userDetails: null } });
  
  const { getByText } = render(
    <Provider store={store}>
      <MyComponent />
    </Provider>
  );
});
```

### Testing with Navigation

```javascript
test('navigation works', () => {
  const navigation = { navigate: jest.fn() };
  const { getByText } = render(<Screen navigation={navigation} />);
  
  fireEvent.press(getByText('Next'));
  expect(navigation.navigate).toHaveBeenCalledWith('NextScreen');
});
```

### Async Testing

```javascript
import { waitFor } from '@testing-library/react-native';

test('async operation', async () => {
  const { getByText } = render(<Component />);
  
  await waitFor(() => {
    expect(getByText('Loaded')).toBeTruthy();
  });
});
```

## Mocking

### Mock API calls
```javascript
import axios from 'axios';
jest.mock('axios');

axios.post.mockResolvedValue({ data: { success: true } });
```

### Mock Navigation
Already configured in `jest.setup.js`

### Mock Redux Store
Use `redux-mock-store` (already installed)

## Test Coverage

Coverage reports are generated in the `coverage/` directory.

Key metrics:
- Statements
- Branches
- Functions
- Lines

## Best Practices

1. **Test user behavior, not implementation**
   - Focus on what users see and do
   - Avoid testing internal state

2. **Use semantic queries**
   - `getByText`, `getByPlaceholderText`, `getByTestId`
   - Prefer accessible queries

3. **Keep tests simple and focused**
   - One concept per test
   - Clear test names

4. **Mock external dependencies**
   - APIs, navigation, async storage
   - Keep tests isolated

5. **Test edge cases**
   - Empty states
   - Error conditions
   - Loading states

## Common Testing Patterns

### Input Testing
```javascript
const input = getByPlaceholderText('Enter Mobile Number');
fireEvent.changeText(input, '9990000001');
expect(input.props.value).toBe('9990000001');
```

### Button Testing
```javascript
const button = getByTestId('submit-button');
fireEvent.press(button);
expect(mockFunction).toHaveBeenCalled();
```

### Conditional Rendering
```javascript
const { queryByText } = render(<Component />);
expect(queryByText('Hidden Text')).toBeNull();
```

## Debugging Tests

```bash
# Run with verbose output
npm test -- --verbose

# Debug specific test
node --inspect-brk node_modules/.bin/jest --runInBand Login.test.js
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
