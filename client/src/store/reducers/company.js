import { GET_COMPANIES } from '../actions/company';

const initialState = {
  companies: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case GET_COMPANIES:
    return {
      ...state,
      companies: action.payload,
    };

  default:
    return state;
  }
};
