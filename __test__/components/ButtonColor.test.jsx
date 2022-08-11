import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonColor } from '../../src/components/ButtonColor';

describe('Tests on <ButtonColor/> component', () => {
	test('button has correct initial color', () => {
		render(<ButtonColor />);
		// find an element with role of button and text
		const button = screen.getByRole('button', {
			name: 'Change to Midnight Blue',
		});
		expect(button).toHaveStyle({
			backgroundColor: 'MediumVioletRed',
		});
		// click button
		fireEvent.click(button);
		// expect the background color to be MidnightBlue
		expect(button).toHaveStyle({
			backgroundColor: 'MidnightBlue',
		});
		expect(button.textContent).toBe('Change to Medium Violet Red');
	});

	test('initial conditions', () => {
		render(<ButtonColor />);
		// check that the button starts out enabled
		const button = screen.getByRole('button', {
			name: 'Change to Midnight Blue',
		});
		expect(button).toBeEnabled();

		// check that the checkbox starts out unchecked
		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).not.toBeChecked();
	});

	test('click in checkbox so the button is disabled or enabled', () => {
		render(<ButtonColor />);
		const button = screen.getByRole('button', {
			name: 'Change to Midnight Blue',
		});
		const checkbox = screen.getByRole('checkbox', { name: 'Diabled button' });
		// checkbox click
		fireEvent.click(checkbox);
		// button is disabled
		expect(button).toBeDisabled();
		// checkbox click
		fireEvent.click(checkbox);
		// button is disabled
		expect(button).toBeEnabled();
	});

	test('disabled button has brackground and reverts to MediumVioletRed', () => {
		render(<ButtonColor />);
		const button = screen.getByRole('button', {
			name: 'Change to Midnight Blue',
		});
		const checkbox = screen.getByRole('checkbox', { name: 'Diabled button' });
		fireEvent.click(checkbox);
		expect(button).toHaveStyle({
			backgroundColor: 'grey',
		});
		fireEvent.click(checkbox);
		expect(button).toHaveStyle({
			backgroundColor: 'MediumVioletRed',
		});
	});

	test('clicked disabled button has brackground and reverts to MidnightBlue', () => {
		render(<ButtonColor />);
		const button = screen.getByRole('button', {
			name: 'Change to Midnight Blue',
		});
		const checkbox = screen.getByRole('checkbox', { name: 'Diabled button' });

		fireEvent.click(button);

		fireEvent.click(checkbox);
		expect(button).toHaveStyle({
			backgroundColor: 'grey',
		});
		fireEvent.click(checkbox);
		expect(button).toHaveStyle({
			backgroundColor: 'MidnightBlue',
		});
	});
});
