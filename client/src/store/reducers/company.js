import { UPDATE_COMPANIES, GET_COMPANIES, CREATE_COMPANY, SET_CURRENT_COMPANY_ID } from '../actions/company';
import { SET_REGIONS, CREATE_REGION, DELETE_REGIONS, UPDATE_REGION, SET_CURRENT_REGION_ID } from '../actions/region';

const initialState = {
  list: [],
  currentCompanyId: null,
  currentRegionId: null,
};

const setRegions = (regions, state) => {
  const { currentCompanyId, list } = state;

  return {
    currentCompanyId,
    list: list.map((company) => (company.id === currentCompanyId ? { ...company, regions } : company)),
  };
};

const setRegion = (region, state) => {
  const { currentCompanyId, list } = state;

  const companies = list.map((company) => {
    if (company.id === currentCompanyId) {
      const { regions } = company;

      return { ...company, regions: [...regions, region] };
    }

    return company;
  });

  return { currentCompanyId, list: companies };
};

const deleteRegion = (regionId, state) => {
  const { currentCompanyId, list } = state;

  const companies = list.map((company) => {
    const { regions = [], id } = company;

    if (id === currentCompanyId) {
      return { ...company, regions: regions.filter((region) => region.id !== regionId) };
    }

    return company;
  });

  return { currentCompanyId, list: companies };
};

const updateRegion = ({ regionId, regionName }, state) => {
  const { currentCompanyId, list } = state;

  const companies = list.map((company) => {
    const { regions = [], id } = company;

    if (id === currentCompanyId) {
      const updatedRegions = regions.map((region) => {
        if (region.id === regionId) {
          return { ...region, name: regionName };
        }

        return region;
      });

      return { ...company, regions: updatedRegions };
    }

    return company;
  });

  return { currentCompanyId, list: companies };
};

export default (state = initialState, action = {}) => {
  const { payload, type } = action;

  switch (type) {
    case GET_COMPANIES:
    case UPDATE_COMPANIES:
      return { ...state, list: payload };

    case CREATE_COMPANY:
      return { ...state, list: [...state.list, payload] };

    case SET_CURRENT_COMPANY_ID:
      return { ...state, currentCompanyId: payload };

    case SET_REGIONS:
      return setRegions(payload, state);

    case CREATE_REGION:
      return setRegion(payload, state);

    case DELETE_REGIONS:
      return deleteRegion(payload, state);

    case UPDATE_REGION:
      return updateRegion(payload, state);

    case SET_CURRENT_REGION_ID:
      return { ...state, currentRegionId: payload };

    default:
      return state;
  }
};
