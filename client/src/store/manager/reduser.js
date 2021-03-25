/* @Constants */
import { SET_MANAGER_INFO, LOGIN_MANAGER } from './constants';

const initialState = {
  isManagerInfoLoaded: true,
  isAuth: false,
  id: null,
  login: '',
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

    default:
      return state;
  }
};
