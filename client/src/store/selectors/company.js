export const getCurrentCompanySelector = ({ companies }) => {
  const { currentCompanyId, list } = companies;

  return list.find((company) => company.id === +currentCompanyId) || {};
};
