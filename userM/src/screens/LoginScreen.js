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
import { signIn } from '../actions';
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

class LoginScreen extends Component {
	state = {
		keyboardActive: false,
		email: '',
		pass: '',
		code: ''
	};
	// state = {
	// 	keyboardActive: false,
	// 	email: 'jeane.carlos15@stjohns.edu',
	// 	pass: 'password1',
	// 	code: '67445'
	// };
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

	login = () => {
		const { email, pass, code } = this.state;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, pass)
			.then(async ({ uid }) => {
				let name = await database
					.ref(`Users/${uid}/Name`)
					.once('value')
					.then(snapshot => snapshot.val());
				console.log('name', name);
				await this.props.signIn(uid, code, name);
				this.props.navigation.navigate('theme');
				// this.props.signIn(user.uid);
				// this.setModalVisible(false);
				// this.props.navigation.navigate('settings');
			})
			.catch(() => {});
	};

	render() {
		const { transparent, container, header, body, footer, Wrapper } = styles;
		const { subtitle, title, row, bar, filling } = styles;
		const { footerBody, footerTitle, actionButton, actionButtonText } = styles;

		const { keyboardActive } = this.state;
		return (
			<KeyboardAvoidingView style={Wrapper} behavior="padding">
				<LinearGradient colors={GRADIENT_COLOR} style={container} />
				<StatusBar barStyle="light-content" />
				<View style={[transparent, header]}>
					<LoginLogo image={Screen} />
				</View>
				<View style={[transparent, footer]}>
					<View style={styles.formFrame}>
						<View style={filling} />
						<Text style={styles.formLabel}>Email:</Text>
						<TextInput
							value={this.state.email}
							style={styles.input}
							onChangeText={email => this.setState({ email })}
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={styles.formFrame}>
						<View style={filling} />
						<Text style={styles.formLabel}>Pass:</Text>
						<TextInput
							value={this.state.pass}
							style={styles.input}
							caretHidden={false}
							onChangeText={pass => this.setState({ pass })}
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={[styles.formFrame, { borderBottomWidth: BORDER_WIDTH }]}>
						<View style={filling} />
						<Text style={styles.formLabel}>Code</Text>
						<TextInput
							value={this.state.code}
							style={styles.input}
							onChangeText={code => this.setState({ code })}
							underlineColorAndroid="transparent"
						/>
					</View>
					<TouchableOpacity style={actionButton} onPress={this.login}>
						<View style={styles.actionButtonFade} />
						<Text style={actionButtonText}>LOG IN</Text>
					</TouchableOpacity>
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
		bottom: 0
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
		marginTop: 20
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
	}
});

export default connect(null, mapDispatchToProps)(LoginScreen);
