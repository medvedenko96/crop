/* @Constants */
import {
    DELETE_COMPANY,
    SET_COMPANIES,
    ADD_COMPANY,
    SET_CURRENT_COMPANY_ID,
    UPDATE_COMPANY
} from './constants';

const addCompany = (company, state) => {
    const { byId, allIds, currentCompanyId } = state;

    return {
        byId: { ...byId, [company.id]: company },
        allIds: [...allIds, company.id],
        currentCompanyId
    };
};

const deleteCompany = (companyId, state) => {
    const { byId, allIds, currentCompanyId } = state;

    delete byId[companyId];

    return {
        byId,
        allIds: allIds.filter((id) => id !== companyId),
        currentCompanyId
    };
};

const updateCompany = (updateCompany, { currentCompanyId, byId, allIds }) => ({
    currentCompanyId,
    byId: { ...byId, [updateCompany.id]: updateCompany },
    allIds
});

const initialState = {
    byId: {},
    allIds: [],
    currentCompanyId: null
};

export default (state = initialState, action = {}) => {
    const { payload, type } = action;

    switch (type) {
        case SET_COMPANIES:
            return { ...state, ...payload };

        case DELETE_COMPANY:
            return deleteCompany(payload, state);

        case ADD_COMPANY:
            return addCompany(payload, state);

        case UPDATE_COMPANY:
            return updateCompany(payload, state);

        case SET_CURRENT_COMPANY_ID:
            return { ...state, currentCompanyId: payload };

        default:
            return state;
    }
};
