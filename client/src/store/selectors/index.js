export const getCurrentCompanySelector = ({ companies: { currentCompanyId, byId } }) => {
  return byId[currentCompanyId];
};

export const getCurrentCompanyIdSelector = ({ companies }) => companies.currentCompanyId;

export const getRegionsSelector = ({ regions }) => ({
  regionsById: regions.byId,
  regionsIds: regions.allIds,
  currentRegionId: regions.currentRegionId,
});

export const getFieldsSelector = ({ fields }) => ({
  fieldsById: fields.byId,
  fieldsIds: fields.allIds,
  currentFieldId: fields.currentFieldId,
});
