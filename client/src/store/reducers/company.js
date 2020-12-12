import { GET_COMPANIES, CREATE_COMPANY } from '../actions/company';

const initialState = {
  listCompanies: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
  case GET_COMPANIES:
    return {
      ...state,
      listCompanies: action.payload,
    };

  case CREATE_COMPANY:
    return {
      ...state,
      listCompanies: [
        ...state.listCompanies,
        action.payload
      ],
    };

  default:
    return state;
  }
};
