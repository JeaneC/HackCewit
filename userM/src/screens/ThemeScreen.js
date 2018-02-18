import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	TextInput,
	KeyboardAvoidingView,
	Keyboard,
	Platform
} from 'react-native';
import { LinearGradient } from 'expo';
import { connect } from 'react-redux';
import { signIn, chooseTheme } from '../actions';
import LoginLogo from '../components/LoginLogo';
import { firebase, database } from '../firebase/firebase';
import { StackNavigator } from 'react-navigation';

import { Screen } from '../assets';
import {
	BLUEPURPLE,
	PINKORANGE,
	GREENBLUE,
	WHITE,
	FADE,
	LARGE,
	MEDIUM,
	SMALL,
	BLACK,
	BUTTON_BORDER_RADIUS
} from '../common/constants';

const OS = Platform.OS;
const GRADIENT_COLOR = BLUEPURPLE;
const BORDER_WIDTH = 1.5;

class ThemeScreen extends Component {
	state = {
		keyboardActive: false,
		email: 'jeane.carlos15@stjohns.edu',
		pass: 'password1',
		code: '67445',
		room: '124916',
		gradient: GRADIENT_COLOR,
		valSelected: 1
	};
	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			this.keyboardDidShow
		);
		this.keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			this.keyboardDidHide
		);
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	keyboardDidShow = () => {
		this.setState({ keyboardActive: true });
	};

	keyboardDidHide = () => {
		this.setState({ keyboardActive: false });
	};

	start = () => {
		const { valSelected } = this.state;
		console.log('selected', valSelected);
		this.props.chooseTheme(valSelected);
		this.props.navigation.navigate('user');
	};

	onValPress = valSelected => {
		if (valSelected == 1) {
			this.setState({ gradient: BLUEPURPLE, valSelected });
		} else if (valSelected == 2) {
			this.setState({ gradient: PINKORANGE, valSelected });
		} else if (valSelected == 3) {
			this.setState({ gradient: GREENBLUE, valSelected });
		}
	};

	render() {
		const { transparent, container, header, body, footer, Wrapper } = styles;
		const { subtitle, title, row, bar, filling } = styles;
		const { footerBody, footerTitle, actionButton, actionButtonText } = styles;

		const { keyboardActive } = this.state;
		return (
			<KeyboardAvoidingView style={Wrapper} behavior="padding">
				<LinearGradient colors={this.state.gradient} style={container} />
				<StatusBar barStyle="light-content" />
				<View style={[transparent, header]}>
					<LoginLogo image={Screen} />
				</View>
				<View style={[transparent, footer]}>
					<Text style={styles.themeLabel}>Choose A Theme</Text>
					<View style={styles.themeRow}>
						<TouchableOpacity
							style={styles.themeButton}
							onPress={() => this.onValPress(1)}
						>
							<LinearGradient colors={BLUEPURPLE} style={styles.container} />
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.themeButton}
							onPress={() => this.onValPress(2)}
						>
							<LinearGradient colors={PINKORANGE} style={styles.container} />
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.themeButton, { marginRight: 0 }]}
							onPress={() => this.onValPress(3)}
						>
							<LinearGradient colors={GREENBLUE} style={styles.container} />
						</TouchableOpacity>
					</View>
					<View style={{ flex: 1, flexDirection: 'row' }}>
						<TouchableOpacity style={actionButton} onPress={this.start}>
							<View style={styles.actionButtonFade} />
							<Text style={actionButtonText}>START</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	Wrapper: {
		flex: 1,
		paddingTop: OS == 'android' ? 15 : 0
	},
	container: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		borderRadius: 10
	},
	themeButton: {
		height: 50,
		width: 50,
		marginRight: 30
	},
	transparent: {
		backgroundColor: 'transparent'
	},
	title: {
		fontSize: LARGE,
		fontWeight: 'bold',
		color: 'white'
	},
	subtitle: {
		fontSize: 20,
		color: 'white',
		marginTop: 5
	},
	header: {
		flex: 0.7,
		justifyContent: 'center',
		alignItems: 'center',
		paddingTop: 20
	},
	body: {
		flex: 1
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	footer: {
		flex: 1,
		marginTop: 20,
		alignItems: 'center'
	},
	formFrame: {
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginLeft: 30,
		marginRight: 30,
		borderColor: WHITE,
		borderWidth: BORDER_WIDTH,
		borderBottomWidth: 0
	},
	themeRow: {
		flexDirection: 'row',
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	footerBody: {
		flex: 2,
		marginTop: 10,
		paddingLeft: 30,
		paddingRight: 30
	},
	filling: {
		position: 'absolute',
		backgroundColor: WHITE,
		opacity: FADE,
		top: 0,
		bottom: 0,
		left: 0,
		right: 0
	},
	themeLabel: {
		color: WHITE,
		fontSize: 24,
		fontWeight: 'bold'
	},
	formLabel: {
		color: WHITE,
		flex: 1,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: SMALL + 2,
		paddingTop: 5,
		paddingBottom: 5
	},
	input: {
		color: WHITE,
		height: 50,
		flex: 4,
		fontSize: 15
	},
	actionButton: {
		height: 50,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
		marginLeft: 30,
		marginRight: 30
	},
	actionButtonFade: {
		position: 'absolute',
		backgroundColor: 'black',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		opacity: FADE + 0.2
	},
	actionButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16
	},
	inputContainer: {
		flexDirection: 'row',
		marginTop: 10,
		alignItems: 'flex-end'
	}
});

const mapDispatchToProps = dispatch => ({
	signIn: (token, code, name) => {
		dispatch(signIn(token, code, name));
	},
	chooseTheme: val => {
		dispatch(chooseTheme(val));
	}
});

export default connect(null, mapDispatchToProps)(ThemeScreen);
