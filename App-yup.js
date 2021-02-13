import React from "react";
import {
  SafeAreaView,
  Button,
  ActivityIndicator,
  Text,
  View
} from "react-native";
import { TextInput, HelperText, useTheme } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import { ButtonGroup } from "react-native-elements";

const StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyles = {
    // borderWidth: 1,
    // borderColor: "black",
    // padding: 10,
    marginBottom: 3,
    backgroundColor: "#ffffff"
  };

  const inputTheme = {
    colors: {
      // placeholder: "white",
      // text: "white",
      primary: "rgba(0,191,255, .9)",
      underlineColor: "transparent",
      background: "#ffffff"
    }
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = "red";
    inputTheme.colors.primary = "red";
  }

  return (
    <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
      {/* <Text style={{ marginBottom: 3 }}>{label}</Text> */}

      {/* <TextInput
        label="Name*"
        value={text}
        onChangeText={text => setText(text)}
        style={{ backgroundColor: "#ffffff" }}
        theme={{
          colors: {
            // placeholder: "white",
            // text: "white",
            primary: "rgba(0,191,255, .9)",
            underlineColor: "transparent",
            background: "#ffffff"
          }
        }}
      /> */}

      <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        label={label}
        {...rest}
        theme={inputTheme}
      />
      <Text style={{ color: "red" }}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </Text>
    </View>
  );
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label("Email")
    .email()
    .required(),
  password: yup
    .string()
    .label("Password")
    .required()
    .min(2, "Seems a bit short...")
    .max(10, "We prefer insecure system, try a shorter password.")
});

const StyledButtonGroup = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyles = {
    // borderWidth: 1,
    // borderColor: "black",
    // padding: 10,
    marginBottom: 3,
    backgroundColor: "#ffffff"
  };

  const inputTheme = {
    colors: {
      // placeholder: "white",
      // text: "white",
      primary: "rgba(0,191,255, .9)",
      underlineColor: "transparent",
      background: "#ffffff"
    }
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = "red";
    inputTheme.colors.primary = "red";
  }

  return (
    <View style={{ marginHorizontal: 20, marginVertical: 5 }}>
      <ButtonGroup
        selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
        onPress={updateIndex}
        selectedIndex={index}
        buttons={["Rent", "Sell"]}
        // containerStyle={{ height: 30 }}
        textStyle={{ textAlign: "center" }}
        selectedTextStyle={{ color: "#fff" }}
        containerStyle={{
          borderRadius: 10,
          width: 300
          // borderColor: "red"
        }}
        containerBorderRadius={10}
      />

      {/* <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        label={label}
        {...rest}
        theme={inputTheme}
      /> */}
      <Text style={{ color: "red" }}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </Text>
    </View>
  );
};

const App = () => {
  const [text, setText] = React.useState("");
  const [index, setIndex] = React.useState(null);
  const updateIndex = index => {
    setIndex(index);
  };
  return (
    <SafeAreaView style={{ marginTop: 90 }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values));
          console.log(JSON.stringify(values));
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 1000);
        }}
        validationSchema={validationSchema}
      >
        {formikProps => (
          <React.Fragment>
            {/* <TextInput
              label="Name*"
              value={text}
              onChangeText={text => setText(text)}
              style={{ backgroundColor: "#ffffff" }}
              theme={{
                colors: {
                  // placeholder: "white",
                  // text: "white",
                  primary: "rgba(0,191,255, .9)",
                  underlineColor: "transparent",
                  background: "#ffffff"
                }
              }}
            /> */}
            <StyledInput
              label="Email"
              formikProps={formikProps}
              formikKey="email"
              placeholder="johndoe@example.com"
              autoFocus
            />

            <StyledInput
              label="Password"
              formikProps={formikProps}
              formikKey="password"
              placeholder="password"
              secureTextEntry
            />

            <StyledButtonGroup
              selectedBackgroundColor="rgba(27, 106, 158, 0.85)"
              onPress={updateIndex}
              selectedIndex={index}
              buttons={["Rent", "Sell"]}
              // containerStyle={{ height: 30 }}
              textStyle={{ textAlign: "center" }}
              selectedTextStyle={{ color: "#fff" }}
              containerStyle={{
                borderRadius: 10,
                width: 300
                // borderColor: "red"
              }}
              containerBorderRadius={10}
            />

            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              <Button title="Submit" onPress={formikProps.handleSubmit} />
            )}
          </React.Fragment>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default App;
