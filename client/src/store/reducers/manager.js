import { SET_INFO } from '../actions/manager';
import { LOGIN_MANAGER } from '../actions/auth';

const initialState = {
  isManagerInfoLoaded: true,
  isAuth: false,
  id: null,
  login: '',
};

export default (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case SET_INFO:
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
