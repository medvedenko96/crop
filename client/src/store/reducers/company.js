import { UPDATE_COMPANIES, GET_COMPANIES, CREATE_COMPANY, SET_CURRENT_COMPANY_ID } from '../actions/company';

const initialState = {
  list: [],
  currentCompanyId: null,
};

export default (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case GET_COMPANIES:
    case UPDATE_COMPANIES:
      return { ...state, list: payload };

    case CREATE_COMPANY:
      return { ...state, list: [...state.list, payload] };

    case SET_CURRENT_COMPANY_ID:
      return { ...state, currentCompanyId: payload };

    default:
      return state;
  }
};
