/* @Constants */
import { SET_MANAGER_INFO, LOGIN_MANAGER, LOGIN_COMPANY } from './constants';

const initialState = {
	isInfoLoaded: true,
	isAuth: false,
	id: null,
	login: '',
	isCompany: false,
	companyName: '',
};

export default (state = initialState, action = {}) => {
	const { payload, type } = action;

	switch (type) {
		case SET_MANAGER_INFO:
			return {
				...state,
				...payload,
			};

		case LOGIN_MANAGER:
			return {
				...state,
				...payload,
			};

		case LOGIN_COMPANY:
			return {
				...state,
				...payload,
			};

		default:
			return state;
	}
};
