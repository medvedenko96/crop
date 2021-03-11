import { company } from '../../api';

export const CREATE_COMPANY = 'CREATE_COMPANY';
export const SET_CURRENT_COMPANY_ID = 'SET_CURRENT_COMPANY_ID';
export const GET_COMPANIES = 'GET_COMPANIES';
export const UPDATE_COMPANIES = 'UPDATE_COMPANIES';

export const createCompanyAction = (newCompany) => async (dispatch) => {
  const data = await company.createCompany(newCompany);

  if (data.isSuccess) {
    dispatch({
      type: CREATE_COMPANY,
      payload: data.company,
    });
  }

  return data;
};

export const deleteCompanyAction = (login) => async (dispatch, getState) => {
  const {
    companies: { list = [] },
  } = getState();
  const data = await company.deleteCompany(login);

  if (data.isSuccess) {
    dispatch({ type: UPDATE_COMPANIES, payload: list.filter(({ login }) => login !== data.login) });
  }

  return data;
};

export const getCompaniesAction = () => async (dispatch) => {
  const companies = await company.getCompanies();

  dispatch({ type: GET_COMPANIES, payload: companies });
};

export const setCurrentCompanyIdAction = (id) => async (dispatch) => {
  dispatch({ type: SET_CURRENT_COMPANY_ID, payload: id });
};
