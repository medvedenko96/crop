export const getRegionsSelector = ({ regions }) => ({
	regionsById: regions.byId,
	regionsIds: regions.allIds,
	currentRegionId: regions.currentRegionId,
});
