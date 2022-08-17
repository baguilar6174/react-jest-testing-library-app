import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TestingApp } from '../src/TestingApp';

describe('Test on hole App', () => {
	test('order phases for happy path', async () => {
		// render app
		render(<TestingApp />);

		// add ice cream scoops and toppings
		const vanillaInput = await screen.findByRole('spinbutton', {
			name: 'Vanilla',
		});
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '1');

		// update chocolate scoop to 2 and check the subtotal
		const chocolateInput = await screen.findByRole('spinbutton', {
			name: 'Chocolate',
		});
		userEvent.clear(chocolateInput);
		userEvent.type(chocolateInput, '2');

		const cherriesChackbox = await screen.findByRole('checkbox', {
			name: 'Cherries',
		});
		userEvent.click(cherriesChackbox);

		// find a click order button
		const orderSummaryButton = screen.getByRole('button', {
			name: /order sundae/i,
		});
		userEvent.click(orderSummaryButton);

		// check summary information based on order
		const summaryHeading = screen.getByRole('heading', {
			name: 'Order Summary',
		});
		expect(summaryHeading).toBeInTheDocument();

		const scoopsHeading = screen.getByRole('heading', {
			name: 'Scoops: $6.00',
		});
		expect(scoopsHeading).toBeInTheDocument();

		const toppingsHeading = screen.getByRole('heading', {
			name: 'Toppings: $1.50',
		});
		expect(toppingsHeading).toBeInTheDocument();

		// check summary option items
		expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
		expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
		expect(screen.getByText('Cherries')).toBeInTheDocument();

		// accept terms and conditions and click button to confirm order
		const tcCheckbox = screen.getByRole('checkbox', {
			name: /terms and conditions/i,
		});
		userEvent.click(tcCheckbox);

		const confirmOrderButton = screen.getByRole('button', {
			name: /confirm order/i,
		});
		userEvent.click(confirmOrderButton);

		// Expect "loading" to show
		const loading = screen.getByText(/loading/i);
		expect(loading).toBeInTheDocument();

		// confirm order number on confirmation page
		const thanYouHeader = await screen.findByRole('heading', {
			name: /thank you/i,
		});
		expect(thanYouHeader).toBeInTheDocument();

		// expect that loading has disappeared
		const notLoading = screen.queryByText('loading');
		expect(notLoading).not.toBeInTheDocument();

		const orderNumber = await screen.findByText(/order number/i);
		expect(orderNumber).toBeInTheDocument();

		// click new order button on confirmation page
		const newOrderButton = screen.getByRole('button', { name: /new order/i });
		userEvent.click(newOrderButton);

		// check that scoops and toppings subtotals have been reset
		const scoopsTotal = screen.getByText('scoops total: $0.00');
		expect(scoopsTotal).toBeInTheDocument();
		const toppingsTotal = screen.getByText('toppings total: $0.00');
		expect(toppingsTotal).toBeInTheDocument();

		// wait for items to appear so that Testing Library doesn't get angry about happening after test is over
		await screen.findByRole('spinbutton', { name: 'Vanilla' });
		await screen.findByRole('checkbox', { name: 'Cherries' });
	});
});
