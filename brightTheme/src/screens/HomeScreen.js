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
import * as Animatable from 'react-native-animatable';

import exercise from '../assets/exercise.png';
import pullup from '../assets/pullup.png';
import pushups from '../assets/pushups.png';
import squat from '../assets/squat.png';
import axios from 'axios';

import {
	PRIMARY,
	BLACK,
	LARGE,
	BUTTON_BORDER_RADIUS,
	BORDER_WIDTH
} from '../common/constants';

const OS = 'MEEP';

class HomeScreen extends Component {
	createSession = str => {
		console.log(str);

		// let result = axios.get(`http://172.30.2.33:8080/sessionCreate?type=${str}`)
		this.props.chooseExercise(str);
		console.log(this.props.navigation.navigate('workout'));
	};
	render() {
		return (
			<View style={styles.Wrapper}>
				<Animatable.View
					style={styles.HeaderContainer}
					delay={500}
					ref="container"
					animation="fadeIn"
					duration={1000}
				>
					<Text style={styles.Header}>Spotify</Text>
				</Animatable.View>
				<Animatable.View
					style={styles.BodyContainer}
					delay={1000}
					ref="container"
					animation="zoomIn"
					duration={1000}
				>
					<TouchableOpacity
						style={styles.ButtonContainer}
						onPress={() => this.createSession('pushup')}
					>
						<Image source={pushups} style={styles.button1} />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.ButtonContainer}
						onPress={() => this.createSession('squat')}
					>
						<Image source={squat} style={styles.button1} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.ButtonContainer2}>
						<Image source={pullup} style={styles.button1} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.ButtonContainer2}>
						<Image source={exercise} style={styles.button1} />
					</TouchableOpacity>
				</Animatable.View>
			</View>
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
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center'
	},
	BodyContainer: {
		flex: 3,
		marginLeft: 10,
		marginRight: 10,
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%'
	},
	Header: {
		fontSize: LARGE,
		color: PRIMARY,
		fontWeight: 'bold'
	},
	ButtonContainer: {
		width: 160,
		height: 175,
		borderWidth: BORDER_WIDTH,
		borderColor: PRIMARY,
		borderRadius: BUTTON_BORDER_RADIUS,
		justifyContent: 'center',
		alignItems: 'center'
	},
	ButtonContainer2: {
		width: 160,
		height: 175,
		marginTop: 35,
		borderWidth: BORDER_WIDTH,
		borderColor: PRIMARY,
		borderRadius: BUTTON_BORDER_RADIUS,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

const mapDispatchToProps = dispatch => ({
	chooseExercise: exercise => {
		dispatch(chooseExercise(exercise));
	}
});

export default connect(null, mapDispatchToProps)(HomeScreen);
