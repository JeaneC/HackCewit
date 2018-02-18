import { LOGIN_APP, CHOOSE_THEME } from './types';

export const signIn = (token, code, name) => {
	return {
		type: LOGIN_APP,
		payload: { token, code, name }
	};
};

export const chooseTheme = num => {
	return {
		type: CHOOSE_THEME,
		payload: num
	};
};
