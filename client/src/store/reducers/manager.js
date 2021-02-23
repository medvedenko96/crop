import { SET_USER_INFO } from '../actions/manager';

const initialState = {
  id: '',
  login: '',
  isAdmin: false,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
