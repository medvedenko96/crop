export const getYearsSelector = ({ years }) => ({
	yearsById: years.byId,
	yearsIds: years.allIds,
	currentYearId: years.currentYearId,
});
