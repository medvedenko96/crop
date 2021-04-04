/* @Api */
import { region } from 'api';

/* @Utils */
import { normalizedData } from 'utils/normalized';

/* @Constants */
import {
	SET_REGIONS,
	CREATE_REGION,
	DELETE_REGION,
	UPDATE_REGION,
	SET_CURRENT_REGION_ID,
} from './constants';

export const createRegionAction = (regionInfo) => async (dispatch) => {
	const { message, isSuccess, newRegion } = await region.createRegion(regionInfo);

	if (isSuccess) {
		dispatch({ type: CREATE_REGION, payload: { newRegion, companyId: regionInfo.companyId } });
	}

	return { message, isSuccess };
};

export const getRegionsAction = (companyId) => async (dispatch) => {
	const { regions, isSuccess } = await region.getRegions(companyId);

	if (isSuccess) {
		dispatch({ type: SET_REGIONS, payload: normalizedData(regions, companyId) });
	}
};

export const deleteRegionAction = (regionId, currentCompanyId) => async (dispatch) => {
	const { isSuccess, message } = await region.deleteRegion(regionId);

	if (isSuccess) {
		dispatch({ type: DELETE_REGION, payload: { regionId, currentCompanyId } });
	}

	return { isSuccess, message };
};

export const updateRegionAction = (regionInfo) => async (dispatch) => {
	const { message, isSuccess } = await region.updateRegion(regionInfo);

	if (isSuccess) {
		dispatch({ type: UPDATE_REGION, payload: regionInfo });
	}

	return { message, isSuccess };
};

export const setCurrentRegionIdAction = (currentRegionId) => async (dispatch) => {
	return dispatch({ type: SET_CURRENT_REGION_ID, payload: currentRegionId });
};
