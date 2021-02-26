import { company } from '../../api';

export const CREATE_COMPANY = 'CREATE_COMPANY';
export const GET_COMPANIES = 'GET_COMPANIES';
export const UPDATE_COMPANIES = 'UPDATE_COMPANIES';

export const createCompanyAction = (date) => async (dispatch) => {
  await company.createCompany(date);

  dispatch({ type: CREATE_COMPANY, payload: { companyName: date.companyName, login: date.login, id: 1 } });
};

export const deleteCompanyAction = (date) => async (dispatch, getState) => {
  const {
    companies: { listCompanies },
  } = getState();
  const result = await company.deleteCompany(date);

  if (result.isSuccess) {
    dispatch({ type: UPDATE_COMPANIES, payload: listCompanies.filter(({ login }) => login !== result.login) });
  }
  return result;
};

export const getCompaniesActions = () => async (dispatch) => {
  const companies = await company.getCompanies();

  dispatch({ type: GET_COMPANIES, payload: companies });
};
