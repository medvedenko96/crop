import { field } from '../../api';
import { normalizedData } from '../../utils/normalized';

const FIELD = 'FIELD';
const FIELDS = 'FIELDS';
export const SET_FIELDS = `SET_${FIELDS}`;
export const CREATE_FIELD = `CREATE_${FIELD}`;
export const DELETE_FIELD = `DELETE_${FIELD}`;
export const UPDATE_FIELD = `UPDATE_${FIELD}`;
export const SET_CURRENT_FIELD_ID = `SET_CURRENT_${FIELD}_ID`;

export const createFieldAction = (fieldInfo) => async (dispatch) => {
  const { message, isSuccess, newField } = await field.createField(fieldInfo);

  if (isSuccess) {
    dispatch({ type: CREATE_FIELD, payload: { newField, regionId: fieldInfo.regionId } });
  }

  return { message, isSuccess };
};

export const getFieldsAction = (currentRegionId) => async (dispatch) => {
  const { isSuccess, fields } = await field.getFields({ regionId: currentRegionId });

  if (isSuccess) {
    dispatch({ type: SET_FIELDS, payload: normalizedData(fields, currentRegionId) });
  }
};

export const deleteFieldAction = (fieldId, currentRegionId) => async (dispatch) => {
  const { isSuccess } = await field.deleteField({ fieldId });

  if (isSuccess) {
    dispatch({ type: DELETE_FIELD, payload: { fieldId, currentRegionId } });
  }

  return isSuccess;
};

export const updateFieldAction = ({ fieldId, fieldName, regionId }) => async (dispatch) => {
  const { message, isSuccess } = await field.updateField({ fieldId, fieldName, regionId });

  if (isSuccess) {
    dispatch({ type: UPDATE_FIELD, payload: { fieldId, fieldName } });
  }

  return { message, isSuccess };
};

export const setCurrentFieldIdAction = (currentRegionId) => async (dispatch) => {
  return dispatch({ type: SET_CURRENT_FIELD_ID, payload: currentRegionId });
};
