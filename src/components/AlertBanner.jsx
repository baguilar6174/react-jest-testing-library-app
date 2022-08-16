import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

export const AlertBanner = ({ message, variant }) => {
	return (
		<Alert variant={variant} style={{ backgroundColor: 'red' }}>
			{message}
		</Alert>
	);
};

AlertBanner.propTypes = {
	message: PropTypes.string.isRequired,
	variant: PropTypes.string,
};

AlertBanner.defaultProps = {
	message: 'An expected error ocurred. Please try again later.',
	variant: 'danger',
};
