import { SET_INFO, SET_IS_LOADED } from '../actions/manager';

const initialState = {
  isManagerInfoLoaded: true,
  id: null,
  login: '',
};

export default (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case SET_INFO:
    case SET_IS_LOADED:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
};
