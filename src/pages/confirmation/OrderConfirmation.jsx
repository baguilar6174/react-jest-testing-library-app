import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { AlertBanner } from '../../components/AlertBanner';

export default function OrderConfirmation({ setOrderPhase }) {
	const [, , resetOrder] = useOrderDetails();
	const [orderNumber, setOrderNumber] = useState(null);
	const [error, setError] = useState(false);

	const sendOrder = async () => {
		try {
			const { data } = await axios.post(`http://localhost:3030/order`);
			setOrderNumber(data.orderNumber);
		} catch (err) {
			// console.log(err);
			setError(true);
		}
	};

	useEffect(() => {
		sendOrder();
	}, []);

	if (error) {
		return <AlertBanner />;
	}

	function handleClick() {
		// clear the order details
		resetOrder();

		// send back to order page
		setOrderPhase('inProgress');
	}

	if (orderNumber) {
		return (
			<div style={{ textAlign: 'center' }}>
				<h1>Thank You!</h1>
				<p>Your order number is {orderNumber}</p>
				<p style={{ fontSize: '25%' }}>
					as per our terms and conditions, nothing will happen now
				</p>
				<Button onClick={handleClick}>Create new order</Button>
			</div>
		);
	} else {
		return <div>Loading</div>;
	}
}

OrderConfirmation.propTypes = {
	setOrderPhase: PropTypes.func,
};
