/* @Api */
import { field } from '../../api';

/* @Utils */
import { normalizedData } from '../../utils/normalized';

/* @Constants */
import {
	SET_CURRENT_FIELD_ID,
	SET_FIELDS,
	CREATE_FIELD,
	DELETE_FIELD,
	UPDATE_FIELD,
} from './constants';

export const createFieldAction = (fieldInfo) => async (dispatch) => {
	const { message, isSuccess, newField } = await field.createField(fieldInfo);

	if (isSuccess) {
		dispatch({
			type: CREATE_FIELD,
			payload: { newField, regionId: fieldInfo.regionId },
		});
	}

	return { message, isSuccess };
};

export const getFieldsAction = (currentRegionId) => async (dispatch) => {
	const { isSuccess, fields } = await field.getFields({
		regionId: currentRegionId,
	});

	if (isSuccess) {
		dispatch({
			type: SET_FIELDS,
			payload: normalizedData(fields, currentRegionId),
		});
	}
};

export const deleteFieldAction = (fieldId, currentRegionId) => async (dispatch) => {
	const { isSuccess, message } = await field.deleteField({ fieldId });

	if (isSuccess) {
		dispatch({ type: DELETE_FIELD, payload: { fieldId, currentRegionId } });
	}

	return { isSuccess, message };
};

export const updateFieldAction = ({ fieldId, fieldName, regionId }) => async (dispatch) => {
	const { message, isSuccess } = await field.updateField({
		fieldId,
		fieldName,
		regionId,
	});

	if (isSuccess) {
		dispatch({ type: UPDATE_FIELD, payload: { fieldId, fieldName } });
	}

	return { message, isSuccess };
};

export const setCurrentFieldIdAction = (currentRegionId) => async (dispatch) => {
	return dispatch({ type: SET_CURRENT_FIELD_ID, payload: currentRegionId });
};
