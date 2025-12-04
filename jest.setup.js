// jest.setup.js
// RNTL does not require extend-expect for React Native

// Mock TurboModuleRegistry to avoid DevMenu invariant during tests
jest.mock('react-native/Libraries/TurboModule/TurboModuleRegistry', () => ({
  getEnforcing: () => ({
    getConstants: () => ({}),
  }),
  get: () => ({
    getConstants: () => ({}),
  }),
}));

// Provide Dimensions mock to satisfy RN internals
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: () => ({ width: 375, height: 812, scale: 2, fontScale: 2 }),
  set: () => {},
  addEventListener: () => ({ remove: () => {} }),
  removeEventListener: () => {},
}));

// Mock PixelRatio to prevent undefined get errors
jest.mock('react-native/Libraries/Utilities/PixelRatio', () => {
  const api = {
    get: () => 2,
    getFontScale: () => 2,
    getPixelSizeForLayoutSize: (size) => size * 2,
    roundToNearestPixel: (size) => size,
  };
  return { default: api, ...api };
});

// Provide a simple global FormData for tests that build multipart payloads
if (typeof global.FormData === 'undefined') {
  class SimpleFormData {
    constructor() { this._data = []; }
    append(key, value) { this._data.push([key, value]); }
  }
  global.FormData = SimpleFormData;
}

// Avoid mocking the entire react-native module to prevent TurboModule issues

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const { View, ScrollView } = require('react-native');
  return {
    View,
    ScrollView,
    NativeReanimated: { native: false },
    useSharedValue: () => 0,
    useAnimatedStyle: () => ({}),
    withTiming: (v) => v,
    runOnJS: (fn) => fn,
    default: {},
  };
});

// Mock Expo modules
jest.mock('expo-font');
jest.mock('expo-asset');
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {}
  }
}));

// Mock expo-image-picker (ESM) with common API methods
jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted', granted: true }),
  requestCameraPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted', granted: true }),
  launchImageLibraryAsync: jest.fn().mockResolvedValue({ cancelled: true, canceled: true, assets: [] }),
  launchCameraAsync: jest.fn().mockResolvedValue({ cancelled: true, canceled: true, assets: [] }),
  MediaTypeOptions: { Images: 'Images', All: 'All' },
  PermissionStatus: { GRANTED: 'granted', DENIED: 'denied' },
}), { virtual: true });

// Mock expo-image-manipulator (ESM) to avoid TS/ESM parsing in Jest
jest.mock('expo-image-manipulator', () => ({
  manipulateAsync: jest.fn().mockResolvedValue({ uri: 'mock://image', width: 0, height: 0, base64: null }),
  ImageManipulator: {},
  useImageManipulator: () => ({}),
}), { virtual: true });

// Mock environment variables used by babel-plugin-dotenv-import
jest.mock('@env', () => ({
  REALTO_APP_SERVER_URL: 'http://localhost',
  REALTO_WEB_APP_URL: 'http://localhost',
  REALTO_GOOGLE_PLACES_API_KEY: 'test-key',
  REALTO_EMAIL_PDF_SERVER_URL: 'http://localhost',
}), { virtual: true });

// Mock @env variables used by babel-plugin-dotenv-import to avoid coverage collection errors
jest.mock('@env', () => ({
  REALTO_APP_SERVER_URL: 'http://localhost',
  REALTO_WEB_APP_URL: 'http://localhost',
  REALTO_GOOGLE_PLACES_API_KEY: 'test-key',
  REALTO_EMAIL_PDF_SERVER_URL: 'http://localhost',
}), { virtual: true });

// Mock expo-linear-gradient to a simple View
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: require('react-native').View,
}));

// Stub Constant.js to avoid babel-plugin-dotenv-import enforcement during tests
jest.mock('/Users/vichi/Documents/workspace/realtoapp/src/utils/Constant.js', () => ({
  EMAIL_PDF_SERVER: 'http://localhost',
  WEB_APP_URL: 'http://localhost',
  SERVER_URL: 'http://localhost',
  GOOGLE_PLACES_API_KEY: 'test-key',
}));

// Mock react-native-paper-dates to avoid complex native dependencies in unit tests
jest.mock('react-native-paper-dates', () => ({
  en: {},
}));

// Stub react-native-paper to lightweight components to avoid SafeAreaProvider issues
jest.mock('react-native-paper', () => {
  const React = require('react');
  const { View, Text, TextInput: RNTextInput } = require('react-native');
  const TextInput = ({ value, onChangeText, placeholder, testID }) => React.createElement(RNTextInput, { value, onChangeText, placeholder, testID });
  const Divider = () => React.createElement(View);
  const HelperText = ({ children }) => React.createElement(Text, null, children);
  const useTheme = () => ({ colors: {} });
  const Snackbar = ({ visible, children }) => visible ? React.createElement(Text, null, children || 'Snackbar') : null;
  return { TextInput, Divider, HelperText, useTheme, Snackbar };
});

// Mock @rneui/themed to avoid RN size-matters dependency issues in tests
jest.mock('@rneui/themed', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  const ButtonGroup = ({ buttons = [], onPress = () => null }) => null;
  const CheckBox = ({ onPress = () => null, checked = false, testID, accessibilityLabel }) => (
    <TouchableOpacity onPress={onPress} testID={testID} accessibilityLabel={accessibilityLabel}>
      <Text>{checked ? 'Checked' : 'Unchecked'}</Text>
    </TouchableOpacity>
  );
  return { ButtonGroup, CheckBox };
});

// Use actual react-redux to preserve connect mappings used by tests
// (Do not mock connect; tests rely on real mapState/mapDispatch behavior)
jest.mock('react-redux', () => jest.requireActual('react-redux'));

