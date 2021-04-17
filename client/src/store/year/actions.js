/* @api */
import { year } from 'api';

/* @Constants */
import {
	CREATE_YEAR,
	SET_YEARS,
	SET_CURRENT_YEAR_ID,
	DELETE_YEAR,
	UPDATE_ZONAL_MANAGEMENT,
	SET_ZONAL_MANAGEMENT,
} from './constants';

import { getYearsSelector } from './selectors';

/* @Utils */
import { normalizedData } from 'utils/normalized';

export const createYearAction = (yearInfo) => async (dispatch) => {
	const { message, isSuccess, newYear } = await year.createYear(yearInfo);

	if (isSuccess) {
		dispatch({ type: SET_CURRENT_YEAR_ID, payload: newYear.id });
		dispatch({ type: CREATE_YEAR, payload: { newYear, fieldId: yearInfo.fieldId } });
	}

	return { message, isSuccess };
};

export const getYearsAction = (fieldId) => async (dispatch) => {
	const { years, isSuccess } = await year.getYears(fieldId);

	if (isSuccess) {
		dispatch({ type: SET_YEARS, payload: normalizedData(years, fieldId) });
	}
};

export const setCurrentYearIdAction = (currentYearId) => async (dispatch) => {
	return dispatch({ type: SET_CURRENT_YEAR_ID, payload: currentYearId });
};

export const deleteYearAction = (yearId, currentFieldId) => async (dispatch) => {
	const { isSuccess, message } = await year.deleteYear(yearId);

	if (isSuccess) {
		dispatch({ type: DELETE_YEAR, payload: { yearId, currentFieldId } });
	}

	return { isSuccess, message };
};

export const updateZonalManagementAction = (zonalManagementType, zonalManagementFields) => async (
	dispatch,
	getState
) => {
	const state = getState();
	const { currentYearId } = getYearsSelector(state);

	const { isSuccess, message } = await year.setZonalManagement({
		yearId: currentYearId,
		zonalManagementFields,
		zonalManagementType,
	});

	if (isSuccess) {
		dispatch({
			type: UPDATE_ZONAL_MANAGEMENT,
			payload: { yearId: currentYearId, zonalManagementType, zonalManagementFields },
		});
	}

	return { isSuccess, message };
};

export const setZonalManagementAction = (yearId) => async (dispatch) => {
	const { isSuccess, data } = await year.getZonalManagement(yearId);

	if (isSuccess) {
		dispatch({ type: SET_ZONAL_MANAGEMENT, payload: { data, yearId } });
	}

	return { isSuccess };
};
