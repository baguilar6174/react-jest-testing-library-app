import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { pricePeritem } from '../data';
import { formatCurrency } from '../utilities';

const OrderDetails = createContext();

// create a custom hook to check whether we are inside a provider

export const useOrderDetails = () => {
	const context = useContext(OrderDetails);

	if (!context) {
		throw new Error(
			'useOrderDetails must must be used within an OrderDetailsProvider'
		);
	}

	return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
	let optionCount = 0;
	for (const count of optionCounts[optionType].values()) {
		optionCount += count;
	}
	return optionCount * pricePeritem[optionType];
};

export const OrderDetailsProvider = (props) => {
	const [optionCounts, setOptionCounts] = useState({
		scoops: new Map(),
		toppings: new Map(),
	});
	const zeroCurrency = formatCurrency(0);
	const [totals, setTotals] = useState({
		scoops: zeroCurrency,
		toppings: zeroCurrency,
		grandTotal: zeroCurrency,
	});

	useEffect(() => {
		const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
		const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
		const grandTotal = formatCurrency(scoopsSubtotal + toppingsSubtotal);
		setTotals({
			scoops: formatCurrency(scoopsSubtotal),
			toppings: formatCurrency(toppingsSubtotal),
			grandTotal,
		});
	}, [optionCounts]);

	const value = useMemo(() => {
		function updateItemCount(itemName, newItemCount, optionType) {
			const newOptionCounts = { ...optionCounts };
			// update option count for this item with the new value
			const optionCountsMap = optionCounts[optionType];
			optionCountsMap.set(itemName, parseInt(newItemCount));

			setOptionCounts(newOptionCounts);
		}

		function resetOrder() {
			setOptionCounts({
				scoops: new Map(),
				toppings: new Map(),
			});
		}

		return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
	}, [optionCounts, totals]);

	return <OrderDetails.Provider value={value} {...props} />;
};
