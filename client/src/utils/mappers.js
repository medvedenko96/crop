export const yearsFormat = (yearsById, yearsIds, currentFieldId) =>
	yearsIds[currentFieldId]?.map((id) => yearsById[id]) || [];
