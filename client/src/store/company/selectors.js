export const getCurrentCompanySelector = ({ companies: { currentCompanyId, byId } }) => {
    return byId[currentCompanyId];
};

export const getCurrentCompanyIdSelector = ({ companies }) => companies.currentCompanyId;
