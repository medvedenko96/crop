export const capitalizeFirstLetter = ([first, ...rest]) => {
	return [first.toUpperCase(), ...rest].join('');
};
