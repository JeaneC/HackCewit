import React from 'react';
import {
	TouchableOpacity,
	Text,
	Image,
	StyleSheet,
	View,
	Platform
} from 'react-native';

const OS = Platform.OS;

import { FADE, WHITE } from '../common/constants';

const BUTTON_LENGTH = OS == 'android' ? 130 : 150;
const BUTTON_BORDER_RADIUS = 15;
const BUTTON_COLOR = WHITE;

const UserButton = ({ onPress = null, text = 'A', selected }) => {
	let trueFade = selected ? FADE + 0.5 : FADE;
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<View style={[styles.fade, { opacity: trueFade }]} />
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
		justifyContent: 'center',
		borderRadius: BUTTON_BORDER_RADIUS
	},
	image: {
		flex: 0.8,
		resizeMode: 'contain'
	},
	text: {
		marginTop: 10,
		color: 'white',
		fontWeight: '900',
		fontSize: 36
	}
});

export default UserButton;
