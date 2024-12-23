/* @Api */
import { company } from 'api';

/* @Constants */
import {
	DELETE_COMPANY,
	SET_COMPANIES,
	ADD_COMPANY,
	SET_CURRENT_COMPANY_ID,
	UPDATE_COMPANY,
	UPDATE_COMPANY_PASSWORD,
	SET_COMPANY,
} from './constants';

/* @Utils */
import { normalizedData } from 'utils/normalized';

export const createCompanyAction = (companyInfo) => async (dispatch) => {
	const { company: newCompany, isSuccess, message } = await company.createCompany(companyInfo);

	if (isSuccess) {
		dispatch({ type: ADD_COMPANY, payload: newCompany });
	}

	return { isSuccess, message };
};

export const updateCompanyAction = (companyInfo) => async (dispatch) => {
	const { company: updatedCompany, isSuccess, message } = await company.updateCompany(
		companyInfo
	);

	if (isSuccess) {
		dispatch({ type: UPDATE_COMPANY, payload: updatedCompany });
	}

	return { isSuccess, message };
};

export const deleteCompanyAction = (id) => async (dispatch) => {
	const data = await company.deleteCompany({ id });

	if (data.isSuccess) {
		dispatch({ type: DELETE_COMPANY, payload: id });
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

export const updateCompanyPasswordAction = (companyInfo) => async (dispatch) => {
	const { isSuccess, message } = await company.updateCompanyPassword(companyInfo);

	if (isSuccess) {
		dispatch({ type: UPDATE_COMPANY_PASSWORD });
	}

	return { isSuccess, message };
};

export const getCompanyAction = (companyId) => async (dispatch) => {
	const { data, isSuccess } = await company.getCompany(companyId);

	if (isSuccess) {
		dispatch({ type: SET_COMPANY, payload: { companyId, data } });
	}
};
