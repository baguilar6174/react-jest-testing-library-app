import {
	render,
	screen,
	waitFor,
} from '../../../src/test-utils/testingLibrary.utils';
import { rest } from 'msw';
import { server } from '../../../src/mocks/server';
import { OrderEntry } from '../../../src/pages/entry/OrderEntry';

describe('Tests on <OrderEntry/>', () => {
	test('handles error for scoops and toppings routes', async () => {
		server.resetHandlers(
			rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
				return res(ctx.status(500));
			}),
			rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
				return res(ctx.status(500));
			})
		);

		render(<OrderEntry setOrderPhase={jest.fn()} />);

		/* const alerts = await screen.findAllByRole('alert');
		expect(alerts).toHaveLength(2); */

		await waitFor(async () => {
			const alerts = await screen.findAllByRole('alert');
			expect(alerts).toHaveLength(2);
		});
	});
});
