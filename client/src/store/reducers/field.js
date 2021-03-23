import merge from 'lodash/merge';
import { SET_CURRENT_FIELD_ID, SET_FIELDS, CREATE_FIELD } from '../actions/field';

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

    case SET_CURRENT_FIELD_ID:
      return { ...state, currentFieldId: payload };

    default:
      return state;
  }
};
