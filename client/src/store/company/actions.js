/* @Api */
import { company } from '../../api';

/* @Constants */
import { DELETE_COMPANY, SET_COMPANIES, ADD_COMPANY, SET_CURRENT_COMPANY_ID } from './constants';

/* @Utils */
import { normalizedData } from '../../utils/normalized';

export const createCompanyAction = (newCompany) => async (dispatch) => {
  const data = await company.createCompany(newCompany);

  if (data.isSuccess) {
    dispatch({ type: ADD_COMPANY, payload: data.company });
  }

  return data;
};

export const deleteCompanyAction = (login) => async (dispatch) => {
  const data = await company.deleteCompany(login);

  if (data.isSuccess) {
    dispatch({ type: DELETE_COMPANY, payload: data.id });
  }

  return data;
};

export const getCompaniesAction = () => async (dispatch) => {
  const companies = await company.getCompanies();

  dispatch({ type: SET_COMPANIES, payload: normalizedData(companies) });
};

export const setCurrentCompanyIdAction = (id) => async (dispatch) => {
  dispatch({ type: SET_CURRENT_COMPANY_ID, payload: +id });
};
