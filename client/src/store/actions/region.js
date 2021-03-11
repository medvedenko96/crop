import { region } from '../../api';

const REGION = 'REGION';
const CREATE = `${REGION}_CREATE`;

export const createRegionAction = (regionInfo) => async (dispatch) => {
  const data = await region.createRegion(regionInfo);

  // save new region in store
  dispatch({ type: CREATE });

  return data;
};
