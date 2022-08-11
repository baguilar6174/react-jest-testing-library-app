import { render, screen } from '@testing-library/react';
import { ButtonColor } from '../../src/components/ButtonColor';

describe('Tests on <ButtonColor/> component', () => {
	test('button has correct initial color', () => {
		render(<ButtonColor />);
		// find an element with role of button and text
		const button = screen.getByRole('button', { name: 'Change to blue' });
		expect(button).toHaveStyle({
			backgroundColor: 'red',
		});
	});

	test('button turns blue when clicked', () => {});
});
