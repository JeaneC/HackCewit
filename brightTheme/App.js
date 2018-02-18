import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import store from './src/store/configureStore';
import HomeScreen from './src/screens/HomeScreen';
import WorkoutScreen from './src/screens/WorkoutScreen';

const MainNavigator = StackNavigator(
	{
		home: {
			screen: HomeScreen,
			navigationOptions: { header: null }
		},
		workout: {
			screen: WorkoutScreen,
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
