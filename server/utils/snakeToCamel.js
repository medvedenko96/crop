const snakeToCamel = (str) =>
	str.replace(/([-_][a-z])/g, (group) => {
		return group.toUpperCase().replace('-', '').replace('_', '');
	});

const snakeToCamelMapper = (obj) => {
	const result = {};

	Object.keys(obj).map((key) => (result[snakeToCamel(key)] = obj[key]));

	return result;
};

module.exports = {
	snakeToCamel,
	snakeToCamelMapper,
};
