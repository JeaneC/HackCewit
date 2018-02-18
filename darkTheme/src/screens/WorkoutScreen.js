import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	TextInput,
	Platform,
	Image
} from 'react-native';
import { Svg } from 'expo';
import { connect } from 'react-redux';
import { chooseExercise } from '../actions';
import { StackNavigator } from 'react-navigation';

import time from '../assets/time.png';
import smallPushups from '../assets/smallPushups.png';
import smallSquat from '../assets/smallSquat.png';
import chart from '../assets/chart.png';
import sampleCircle from '../assets/sampleCircle.png';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';

import timeSvg from '../assets/time.svg';
import SvgUri from 'react-native-svg-uri';
import * as Progress from 'react-native-progress';
import GestureRecognizer, {
	swipeDirections
} from 'react-native-swipe-gestures';

import {
	PRIMARY,
	BLACK,
	LARGE,
	MEDIUM,
	BUTTON_BORDER_RADIUS,
	BORDER_WIDTH
} from '../common/constants';

const OS = 'MEEP';

class WorkoutScreen extends Component {
	state = {
		comments: [],
		time: 0,
		rep_count: 0,
		avgScore: 0.0,
		score: 0,
		progress: 0.0,
		gestureName: 'none'
	};

	componentDidMount() {
		this.animate();
		this.timer = setInterval(this.checkOnline, 1000);
	}

	checkOnline = async () => {
		let { data } = await axios.get('http://172.30.2.33:8080/getData');
		let comments = [];

		const old_rep_count = this.state.rep_count;
		const old_score = this.state.score;

		let { rep_count, minimum_angle, session_clock, type } = data;
		rep_count = Number(rep_count);
		const time = Number(session_clock);

		if (old_rep_count == rep_count) {
			return;
		}

		let { backCurvature, rightAngleElbow, rightAngleKnee } = minimum_angle;

		let backScore = Math.floor(Number(1.0 - backCurvature) * 100);
		console.log(backCurvature);
		console.log('back score is ', backScore, 1.0 - backCurvature);

		let rightPart = type === 'pushup' ? rightAngleElbow : rightAngleKnee;

		if (backScore < 80) {
			comments.push('Keep your back straight');
		}

		if (type === 'pushup') {
			if (rightAngleElbow > 45) {
				comments.push('Try to go down all the way');
			}
		} else {
			if (rightAngleKnee > 55) {
				comments.push('Try to go down all the way');
			}
		}

		if (comments.length == 0) {
			comments.push('Great Job on the Form!');
		}
		let score = backScore + 0;

		let avgScore = Math.floor(
			(this.state.avgScore * (rep_count - 1) + score) / rep_count
		);

		// let score = averageScore;
		// console.log(rightScore);

		const average = this.state.avgScore * rep_count;
		// let avgScore = ((average + score) / counter).toFixed(2);
		this.setState({ comments, score: backScore, rep_count, avgScore, time });
		// this.setState({ comments, rep_count, score, time });
		this.animate();
	};

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	animate = () => {
		let progress = 0;
		this.setState({ progress });
		setTimeout(() => {
			this.setState({ indeterminate: false });
			setInterval(() => {
				progress = progress + Math.random() / 5;
				let score = this.state.score.toFixed(2) / 100;
				console.log('here');
				console.log(score, progress);
				if (progress > score) {
					progress = score;
				}
				this.setState({ progress });
			}, 1000);
		}, 1000);
	};

	onSwipeUp(gestureState) {
		this.setState({ myText: 'You swiped up!' });
	}

	onSwipeDown(gestureState) {
		this.setState({ myText: 'You swiped down!' });
	}

	async onSwipeLeft(gestureState) {
		this.setState({ myText: 'You swiped left!' });
	}

	onSwipeRight = async gestureState => {
		this.setState({ myText: 'You swiped right!' });

		let result = await axios.get(`http://172.30.2.33:8080/sessionClose`);
		this.props.navigation.goBack();
	};

