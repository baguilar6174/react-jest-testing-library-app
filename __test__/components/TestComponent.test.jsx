import { render, screen } from '@testing-library/react';
import { TestComponent } from '../../src/components/TestComponent';

describe('Tests on <TestComponent/>', () => {
	test('render Learn React link', () => {
		render(<TestComponent />);
		const h1Element = screen.getByRole('link', { name: /Learn React/i });
		expect(h1Element).toBeTruthy();
	});
});
