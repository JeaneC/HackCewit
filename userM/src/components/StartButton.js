import React from 'react';
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	View,
	Platform
} from 'react-native';

const OS = Platform.OS;

import { FADE, WHITE, LARGE, MEDIUM, BLACK } from '../common/constants';

const BUTTON_LENGTH = OS == 'android' ? 40 : 70;
const BUTTON_BORDER_RADIUS = 10;
const BUTTON_COLOR = WHITE;

const UserButton = ({ onPress = null, text = 'Prev', selected }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<View style={styles.counterFade} />
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	counterFade: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		borderRadius: BUTTON_BORDER_RADIUS,
		backgroundColor: BLACK,
		opacity: FADE
	},
	button: {
		width: BUTTON_LENGTH * 3,
		height: BUTTON_LENGTH - 25,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10
	},
	image: {
		flex: 0.8,
		resizeMode: 'contain'
	},
	text: {
		color: 'white',
		fontSize: MEDIUM,
		fontWeight: 'bold'
	}
});

export default UserButton;
