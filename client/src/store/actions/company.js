import { company } from '../../api';

export const CREATE_COMPANY = 'CREATE_COMPANY';
export const GET_COMPANIES = 'GET_COMPANIES';

export const createCompanyAction = (date) => async (dispatch) => {
  await company.createCompany(date);

  dispatch({ type: CREATE_COMPANY, payload: { companyName: date.companyName, id: 1 } });
};

export const getCompaniesActions = () => async (dispatch) => {
  const companies = await company.getCompanies();

  dispatch({ type: GET_COMPANIES, payload: companies });
};
