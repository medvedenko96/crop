export const getCurrentCompanySelector = ({ companies: { currentCompanyId, byId } }) => {
  return byId[currentCompanyId];
};

export const getCurrentRegionIdSelector = ({ companies }) => companies.currentRegionId;

export const getRegionsSelector = ({ regions }) => ({
  regionsById: regions.byId,
  regionsIds: regions.allIds,
  currentRegionId: regions.currentRegionId,
});
