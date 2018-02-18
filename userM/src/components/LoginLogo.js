import React from 'react';
import { Text, Image, StyleSheet, View, Platform } from 'react-native';

const OS = Platform.OS;

import { FADE, WHITE } from '../common/constants';

const BUTTON_LENGTH = OS == 'android' ? 100 : 120;
const BUTTON_BORDER_RADIUS = 15;
const BUTTON_COLOR = WHITE;

const UserButton = ({ image = null }) => {
	return (
		<View style={styles.button}>
			<View style={styles.fade} />
			<Image source={image} style={styles.image} />
		</View>
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
		marginTop: 10,
		color: 'white',
		fontWeight: '900'
	}
});

export default UserButton;
