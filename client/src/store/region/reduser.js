import merge from 'lodash/merge';

/* @Constants */
import { SET_REGIONS, CREATE_REGION, DELETE_REGION, UPDATE_REGION, SET_CURRENT_REGION_ID } from './constants';

const setRegions = ({ currentRegionId, byId, allIds }, payload) => ({
  currentRegionId,
  byId: merge({}, byId, payload.byId),
  allIds: merge({}, allIds, payload.allIds),
});

const deleteRegion = ({ currentRegionId, byId, allIds }, { regionId, currentCompanyId }) => ({
  currentRegionId,
  byId,
  allIds: { ...allIds, [currentCompanyId]: allIds[currentCompanyId].filter((id) => id !== regionId) },
});

const createRegion = ({ currentRegionId, byId, allIds }, { newRegion, companyId }) => ({
  currentRegionId,
  byId: { ...byId, [newRegion.id]: newRegion },
  allIds: { ...allIds, [companyId]: [...allIds[companyId], newRegion.id] },
});

const updateRegion = ({ currentRegionId, byId, allIds }, { regionId, regionName }) => ({
  currentRegionId,
  byId: { ...byId, [regionId]: { ...byId[regionId], name: regionName } },
  allIds,
});

const initialState = {
  byId: {},
  allIds: {},
  currentRegionId: null,
};

export default (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case SET_REGIONS:
      return setRegions(state, payload);

    case CREATE_REGION:
      return createRegion(state, payload);

    case DELETE_REGION:
      return deleteRegion(state, payload);

    case UPDATE_REGION:
      return updateRegion(state, payload);

    case SET_CURRENT_REGION_ID:
      return { ...state, currentRegionId: payload };

    default:
      return state;
  }
};
