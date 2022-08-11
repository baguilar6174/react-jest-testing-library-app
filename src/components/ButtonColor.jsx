import { useState } from 'react';
import { replaceCamelWithSpaces } from '../utilities';

export const ButtonColor = () => {
	const [buttonColor, setButtonColor] = useState('MediumVioletRed');
	const [isDisabled, setIsDisabled] = useState(false);
	const newButtonColor =
		buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';
	const onHandleClick = () => setButtonColor(newButtonColor);

	return (
		<>
			<button
				disabled={isDisabled}
				onClick={onHandleClick}
				style={{
					backgroundColor: isDisabled ? 'grey' : buttonColor,
					color: 'white',
				}}
			>
				Change to {replaceCamelWithSpaces(newButtonColor)}
			</button>
			<input
				id='disabled-button-checkbox'
				type='checkbox'
				defaultChecked={isDisabled}
				aria-checked={isDisabled}
				onChange={(e) => setIsDisabled(e.target.checked)}
			/>
			<label htmlFor='disabled-button-checkbox'>Diabled button</label>
		</>
	);
};
