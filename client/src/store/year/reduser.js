import merge from 'lodash/merge';

/* @Utils */
import { arrayToObject } from 'utils/normalized';

/* @Constants */
import {
	CREATE_YEAR,
	SET_YEARS,
	SET_CURRENT_YEAR_ID,
	DELETE_YEAR,
	UPDATE_ZONAL_MANAGEMENT,
	SET_ZONAL_MANAGEMENT,
} from './constants';

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

const setZonalManagement = ({ byId, allIds }, { data, yearId }) => ({
	currentYearId: yearId,
	allIds,
	byId: { ...byId, [yearId]: { ...byId[yearId], zonalManagement: arrayToObject(data, 'type') } },
});

const updateZonalManagement = (
	{ byId, allIds, currentYearId },
	{ yearId, zonalManagementType, zonalManagementFields }
) => ({
	currentYearId,
	allIds,
	byId: {
		...byId,
		[yearId]: {
			...byId[yearId],
			zonalManagement: {
				...byId[yearId].zonalManagement,
				[zonalManagementType]: {
					type: zonalManagementType,
					...zonalManagementFields,
				},
			},
		},
	},
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

		case UPDATE_ZONAL_MANAGEMENT:
			return updateZonalManagement(state, payload);

		case SET_ZONAL_MANAGEMENT:
			return setZonalManagement(state, payload);

		default:
			return state;
	}
};
