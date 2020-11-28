import { SET_USER_INFO } from '../actions/user';

const initialState = {
  id: '',
  username: '',
  companyName: '',
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
