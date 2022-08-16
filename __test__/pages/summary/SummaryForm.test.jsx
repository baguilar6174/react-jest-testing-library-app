import {
	render,
	screen,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import SummaryForm from '../../../src/pages/summary/SummaryForm';

import userEvent from '@testing-library/user-event';

describe('Tests on <SummaryForm/> component', () => {
	test('checkbox is unchecked by default', () => {
		render(<SummaryForm />);
		// screen.debug();
		const checkbox = screen.getByRole('checkbox', {
			name: /terms and conditions/i,
		});
		expect(checkbox).not.toBeChecked();
		const confirmOrderbutton = screen.getByRole('button', {
			name: 'Confirm order',
		});
		expect(confirmOrderbutton).toBeDisabled();
	});

	test('checking checkbox enables button and unchecking checkbox disabled button', () => {
		render(<SummaryForm />);
		const confirmOrderbutton = screen.getByRole('button', {
			name: 'Confirm order',
		});
		const checkbox = screen.getByRole('checkbox');
		userEvent.click(checkbox);
		expect(confirmOrderbutton).toBeEnabled();
		userEvent.click(checkbox);
		expect(confirmOrderbutton).toBeDisabled();
	});

	test('popover responds to hover', async () => {
		render(<SummaryForm />);

		// popover starts out hidden
		const popoverText = screen.queryByText(
			/no ice cream will actually be delivered/i
		);
		expect(popoverText).not.toBeInTheDocument();
		// popover appear upon of checkbox label
		const termsAndConditions = screen.getByText(/terms and conditions/i);
		userEvent.hover(termsAndConditions);
		const popover = screen.queryByText(
			/no ice cream will actually be delivered/i
		);
		expect(popover).toBeInTheDocument();
		// poppover dissapears when we mouse out
		userEvent.unhover(termsAndConditions);
		// popover starts out hidden
		await waitForElementToBeRemoved(() =>
			screen.queryByText(/no ice cream will actually be delivered/i)
		);
	});
});
