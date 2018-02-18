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
import QuizButton from '../components/QuizButton';
import QuizView from '../components/QuizView';
import LoginLogo from '../components/LoginLogo';

import {} from '../assets';
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

class QuizScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			text: "I'm not sure what you did for step 5",
			title: 'Title',
			slide: 5,
			total: 40,
			timer: 5,
			correct: 'a',
			a: false,
			b: false,
			c: false,
			d: false,
			selected: false,
			theme: this.props.theme
		};
		getClassData(this.props.code).then(result => {
			const { Title, Slide, SlideTotal } = result;

			this.setState({ title: Title, slide: Slide, total: SlideTotal });
		});
	}

	componentDidMount() {
		// while (this.state.timer > 0) {
		// 	// setTimeout(this.tick, 1000);
		// }
		database
			.ref(`Classes/${this.props.code}/Quiz/Value`)
			.once('value')
			.then(snapshot => {
				this.setState({ correct: snapshot.val().toLowerCase() });
			});
		this.timer = setInterval(this.tick, 1000);
		setTimeout(() => {
			clearInterval(this.timer);
			setTimeout(() => {
				this.props.navigation.goBack();
			}, 5000);
		}, 5500);
	}

	renderString = number => {
		if (number >= 10) {
			return number;
		} else {
			return `0${number}`;
		}
	};

	tick = () => {
		this.setState({ timer: this.state.timer - 1 });
	};

	select = val => {
		if (this.state.timer > 0) {
			this.setState({ a: false, b: false, c: false, d: false });
			switch (val) {
				case 'a':
					this.setState({ a: true });
					break;
				case 'b':
					this.setState({ b: true });
					break;
				case 'c':
					this.setState({ c: true });
					break;
				case 'd':
					this.setState({ d: true });
					break;
				default:
					return 0;
			}
		}
	};

	render() {
		const { transparent, container, header, body, footer, Wrapper } = styles;
		const { subtitle, title, row, bar, filling } = styles;
		const { footerBody, footerTitle, footerButton, footerButtonText } = styles;
		const { horizontalRule, input } = styles;

		const { slide, total } = this.state;

		return (
			<View style={Wrapper} behavior="padding">
				<LinearGradient colors={this.state.theme} style={container} />
				<StatusBar barStyle="light-content" />

				<View style={[transparent, header]}>
					<Text style={[title]}>{this.state.title}</Text>
					<Text style={[subtitle]}>
						{slide}/{total}
					</Text>
				</View>

				<View style={[transparent, body]}>
					<View style={{ flex: 1 }}>
						<View style={row}>
							{this.state.timer > 0 ? (
								<QuizButton
									text="A"
									selected={this.state.a}
									onPress={() => this.select('a')}
								/>
							) : (
								<QuizView text="A" right={this.state.correct == 'a'} />
							)}
							{this.state.timer > 0 ? (
								<QuizButton
									text="B"
									selected={this.state.b}
									onPress={() => this.select('b')}
								/>
							) : (
								<QuizView text="B" right={this.state.correct == 'b'} />
							)}
						</View>
						<View style={row}>
							{this.state.timer > 0 ? (
								<QuizButton
									text="C"
									selected={this.state.c}
									onPress={() => this.select('c')}
								/>
							) : (
								<QuizView text="C" right={this.state.correct == 'c'} />
							)}
							{this.state.timer > 0 ? (
								<QuizButton
									text="D"
									selected={this.state.d}
									onPress={() => this.select('d')}
								/>
							) : (
								<QuizView text="D" right={this.state.correct == 'd'} />
							)}
						</View>
					</View>
				</View>
				<View style={[transparent, footer]}>
					<View style={bar}>
						<Text style={footerTitle}>
							0:{this.renderString(this.state.timer)}
						</Text>
					</View>
				</View>
			</View>
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
		flex: 1.2,
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
		flex: 1.5
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
		backgroundColor: WHITE,
		opacity: FADE,
		backgroundColor: 'black',
		justifyContent: 'center',
		alignItems: 'center',
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
	return { code: session.code, theme: session.theme };
};

export default connect(mapStateToProps)(QuizScreen);
