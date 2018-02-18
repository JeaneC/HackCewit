import React from 'react';

import {
	TouchableOpacity,
	Text,
	StyleSheet,
	View,
	Platform,
	Dimensions,
	Image
} from 'react-native';

const OS = Platform.OS;
import { Forward, Rewind, Louder, Lower, ThumbUp, ThumbDown } from '../assets';
import { FADE, WHITE, LARGE, MEDIUM, BLUEPURPLE } from '../common/constants';

const BUTTON_LENGTH = OS == 'android' ? 100 : 155;
const BUTTON_BORDER_RADIUS = 15;
const BUTTON_COLOR = WHITE;
const dimensions = Dimensions.get('window');
const SCREEN_WIDTH = dimensions.width;
const SCREEN_HEIGHT = dimensions.height;
const GRADIENT_COLOR = BLUEPURPLE;
const BAR_HEIGHT = 45;

const example = [];

const convert = Icon => {
	switch (Icon) {
		case 'Forward':
			return Forward;
		case 'Rewind':
			return Rewind;
		case 'Louder':
			return Louder;
		case 'Lower':
			return Lower;
		case 'ThumbUp':
			return ThumbUp;
		case 'ThumbDown':
			return ThumbDown;
	}
};

const Feedback = ({ iconList = [] }) => {
	console.log('prop', iconList);
	return (
		<View style={styles.border}>
			{iconList.slice(-4).map((icon, index) => {
				const source = convert(icon);

				return <Image key={index} source={source} style={styles.image} />;
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	border: {
		borderRadius: BUTTON_BORDER_RADIUS,
		borderColor: 'white',
		borderWidth: 5,
		height: 100,
		width: SCREEN_WIDTH - 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingLeft: 5,
		paddingRight: 5
	},
	image: {
		resizeMode: 'contain',
		height: 70,
		width: 60,
		margin: 4
	}
});

export default Feedback;
