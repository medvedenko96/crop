import { region } from '../../api';

const REGION = 'REGION';
const REGIONS = 'REGIONS';
export const CREATE_REGION = `CREATE_${REGION}`;
export const SET_REGIONS = `SET_${REGIONS}`;

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
