import merge from 'lodash/merge';

/* @Constants */
import { CREATE_YEAR, SET_YEARS, SET_CURRENT_YEAR_ID, DELETE_YEAR } from './constants';

const setYears = ({ currentYearId, byId, allIds }, payload) => ({
	currentYearId,
	byId: merge({}, byId, payload.byId),
	allIds: merge({}, allIds, payload.allIds),
});

const deleteYear = ({ currentYearId, byId, allIds }, { yearId, currentFieldId }) => ({
	currentYearId,
	byId,
	allIds: {
		...allIds,
		[currentFieldId]: allIds[currentFieldId].filter((id) => id !== yearId),
	},
});

const createYear = ({ currentYearId, byId, allIds }, { newYear, fieldId }) => ({
	currentYearId,
	byId: { ...byId, [newYear.id]: newYear },
	allIds: { ...allIds, [fieldId]: [...allIds[fieldId], newYear.id] },
});

const initialState = {
	byId: {},
	allIds: {},
	currentYearId: null,
};

export default (state = initialState, action = {}) => {
	const { payload, type } = action;

	switch (type) {
		case SET_YEARS:
			return setYears(state, payload);

		case CREATE_YEAR:
			return createYear(state, payload);

		case DELETE_YEAR:
			return deleteYear(state, payload);

		case SET_CURRENT_YEAR_ID:
			return { ...state, currentYearId: payload };

		default:
			return state;
	}
};
