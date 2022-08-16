import { render, screen } from '../../../src/test-utils/testingLibrary.utils';
import { Options } from '../../../src/pages/entry/Options';

describe('test on <Options/> page', () => {
	test('display image for each scoop option from the server', async () => {
		render(<Options optionType='scoops' />);
		// find images
		const images = await screen.findAllByRole('img', { name: /scoop$/i });
		expect(images).toHaveLength(4);

		// confirm alt text of images
		const altTexts = images.map((image) => image.alt);
		expect(altTexts).toEqual([
			'Mint chip scoop',
			'Vanilla scoop',
			'Chocolate scoop',
			'Salted caramel scoop',
		]);
	});

	test('display image for each topping option from the server', async () => {
		render(<Options optionType='toppings' />);
		// find images
		const images = await screen.findAllByRole('img', { name: /topping$/i });
		expect(images).toHaveLength(3);

		// confirm alt text of images
		const altTexts = images.map((image) => image.alt);
		expect(altTexts).toEqual([
			'M&Ms topping',
			'Hot fudge topping',
			'Cherries topping',
		]);
	});
});
