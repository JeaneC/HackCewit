import React from 'react';
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	View,
	Platform
} from 'react-native';

const OS = Platform.OS;

import { FADE, WHITE, LARGE, MEDIUM } from '../common/constants';

const BUTTON_LENGTH = OS == 'android' ? 100 : 155;
const BUTTON_BORDER_RADIUS = 15;
const BUTTON_COLOR = WHITE;

const UserButton = ({ onPress = null, text = 'Prev' }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<View style={styles.fade} />
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	fade: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		borderRadius: BUTTON_BORDER_RADIUS,

		backgroundColor: BUTTON_COLOR,
		opacity: FADE
	},
	button: {
		width: BUTTON_LENGTH,
		height: BUTTON_LENGTH,
		alignItems: 'center',
		justifyContent: 'center'
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