// Mock Axios as a callable jest.fn with HTTP method stubs
jest.mock('axios', () => {
  const resolve = (data = {}) => Promise.resolve({ data });
  const axios = jest.fn(() => resolve({}));
  axios.post = jest.fn(() => resolve({}));
  axios.get = jest.fn(() => resolve({}));
  axios.put = jest.fn(() => resolve({}));
  axios.delete = jest.fn(() => resolve({}));
  axios.create = () => axios;
  return { __esModule: true, default: axios, ...axios };
});

// Silence Animated warnings (RN 0.79 path changed) – skip explicit mock

// Mock React Navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      addListener: jest.fn(),
    }),
    useIsFocused: () => true,
    useRoute: () => ({
      params: {},
    }),
    getFocusedRouteNameFromRoute: () => undefined,
  };
});

// Mock navigators: stack, native-stack, bottom-tabs, material-top-tabs
const createNavigatorMock = () => {
  const React = require('react');
  const { View } = require('react-native');
  const Navigator = ({ children }) => React.createElement(View, null, children);
  const Screen = ({ children }) => React.createElement(View, null, children);
  return { Navigator, Screen };
};

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => createNavigatorMock(),
}));

jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: () => createNavigatorMock(),
}));

jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: () => createNavigatorMock(),
}));

jest.mock('@react-navigation/material-top-tabs', () => ({
  createMaterialTopTabNavigator: () => createNavigatorMock(),
}));

// Mock react-native-paper bottom tabs integration
jest.mock('react-native-paper/react-navigation', () => ({
  createMaterialBottomTabNavigator: () => {
    const React = require('react');
    const { View } = require('react-native');
    const Navigator = ({ children }) => React.createElement(View, null, children);
    const Screen = ({ children }) => React.createElement(View, null, children);
    return { Navigator, Screen };
  },
}));

// Stub ESM-only libraries used in contacts screens
jest.mock('react-native-btr', () => {
  const React = require('react');
  const { View } = require('react-native');
  const BottomSheet = ({ children }) => React.createElement(View, null, children);
  return { BottomSheet };
});

jest.mock('react-native-segmented-control-tab', () => {
  const { View } = require('react-native');
  return View;
});

jest.mock('react-native-modal-activityindicator', () => {
  const React = require('react');
  const { View } = require('react-native');
  return ({ visible }) => visible ? React.createElement(View) : null;
});

jest.mock('react-native-neat-date-picker', () => {
  const React = require('react');
  const { View } = require('react-native');
  const DatePicker = () => React.createElement(View);
  return { __esModule: true, default: DatePicker, RangeOutput: {}, SingleOutput: {} };
});

jest.mock('react-native-google-places-autocomplete', () => {
  const { View } = require('react-native');
  return { GooglePlacesAutocomplete: View };
});

// Mock react-native-gesture-handler to avoid reanimated integration in tests
jest.mock('react-native-gesture-handler', () => {
  const { View, TouchableOpacity } = require('react-native');
  return {
    GestureHandlerRootView: View,
    TouchableOpacity,
    Swipeable: View,
    DrawerLayout: View,
    PanGestureHandler: View,
    TapGestureHandler: View,
    State: {},
  };
});

// Provide global alert mock used in some screens
if (typeof global.alert === 'undefined') {
  global.alert = jest.fn();
}

// Provide a fallback for Dimensions and StatusBar on react-native to avoid undefined
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  const AnimatedValueInstance = {
    setValue: () => {},
    interpolate: ({ inputRange, outputRange }) => {
      // Return the end of outputRange for simplicity
      return Array.isArray(outputRange) ? outputRange[outputRange.length - 1] : 0;
    },
    addListener: () => ({ remove: () => {} }),
    removeListener: () => {},
  };
  const AnimatedMock = {
    timing: () => ({ start: (cb) => cb && cb() }),
    Value: function () { return { ...AnimatedValueInstance }; },
  };
  return {
    ...RN,
    Dimensions: { get: () => ({ width: 375, height: 812 }) },
    StatusBar: { currentHeight: 0 },
    Animated: { ...RN.Animated, ...AnimatedMock },
    Linking: { ...RN.Linking, openURL: () => Promise.resolve() },
  };
});

// Stub KeyboardAwareScrollView
jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const { View } = require('react-native');
  return { KeyboardAwareScrollView: View };
});

// Older usage of react-native-elements ButtonGroup
jest.mock('react-native-elements', () => {
  const React = require('react');
  const { TouchableOpacity, Text } = require('react-native');
  const ButtonGroup = ({ buttons = [], onPress = () => null }) => React.createElement(TouchableOpacity, { onPress }, React.createElement(Text, null, 'ButtonGroup'));
  return { ButtonGroup };
});

// Icons stubs
jest.mock('react-native-vector-icons/AntDesign', () => 'Icon');
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon');
jest.mock('react-native-vector-icons/SimpleLineIcons', () => 'Icon');

// Expo vector icons stub
jest.mock('@expo/vector-icons', () => {
  const Icon = 'Icon';
  return {
    __esModule: true,
    Ionicons: Icon,
    Entypo: Icon,
    MaterialCommunityIcons: Icon,
    AntDesign: Icon,
    FontAwesome: Icon,
    MaterialIcons: Icon,
  };
});

// react-native-svg stub for charts
jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  const Svg = (props) => React.createElement(View, props, props.children);
  const Path = (props) => React.createElement(View, props, props.children);
  const G = (props) => React.createElement(View, props, props.children);
  return { __esModule: true, default: Svg, Svg, Path, G };
});
