import { replaceCamelWithSpaces } from '../../src/utilities';

describe('spaces before camel-case capital letters', () => {
	test('works for no inner capital letters', () => {
		const expectedResult = 'Red';
		const result = replaceCamelWithSpaces('Red');
		expect(result).toBe(expectedResult);
	});

	test('works for one inner capital letter', () => {
		const text = 'MidnightBlue';
		const expectedResult = 'Midnight Blue';
		const result = replaceCamelWithSpaces(text);
		expect(result).toBe(expectedResult);
	});

	test('works for multiple inner capital letters', () => {
		const text = 'MediumVioletRed';
		const expectedResult = 'Medium Violet Red';
		const result = replaceCamelWithSpaces(text);
		expect(result).toBe(expectedResult);
	});
});
