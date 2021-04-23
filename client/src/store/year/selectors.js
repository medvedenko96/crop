export const getYearsSelector = ({ years }) => ({
	yearsById: years.byId,
	yearsIds: years.allIds,
	currentYearId: years.currentYearId,
});

export const getNormBot = (state) => {
	const { yearsById, currentYearId } = getYearsSelector(state);

	return yearsById[currentYearId]?.normBot || [];
};
