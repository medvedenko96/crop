import { field } from '../../api';
import { normalizedData } from '../../utils/normalized';

const FIELD = 'FIELD';
const FIELDS = 'FIELDS';
export const SET_FIELDS = `SET_${FIELDS}`;
export const CREATE_FIELD = `CREATE_${FIELD}`;
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

export const setCurrentFieldIdAction = (currentRegionId) => async (dispatch) => {
  return dispatch({ type: SET_CURRENT_FIELD_ID, payload: currentRegionId });
};
