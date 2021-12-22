// import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MainScreen from "./src/navigation/MainScreen";
import { Provider } from "react-redux";
import configureStore from "./Store";

// on top of your index.android.js file
const isAndroid = require('react-native').Platform.OS === 'android'; // this line is only needed if you don't use an .android.js file
const isHermesEnabled = !!global.HermesInternal;  // this line is only needed if you don't use an .android.js file

// in your index.js file
if (isHermesEnabled || isAndroid) {  // this line is only needed if you don't use an .android.js file

  require('@formatjs/intl-getcanonicallocales/polyfill');
  require('@formatjs/intl-locale/polyfill');


  require('@formatjs/intl-pluralrules/polyfill');
  require('@formatjs/intl-pluralrules/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-displaynames/polyfill');
  require('@formatjs/intl-displaynames/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-listformat/polyfill');
  require('@formatjs/intl-listformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-numberformat/polyfill');
  require('@formatjs/intl-numberformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-relativetimeformat/polyfill');
  require('@formatjs/intl-relativetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-datetimeformat/polyfill');
  require('@formatjs/intl-datetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  require('@formatjs/intl-datetimeformat/add-golden-tz.js');



  // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone

  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {

    // If you are using react-native-cli
    // let RNLocalize = require('react-native-localize');
    // Intl.DateTimeFormat.__setDefaultTimeZone(RNLocalize.getTimeZone());

    //  Are you using Expo, use this instead of previous 2 lines
    Intl.DateTimeFormat.__setDefaultTimeZone(
      require("expo-localization").timezone
    );
  }
} // this line is only needed if you don't use an .android.js file


const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  }
});