	onSwipe(gestureName, gestureState) {
		const { SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections;
		this.setState({ gestureName: gestureName });
		switch (gestureName) {
			case SWIPE_UP:
				this.setState({ backgroundColor: 'red' });
				break;
			case SWIPE_DOWN:
				this.setState({ backgroundColor: 'green' });
				break;
			case SWIPE_LEFT:
				this.setState({ backgroundColor: 'blue' });
				break;
			case SWIPE_RIGHT:
				this.setState({ backgroundColor: 'yellow' });
				break;
		}
	}
	render() {
		let meep = 'hi';
		icon = meep === 'hi' ? smallPushups : chart;

		const config = {
			velocityThreshold: 0.3,
			directionalOffsetThreshold: 80
		};

		return (
			<GestureRecognizer
				onSwipe={(direction, state) => this.onSwipe(direction, state)}
				onSwipeUp={state => this.onSwipeUp(state)}
				onSwipeDown={state => this.onSwipeDown(state)}
				onSwipeLeft={state => this.onSwipeLeft(state)}
				onSwipeRight={state => this.onSwipeRight(state)}
				config={config}
				style={{
					flex: 1
				}}
			>
				<View style={styles.Wrapper}>
					<Animatable.View
						delay={500}
						ref="container"
						animation="fadeIn"
						duration={1000}
						style={styles.HeaderContainer}
					>
						<Text style={styles.Header}>{this.props.title}</Text>
					</Animatable.View>
					<View style={styles.BodyContainer}>
						<Animatable.View
							style={styles.ScoreContainer}
							delay={1000}
							ref="progress"
							animation="fadeIn"
							duration={300}
						>
							<Progress.Circle
								color={PRIMARY}
								size={152}
								indeterminate={this.state.indeterminate}
								progress={this.state.progress}
								showsText
								thickness={8}
								formatText={() => {
									let progress = Math.floor(
										this.state.progress.toFixed(2) * 100
									);

									return progress;
								}}
							/>
							{/* <Image source={sampleCircle} style={styles.button1} /> */}
						</Animatable.View>
						<View style={styles.CommentContainer}>
							{this.state.comments.map((comment, index) => {
								return (
									<Animatable.Text
										key={index}
										style={styles.Comment}
										animation="fadeInUp"
										delay={500}
										duration={500}
										ref={`comment${index}`}
									>
										{comment}
									</Animatable.Text>
								);
							})}
						</View>
					</View>
					<Animatable.View
						style={styles.FooterContainer}
						animation="fadeInUp"
						delay={1000}
						duration={800}
					>
						<View style={styles.DataContainer}>
							<Image source={time} />
							<Text style={styles.SubText}>{this.state.time} Min</Text>
						</View>
						<View style={styles.DataContainer}>
							<Image
								source={this.props.image ? this.props.image : smallPushups}
							/>
							<Text style={styles.SubText}>{this.state.rep_count} Reps</Text>
						</View>
						<View style={styles.DataContainer}>
							<Image source={chart} />
							<Text style={styles.SubText}>{this.state.avgScore}</Text>
						</View>
					</Animatable.View>
				</View>
			</GestureRecognizer>
		);
	}
}

const styles = StyleSheet.create({
	Wrapper: {
		flex: 1,
		backgroundColor: BLACK,
		paddingTop: OS == 'android' ? 15 : 0,
		alignItems: 'center'
	},
	HeaderContainer: {
		flex: 1.1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	BodyContainer: {
		flex: 3,
		marginLeft: 10,
		marginRight: 10,
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '100%'
	},
	FooterContainer: {
		flex: 1.3,
		paddingLeft: 15,
		paddingRight: 15,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%'
	},
	ScoreContainer: {
		flex: 2,
		justifyContent: 'center',
		alignItems: 'center'
	},
	CommentContainer: {
		flex: 2.5,
		justifyContent: 'space-around',
		alignItems: 'center',
		marginTop: 25,
		marginBottom: 25
	},
	Header: {
		fontSize: MEDIUM,
		color: PRIMARY,
		fontWeight: '900'
	},
	Comment: {
		color: PRIMARY,
		fontSize: 20,
		fontWeight: 'bold'
	},
	DataContainer: {
		width: 110,
		height: 140,
		justifyContent: 'center',
		alignItems: 'center'
	},
	SubText: {
		color: PRIMARY,
		fontSize: 18,
		fontWeight: '900',
		marginTop: 15
	}
});

const mapStateToProps = ({ session }) => {
	let { choice } = session;
	let image = choice === 'pushup' ? smallPushups : smallSquat;
	let title = choice === 'pushup' ? 'Push-Up' : 'Squat';
	return { image, title };
};

export default connect(mapStateToProps)(WorkoutScreen);
