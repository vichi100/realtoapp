import React from "react";
import { StyleSheet, Text } from "react-native";
import { Content, Item, Input } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import { connect } from "react-redux";
import { View } from "react-native-animatable";
// 38204547172 - bule dart
// 6 digit

class OtpInputs extends React.Component {
  state = { otp: [] };
  otpTextInput = [];

  componentDidMount() {
    this.otpTextInput[0]._root.focus();
  }

  renderInputs() {
    const inputs = Array(6).fill(0);
    const txt = inputs.map((i, j) => (
      <Col key={j} style={styles.txtMargin}>
        <Item regular>
          <Input
            style={[styles.inputRadius, { borderRadius: 10 }]}
            keyboardType="numeric"
            onChangeText={v => this.focusNext(j, v)}
            onKeyPress={e => this.focusPrevious(e.nativeEvent.key, j)}
            ref={ref => (this.otpTextInput[j] = ref)}
          />
        </Item>
      </Col>
    ));
    return txt;
  }

  focusPrevious(key, index) {
    if (key === "Backspace" && index !== 0)
      this.otpTextInput[index - 1]._root.focus();
  }

  focusNext(index, value) {
    if (index < this.otpTextInput.length - 1 && value) {
      this.otpTextInput[index + 1]._root.focus();
    }
    if (index === this.otpTextInput.length - 1) {
      this.otpTextInput[index]._root.blur();
    }
    const otp = this.state.otp;
    otp[index] = value;
    this.setState({ otp });
    this.props.getOtp(otp.join(""));
  }

  render() {
    return (
      <Content padder>
        <View
          style={{
            flexDirection: "row",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ textAlign: "center" }}>Enter OTP sent to +91</Text>
          <Text>{"  " + this.props.agentMobileNumber}</Text>
        </View>

        <Grid style={styles.gridPad}>{this.renderInputs()}</Grid>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  gridPad: { padding: 15 },
  txtMargin: { margin: 3 },
  inputRadius: { textAlign: "center" }
});

const mapStateToProps = state => ({
  agentMobileNumber: state.AppReducer.agentMobileNumber
});
// const mapDispatchToProps = {
//   setAgentMobile
// };

export default connect(
  mapStateToProps,
  null
)(OtpInputs);

// export default OtpInputs;
