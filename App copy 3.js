import React, { useState } from 'react';
import { registerRootComponent } from 'expo';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView
} from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';

const App=()=> {
  const [open, setOpen] = useState(false);

  const onDismiss = () => setOpen(false);
  const onConfirm = (params) => {
    console.log(params.date); // Handle selected date
    setOpen(false);
  };

  return (
    <SafeAreaProvider>
      <Button onPress={() => setOpen(true)}>Pick a Date</Button>
      <DatePickerModal
        locale="en" // Specify your locale
        mode="single"
        visible={open}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
      />
    </SafeAreaProvider>
  );
}



export default registerRootComponent(App);