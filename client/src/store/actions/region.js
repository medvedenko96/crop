import { region } from '../../api';
import { normalizedRegionData } from '../../utils/normalized';

const REGION = 'REGION';
const REGIONS = 'REGIONS';
export const CREATE_REGION = `CREATE_${REGION}`;
export const SET_REGIONS = `SET_${REGIONS}`;
export const DELETE_REGION = `DELETE_${REGION}`;
export const UPDATE_REGION = `UPDATE_${REGION}`;
export const SET_CURRENT_REGION_ID = `SET_CURRENT_${REGION}_ID`;

export const createRegionAction = (regionInfo) => async (dispatch) => {
  const { message, isSuccess, newRegion } = await region.createRegion(regionInfo);

  if (isSuccess) {
    dispatch({ type: CREATE_REGION, payload: { newRegion, companyId: regionInfo.companyId } });
  }

  return { message, isSuccess };
};

export const getRegionsByCompanyIdAction = (companyId) => async (dispatch) => {
  const { regions, isSuccess } = await region.getRegionsByCompanyId(companyId);

  if (isSuccess) {
    dispatch({ type: SET_REGIONS, payload: normalizedRegionData(regions, companyId) });
  }
};

export const deleteRegionByIdAction = (regionId, currentCompanyId) => async (dispatch) => {
  const { isSuccess } = await region.deleteRegionById(regionId);

  if (isSuccess) {
    dispatch({ type: DELETE_REGION, payload: { regionId, currentCompanyId } });
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

export const setCurrentRegionIdAction = (currentRegionId) => async (dispatch) => {
  return dispatch({ type: SET_CURRENT_REGION_ID, payload: currentRegionId });
};
