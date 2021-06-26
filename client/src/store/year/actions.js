/* @api */
import { year, files as apiFiles } from 'api';

/* @Constants */
import {
	CREATE_YEAR,
	SET_YEARS,
	SET_CURRENT_YEAR_ID,
	DELETE_YEAR,
	UPDATE_ZONAL_MANAGEMENT_ROW,
	GET_ZONAL_MANAGEMENT,
	UPDATE_NORM_BOT_ROW,
	SET_NORM_BOT,
	DELETE_NORM_BOT_ROW,
	SET_IMG_YIELD,
	SET_IMG_CONTROL_AREA,
	SET_DESCRIPTION,
	SET_FILES,
	CREATE_FILES,
	DELETE_FILE,
	UPDATE_FILE,
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
			type: UPDATE_ZONAL_MANAGEMENT_ROW,
			payload: { yearId: currentYearId, zonalManagementType, zonalManagementFields },
		});
	}

	return { isSuccess, message };
};

export const getZonalManagementAction = (yearId) => async (dispatch) => {
	const { isSuccess, data } = await year.getZonalManagement(yearId);

	if (isSuccess) {
		dispatch({ type: GET_ZONAL_MANAGEMENT, payload: { data, yearId } });
	}

	return { isSuccess };
};

export const setNormBotAction = (normBotRow) => async (dispatch, getState) => {
	const state = getState();
	const { currentYearId: yearId } = getYearsSelector(state);

	const { isSuccess, message } = await year.setNormBot({
		yearId,
		normBotRow,
	});

	if (isSuccess) {
		dispatch({
			type: UPDATE_NORM_BOT_ROW,
			payload: { yearId, newRow: normBotRow },
		});
	}

	return { isSuccess, message };
};

export const getNormBotAction = (yearId) => async (dispatch) => {
	const { isSuccess, data } = await year.getNormBot(yearId);

	if (isSuccess) {
		dispatch({ type: SET_NORM_BOT, payload: { data, yearId } });
	}

	return { isSuccess };
};

export const deleteNormBotRowAction = (rowKey) => async (dispatch, getState) => {
	const state = getState();
	const { currentYearId: yearId } = getYearsSelector(state);

	const { isSuccess, message } = await year.deleteNormBotRow(yearId, rowKey);

	if (isSuccess) {
		dispatch({ type: DELETE_NORM_BOT_ROW, payload: { yearId, rowKey } });
	}

	return { isSuccess, message };
};

export const setImgYieldAction = (imgUrl) => async (dispatch, getState) => {
	const state = getState();
	const { currentYearId: yearId } = getYearsSelector(state);

	const { isSuccess, message } = await year.setImgYield(yearId, imgUrl);

	if (isSuccess) {
		dispatch({ type: SET_IMG_YIELD, payload: { yearId, imgUrl } });
	}

	return { isSuccess, message };
};

export const setImgControlAreaAction = (imgUrl) => async (dispatch, getState) => {
	const state = getState();
	const { currentYearId: yearId } = getYearsSelector(state);

	const { isSuccess, message } = await year.setImgControlArea(yearId, imgUrl);

	if (isSuccess) {
		dispatch({ type: SET_IMG_CONTROL_AREA, payload: { yearId, imgUrl } });
	}

	return { isSuccess, message };
};

export const setDescriptionAction = (description) => async (dispatch, getState) => {
	const state = getState();
	const { currentYearId: yearId } = getYearsSelector(state);

	const { isSuccess, message } = await year.setDescription(yearId, description);

	if (isSuccess) {
		dispatch({ type: SET_DESCRIPTION, payload: { yearId, description } });
	}

	return { isSuccess, message };
};

export const getFilesAction = () => async (dispatch, getState) => {
	const state = getState();
	const { currentYearId: yearId } = getYearsSelector(state);

	const { isSuccess, message, files } = await apiFiles.getFiles(yearId);

	if (isSuccess) {
		dispatch({ type: SET_FILES, payload: { yearId, files } });
	}

	return { isSuccess, message };
};

export const createFileAction = ({ fileName, fileUrl }) => async (dispatch, getState) => {
	const state = getState();
	const { currentYearId: yearId } = getYearsSelector(state);

	const { isSuccess, message, newFile } = await apiFiles.createFile({
		yearId,
		fileName,
		fileUrl,
	});

	if (isSuccess) {
		dispatch({ type: CREATE_FILES, payload: { yearId, newFile } });
	}

	return { isSuccess, message };
};

export const deleteFileAction = (fileId) => async (dispatch, getState) => {
	const state = getState();
	const { currentYearId: yearId } = getYearsSelector(state);

	const { isSuccess, message } = await apiFiles.deleteFile(fileId);

	if (isSuccess) {
		dispatch({ type: DELETE_FILE, payload: { yearId, fileId } });
	}

	return { isSuccess, message };
};

export const updateFileAction = ({ fileName, fileUrl, id }) => async (dispatch, getState) => {
	const state = getState();
	const { currentYearId: yearId } = getYearsSelector(state);

	const { isSuccess, message } = await apiFiles.updateFile({ fileName, fileUrl, id });

	if (isSuccess) {
		dispatch({ type: UPDATE_FILE, payload: { yearId, fileName, fileUrl, fileId: id } });
	}

	return { isSuccess, message };
};
