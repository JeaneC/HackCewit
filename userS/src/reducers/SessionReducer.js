const apiKey = 'ytEtvRpH9_92it2PoN35';
import { CHOOSE_EXERCISE } from '../actions/types';

const SessionDefaultState = {
	choice: null
};

export default (state = SessionDefaultState, action) => {
	switch (action.type) {
		case CHOOSE_EXERCISE:
			return {
				...state,
				choice: action.payload
			};
		default:
			return state;
	}
};
