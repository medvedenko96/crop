export const arrayToObject = (array, key) =>
	array.reduce((obj, item) => {
		obj[item[key]] = item;
		return obj;
	}, {});

export const getAllIds = (array = []) => array.map(({ id }) => id);

export const normalizedData = (array = [], id) => ({
	byId: arrayToObject(array, 'id'),
	allIds: id ? { [id]: getAllIds(array) } : getAllIds(array),
});
