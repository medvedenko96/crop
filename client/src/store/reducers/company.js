import { UPDATE_COMPANIES, GET_COMPANIES, CREATE_COMPANY } from '../actions/company';

const initialState = [];

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case GET_COMPANIES:
    case UPDATE_COMPANIES:
      return action.payload;

    case CREATE_COMPANY:
      return [...state, action.payload];

    default:
      return state;
  }
};
