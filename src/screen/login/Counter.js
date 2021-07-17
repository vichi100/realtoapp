import React from 'react';
import { Switch, StyleSheet, View, Button, Text, ScrollView } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

class Counter extends React.Component {
	constructor() {
		super();
		this.state = {
			count: 120
		};
	}

	componentDidMount() {
		this.interval = setInterval(this.inc, 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	inc = () => {
		if (this.state.count > 0) {
			this.setState((prevState) => ({
				count: prevState.count - 1
			}));
		}
	};

	resend = () => {
		this.props.resendOTP();
	};

	render() {
		return this.state.count > 0 ? (
			<View
				style={{
					flexDirection: 'row',
					margin: 20,
					justifyContent: 'center',
					alignItem: 'center'
				}}
			>
				<Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>Resend OTP in </Text>
				<Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}> {this.state.count}</Text>
				<Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>s</Text>
			</View>
		) : (
			<TouchableHighlight onPress={() => this.resend()}>
				<View
					style={{
						flexDirection: 'row',
						margin: 20,
						justifyContent: 'center',
						alignItem: 'center'
					}}
				>
					<Text style={{ color: '#00BFFF' }}>Resend OTP</Text>
				</View>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	appContainer: {
		// flex: 1,
		// alignItems: "center",
		// justifyContent: "center"
	},
	count: {
		fontSize: 14
		// color: ##FF8C00
	}
});

export default Counter;
