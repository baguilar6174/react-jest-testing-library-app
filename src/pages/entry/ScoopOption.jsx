import PropTypes from 'prop-types';
import { Col, Form, Row } from 'react-bootstrap';

export const ScoopOption = ({ name, imagePath, updateItemCount }) => {
	const onHandleChange = (e) => {
		updateItemCount(name, e.target.value);
	};

	return (
		<Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
			<img
				style={{ width: '75%' }}
				src={`http://localhost:3030/${imagePath}`}
				alt={`${name} scoop`}
			/>
			<Form.Group
				controlId={`${name}-count`}
				as={Row}
				style={{ marginTop: '10px' }}
			>
				<Form.Label column xs='6' style={{ textAlign: 'right' }}>
					{name}
				</Form.Label>
				<Col xs='5' style={{ textAlign: 'left' }}>
					<Form.Control
						onChange={onHandleChange}
						type='number'
						defaultValue={0}
					/>
				</Col>
			</Form.Group>
		</Col>
	);
};

ScoopOption.propTypes = {
	name: PropTypes.string.isRequired,
	imagePath: PropTypes.string.isRequired,
	updateItemCount: PropTypes.func.isRequired,
};
