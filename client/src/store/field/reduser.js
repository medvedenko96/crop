import merge from 'lodash/merge';

/* @Constants */
import { SET_CURRENT_FIELD_ID, SET_FIELDS, CREATE_FIELD, DELETE_FIELD, UPDATE_FIELD } from './constants';

const setFields = ({ currentFieldId, byId, allIds }, payload) => ({
  currentFieldId,
  byId: merge({}, byId, payload.byId),
  allIds: merge({}, allIds, payload.allIds),
});

const createField = ({ currentFieldId, byId, allIds }, { newField, regionId }) => ({
  currentFieldId,
  byId: { ...byId, [newField.id]: newField },
  allIds: { ...allIds, [regionId]: [...allIds[regionId], newField.id] },
});

const deleteRegion = ({ currentFieldId, byId, allIds }, { fieldId, currentRegionId }) => ({
  currentFieldId,
  byId,
  allIds: { ...allIds, [currentRegionId]: allIds[currentRegionId].filter((id) => id !== fieldId) },
});

const updateRegion = ({ currentFieldId, byId, allIds }, { fieldId, fieldName }) => ({
  currentFieldId,
  byId: { ...byId, [fieldId]: { ...byId[fieldId], name: fieldName } },
  allIds,
});

const initialState = {
  byId: {},
  allIds: {},
  currentFieldId: null,
};

export default (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case SET_FIELDS:
      return setFields(state, payload);

    case CREATE_FIELD:
      return createField(state, payload);

    case DELETE_FIELD:
      return deleteRegion(state, payload);

    case UPDATE_FIELD:
      return updateRegion(state, payload);

    case SET_CURRENT_FIELD_ID:
      return { ...state, currentFieldId: payload };

    default:
      return state;
  }
};
