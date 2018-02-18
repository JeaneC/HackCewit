import { combineReducers } from 'redux';
import SessionReducer from './SessionReducer';

export default combineReducers({
	session: SessionReducer
});
