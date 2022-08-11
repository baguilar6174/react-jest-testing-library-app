export const replaceCamelWithSpaces = (text = '') => {
	return text.replace(/\B([A-Z])\B/g, ' $1');
};
