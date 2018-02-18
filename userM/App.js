import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import UserScreen from './src/screens/UserScreen';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import ThemeScreen from './src/screens/ThemeScreen';
import QuizScreen from './src/screens/QuizScreen';

import { Provider } from 'react-redux';
import store from './src/store/configureStore';

const MainNavigator = StackNavigator(
	{
		login: {
			screen: LoginScreen,
			navigationOptions: { header: null }
		},
		theme: {
			screen: ThemeScreen,
			navigationOptions: { header: null }
		},
		user: {
			screen: UserScreen,
			navigationOptions: { header: null }
		},
		quiz: {
			screen: QuizScreen,
			navigationOptions: { header: null }
		}
	},
	{
		lazy: true
	}
);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<MainNavigator />
			</Provider>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});
