import * as firebase from 'firebase';
import moment from 'moment';

const startMoment = moment();

const config = {
	apiKey: 'AIzaSyAf2GzYCTV-ocPtJ6Pk3Hvk_4sObLjYKic',
	authDomain: 'classroombeta-87cdc.firebaseapp.com',
	databaseURL: 'https://classroombeta-87cdc.firebaseio.com',
	projectId: 'classroombeta-87cdc',
	storageBucket: 'classroombeta-87cdc.appspot.com',
	messagingSenderId: '406672086263'
};

firebase.initializeApp(config);

const database = firebase.database();
// const mainRef = database.ref('Lines');
// const userRef = database.ref('Users');

export const getClassData = async classCode => {
	return await database
		.ref(`Classes/${classCode}`)
		.once('value')
		.then(snapshot => {
			return snapshot.val();
		});
};

export const updateScheduleToFirebase = (route, uid, schedule) => {
	database.ref(`Lines/Route ${route}/${uid}/schedule`).set(schedule);
};

export const updateTravelTimeToFirebase = (route, uid, time) => {
	database.ref(`Lines/Route ${route}/${uid}/nextStop/time`).set(time);
};

// export { firebase, mainRef, userRef, database };
export { firebase, database };
