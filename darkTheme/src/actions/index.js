import { CHOOSE_EXERCISE } from './types';

export const chooseExercise = exercise => {
	return {
		type: CHOOSE_EXERCISE,
		payload: exercise
	};
};
