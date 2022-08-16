import { render, screen } from '../../../src/test-utils/testingLibrary.utils';
import userEvent from '@testing-library/user-event';
import { Options } from '../../../src/pages/entry/Options';
import { OrderEntry } from '../../../src/pages/entry/OrderEntry';

describe('Tests on subtotals and total', () => {
	test('update scoop subtotal when scoops change', async () => {
		render(<Options optionType='scoops' />);

		// make sure total starts out $0.00
		const scoopSubtotal = screen.getByText('scoops total: $', { exact: false });
		expect(scoopSubtotal).toHaveTextContent('0.00');

		// update vanilla scoop to 1 and check the subtotal
		const vanillaInput = await screen.findByRole('spinbutton', {
			name: 'Vanilla',
		});
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '1');
		expect(scoopSubtotal).toHaveTextContent('2.00');

		// update chocolate scoop to 2 and check the subtotal
		const chocolateInput = await screen.findByRole('spinbutton', {
			name: 'Chocolate',
		});
		userEvent.clear(chocolateInput);
		userEvent.type(chocolateInput, '2');
		expect(scoopSubtotal).toHaveTextContent('6.00');
	});

	test('update toppings subtotal when toppings change', async () => {
		render(<Options optionType='toppings' />);
		// make sure total starts out $0.00
		const toppingsSubtotal = screen.getByText('toppings total: $', {
			exact: false,
		});
		expect(toppingsSubtotal).toHaveTextContent('0.00');

		const cherriesChackbox = await screen.findByRole('checkbox', {
			name: 'Cherries',
		});
		userEvent.click(cherriesChackbox);
		expect(toppingsSubtotal).toHaveTextContent('1.50');

		const hotFudgeChackbox = await screen.findByRole('checkbox', {
			name: 'Hot fudge',
		});
		userEvent.click(hotFudgeChackbox);
		expect(toppingsSubtotal).toHaveTextContent('3.00');

		userEvent.click(hotFudgeChackbox);
		expect(toppingsSubtotal).toHaveTextContent('1.50');
	});

	test('grand total updates properly if scoop is added first', async () => {
		render(<OrderEntry />);
		const grandTotalText = screen.getByRole('heading', {
			name: /grand total: \$/i,
		});
		expect(grandTotalText).toHaveTextContent('0.00');
		// update vanilla scoop to 1 and check the subtotal
		const vanillaInput = await screen.findByRole('spinbutton', {
			name: 'Vanilla',
		});
		userEvent.clear(vanillaInput);
		userEvent.type(vanillaInput, '1');
		expect(grandTotalText).toHaveTextContent('2.00');
	});

	test('grand total updates properly if topping is added first', async () => {
		render(<OrderEntry />);
		const grandTotalText = screen.getByRole('heading', {
			name: /grand total: \$/i,
		});
		expect(grandTotalText).toHaveTextContent('0.00');
		const cherriesChackbox = await screen.findByRole('checkbox', {
			name: 'Cherries',
		});
		userEvent.click(cherriesChackbox);
		expect(grandTotalText).toHaveTextContent('1.50');
	});

	test('grand total updates properly if item is removed', async () => {
		render(<OrderEntry />);
		const grandTotalText = screen.getByRole('heading', {
			name: /grand total: \$/i,
		});
		const cherriesChackbox = await screen.findByRole('checkbox', {
			name: 'Cherries',
		});
		userEvent.click(cherriesChackbox);
		expect(grandTotalText).toHaveTextContent('1.50');
		userEvent.click(cherriesChackbox);
		expect(grandTotalText).toHaveTextContent('0.00');
	});
});
