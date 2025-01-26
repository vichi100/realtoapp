// import { StatusBar } from "expo-status-bar";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { registerRootComponent } from 'expo';
import React, { useState }  from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import MainScreen from "./src/navigation/MainScreen";
import { Provider } from "react-redux";
import configureStore from "./Store";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView
} from 'react-native-safe-area-context';

import DatePicker, { RangeOutput, SingleOutput } from 'react-native-neat-date-picker'



// on top of your index.android.js file
const isAndroid = require('react-native').Platform.OS === 'android'; // this line is only needed if you don't use an .android.js file
const isHermesEnabled = !!global.HermesInternal;  // this line is only needed if you don't use an .android.js file

// in your index.js file
if (isHermesEnabled || isAndroid) {  // this line is only needed if you don't use an .android.js file

  // require('@formatjs/intl-getcanonicallocales/polyfill');
  // require('@formatjs/intl-locale/polyfill');


  // require('@formatjs/intl-pluralrules/polyfill');
  // require('@formatjs/intl-pluralrules/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  // require('@formatjs/intl-displaynames/polyfill');
  // require('@formatjs/intl-displaynames/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  // require('@formatjs/intl-listformat/polyfill');
  // require('@formatjs/intl-listformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  // require('@formatjs/intl-numberformat/polyfill');
  // require('@formatjs/intl-numberformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  // require('@formatjs/intl-relativetimeformat/polyfill');
  // require('@formatjs/intl-relativetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  // require('@formatjs/intl-datetimeformat/polyfill');
  // require('@formatjs/intl-datetimeformat/locale-data/en.js'); // USE YOUR OWN LANGUAGE OR MULTIPLE IMPORTS YOU WANT TO SUPPORT

  // require('@formatjs/intl-datetimeformat/add-golden-tz.js');



  // https://formatjs.io/docs/polyfills/intl-datetimeformat/#default-timezone

  if ('__setDefaultTimeZone' in Intl.DateTimeFormat) {

    // If you are using react-native-cli
    // let RNLocalize = require('react-native-localize');
    // Intl.DateTimeFormat.__setDefaultTimeZone(RNLocalize.getTimeZone());

    //  Are you using Expo, use this instead of previous 2 lines
    Intl.DateTimeFormat.__setDefaultTimeZone(
      // require("expo-localization").timezone
    );
  }
} // this line is only needed if you don't use an .android.js file


const store = configureStore();


const App=()=> {
  const [showDatePickerSingle, setShowDatePickerSingle] = useState(false)
  const [showDatePickerRange, setShowDatePickerRange] = useState(false)

  const [date, setDate] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const openDatePickerSingle = () => setShowDatePickerSingle(true)
  const openDatePickerRange = () => setShowDatePickerRange(true)

  const onCancelSingle = () => {
    // You should close the modal here
    setShowDatePickerSingle(false)
  }

  const onConfirmSingle = (SingleOutput) => {
    // You should close the modal here
    setShowDatePickerSingle(false)

    // The parameter 'output' is an object containing date and dateString (for single mode).
    // For range mode, the output contains startDate, startDateString, endDate, and endDateString
    console.log(SingleOutput)
    setDate(SingleOutput.dateString ?? '')
  }

  const onCancelRange = () => {
    setShowDatePickerRange(false)
  }

  

  return (
    <View style={styles.container}>
      {/* Single Date */}
      <Button title={'single'} onPress={openDatePickerSingle} />
      <DatePicker
        isVisible={showDatePickerSingle}
        mode={'single'}
        initialDate={new Date()}
        minDate={new Date()}
        onCancel={onCancelSingle}
        onConfirm={onConfirmSingle}
        dateStringFormat={"dd-mmm-yyyy"}
      />
      <Text>{date}</Text>

      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default registerRootComponent(App);