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
import { connect } from 'react-redux';
import { getClassData, database } from '../firebase/firebase';
import { LinearGradient } from 'expo';
import UserButton from '../components/UserButton';
import LoginLogo from '../components/LoginLogo';

import { Forward, Rewind, Louder, Lower, ThumbUp, ThumbDown } from '../assets';
import {
	BLUEPURPLE,
	PINKORANGE,
	GREENBLUE,
	WHITE,
	FADE,
	LARGE,
	MEDIUM,
	BUTTON_BORDER_RADIUS
} from '../common/constants';

const OS = Platform.OS;
const GRADIENT_COLOR = BLUEPURPLE;

class UserScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyboardActive: false,
			text: '',
			title: 'Title',
			slide: 5,
			total: 40
		};
		getClassData(this.props.code).then(result => {
			const { Title, Slide, SlideTotal } = result;

			this.setState({ title: Title, slide: Slide, total: SlideTotal });
		});
	}

	componentDidMount() {
		console.log('theme is', this.props.theme);
		database
			.ref(`Classes/${this.props.code}/SlideTotal`)
			.on('value', snapshot => {
				this.setState({ total: snapshot.val() });
			});

		database.ref(`Classes/${this.props.code}/Slide`).on('value', snapshot => {
			this.setState({ slide: snapshot.val() });
		});

		database
			.ref(`Classes/${this.props.code}/Quiz/Active`)
			.on('value', snapshot => {
				let switchVal = snapshot.val();
				if (switchVal == true) {
					this.props.navigation.navigate('quiz');
				}
			});
	}

	onIconPress = val => {
		database
			.ref(`Classes/${this.props.code}/Feedback`)
			.push()
			.set(val);
	};

	onSend = () => {
		if (this.state.text != '') {
			database
				.ref(`Classes/${this.props.code}/Questions`)
				.push()
				.set({
					Public: false,
					String: this.state.text,
					Student: this.props.name
				});
			this.setState({ text: '' });
		}
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

	render() {
		const { transparent, container, header, body, footer, Wrapper } = styles;
		const { subtitle, title, row, bar, filling } = styles;
		const { footerBody, footerTitle, footerButton, footerButtonText } = styles;
		const { horizontalRule, input } = styles;

		const { keyboardActive, slide, total } = this.state;

		return (
			<KeyboardAvoidingView style={Wrapper} behavior="padding">
				<LinearGradient colors={this.props.theme} style={container} />
				<StatusBar barStyle="light-content" />
				{!keyboardActive && (
					<View style={[transparent, header]}>
						<Text style={[title]}>{this.state.title}</Text>
						<Text style={[subtitle]}>
							{slide}/{total}
						</Text>
					</View>
				)}
				<View style={[transparent, body]}>
					<View style={{ flex: 1 }}>
						<View style={row}>
							<UserButton
								image={Rewind}
								text="Go Slower"
								onPress={() => this.onIconPress('Rewind')}
							/>
							<UserButton
								image={Forward}
								text="Go Faster"
								onPress={() => this.onIconPress('Forward')}
							/>
						</View>
						<View style={row}>
							<UserButton
								image={Lower}
								text="Quiet Down"
								onPress={() => this.onIconPress('Lower')}
							/>
							<UserButton
								image={Louder}
								text="Speak Up"
								onPress={() => this.onIconPress('Louder')}
							/>
						</View>
						{!keyboardActive && (
							<View style={row}>
								<UserButton
									image={ThumbDown}
									text="Confusing"
									onPress={() => this.onIconPress('ThumbDown')}
								/>
								<UserButton
									image={ThumbUp}
									text="Clear"
									onPress={() => this.onIconPress('ThumbUp')}
								/>
							</View>
						)}
					</View>
				</View>
				<View style={[transparent, footer]}>
					<View style={bar}>
						<View style={filling} />
						<Text style={footerTitle}>Ask A Question</Text>
					</View>
					<View style={footerBody}>
						<View style={styles.inputContainer}>
							<View style={{ flex: 4 }}>
								<TextInput
									value={this.state.text}
									style={input}
									onChangeText={text => this.setState({ text })}
									underlineColorAndroid="transparent"
								/>
								<View style={horizontalRule} />
							</View>

							<TouchableOpacity style={footerButton} onPress={this.onSend}>
								<View style={[container, styles.footerFade]} />
								<Text style={footerButtonText}>Send</Text>
							</TouchableOpacity>
						</View>
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
		flex: 3.7,
		marginTop: 5,
		marginBottom: 5,
		paddingLeft: 10,
		paddingRight: 10
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	footer: {
		flex: 1.1
	},
	bar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
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
	footerTitle: {
		color: WHITE,
		fontWeight: 'bold',
		fontSize: MEDIUM,
		paddingTop: 5,
		paddingBottom: 5
	},
	input: {
		color: WHITE,
		height: 26,
		fontSize: 15
	},
	horizontalRule: {
		borderBottomColor: WHITE,
		flex: 3.8,
		borderBottomWidth: 4,
		opacity: FADE
	},
	footerButton: {
		height: 30,
		flex: 1.5,
		borderRadius: BUTTON_BORDER_RADIUS,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 5
	},
	footerFade: {
		borderRadius: BUTTON_BORDER_RADIUS,
		backgroundColor: WHITE,
		opacity: FADE,
		marginLeft: 5
	},
	footerButtonText: {
		color: 'white',
		fontWeight: 'bold'
	},
	inputContainer: {
		flexDirection: 'row',
		marginTop: 10,
		alignItems: 'flex-end'
	}
});

mapStateToProps = ({ session }) => {
	return { code: session.code, name: session.name, theme: session.theme };
};

export default connect(mapStateToProps)(UserScreen);
