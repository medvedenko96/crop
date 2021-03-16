import { region } from '../../api';

const REGION = 'REGION';
const REGIONS = 'REGIONS';
export const CREATE_REGION = `CREATE_${REGION}`;
export const SET_REGIONS = `SET_${REGIONS}`;
export const DELETE_REGIONS = `DELETE_${REGIONS}`;
export const UPDATE_REGION = `UPDATE_${REGION}`;

export const createRegionAction = (regionInfo) => async (dispatch) => {
  const { message, isSuccess, newRegion } = await region.createRegion(regionInfo);

  if (isSuccess) {
    dispatch({ type: CREATE_REGION, payload: newRegion });
  }

  return { message, isSuccess };
};

export const getRegionsByCompanyIdAction = (companyId) => async (dispatch) => {
  const { regions, isSuccess } = await region.getRegionsByCompanyId(companyId);

  if (isSuccess) {
    dispatch({ type: SET_REGIONS, payload: regions });
  }
};

export const deleteRegionByIdAction = (regionId) => async (dispatch) => {
  const { isSuccess } = await region.deleteRegionById(regionId);

  if (isSuccess) {
    dispatch({ type: DELETE_REGIONS, payload: regionId });
  }

  return isSuccess;
};

export const updateRegionByIdAction = (regionInfo) => async (dispatch) => {
  const { message, isSuccess } = await region.updateRegionById(regionInfo);

  if (isSuccess) {
    dispatch({ type: UPDATE_REGION, payload: regionInfo });
  }

  return { message, isSuccess };
};
