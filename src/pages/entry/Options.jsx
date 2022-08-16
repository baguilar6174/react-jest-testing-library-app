import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ScoopOption } from './ScoopOption';
import { Row } from 'react-bootstrap';
import { ToppingOption } from './ToppingOption';
import { AlertBanner } from '../../components/AlertBanner';
import { pricePeritem } from '../../data';
import { useOrderDetails } from '../../contexts/OrderDetails';
import { formatCurrency } from '../../utilities';

export const Options = ({ optionType }) => {
	const [items, setItems] = useState([]);
	const [error, setError] = useState(false);
	const [orderDetails, updateItemCount] = useOrderDetails();

	const getItems = async () => {
		try {
			const { data } = await axios.get(`http://localhost:3030/${optionType}`);
			setItems(data);
		} catch (err) {
			// console.log(err);
			setError(true);
		}
	};

	useEffect(() => {
		getItems();
	}, [optionType]);

	if (error) return <AlertBanner />;

	const ItemComponent = optionType === 'scoops' ? ScoopOption : ToppingOption;

	return (
		<>
			<h2>{optionType}</h2>
			<p>{formatCurrency(pricePeritem[optionType])} each</p>
			<p>
				{' '}
				{optionType} total: {orderDetails.totals[optionType]}{' '}
			</p>
			<Row>
				{items.map((item) => (
					<ItemComponent
						key={item.name}
						name={item.name}
						imagePath={item.imagePath}
						updateItemCount={(itemName, newItemCount) =>
							updateItemCount(itemName, newItemCount, optionType)
						}
					/>
				))}
			</Row>
		</>
	);
};

Options.propTypes = {
	optionType: PropTypes.string,
};

Options.defaultProps = {
	optionType: 'scoops',
};
