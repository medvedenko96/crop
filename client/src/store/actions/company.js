import { company } from '../../api';

export const CREATE_COMPANY = 'CREATE_COMPANY';
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
  const { companies } = getState();
  const data = await company.deleteCompany(login);

  if (data.isSuccess) {
    dispatch({ type: UPDATE_COMPANIES, payload: companies.filter(({ login }) => login !== data.login) });
  }

  return data;
};

export const getCompaniesActions = () => async (dispatch) => {
  const companies = await company.getCompanies();

  dispatch({ type: GET_COMPANIES, payload: companies });
};
