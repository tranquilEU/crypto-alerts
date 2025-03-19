import { TOrders } from '@/shared/@types/stream';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
	setCheapOrders: React.Dispatch<React.SetStateAction<TOrders[]>>;
	setSolidOrders: React.Dispatch<React.SetStateAction<TOrders[]>>;
	setBigBiznisHere: React.Dispatch<React.SetStateAction<TOrders[]>>;
};

export const useAlerts = ({
	setCheapOrders,
	setSolidOrders,
	setBigBiznisHere
}: Props) => {
	const { t } = useTranslation();
	const cleanupOldOrders = (
		setStateFn: React.Dispatch<React.SetStateAction<TOrders[]>>
	) => {
		setStateFn(prev =>
			prev.filter(order => Date.now() - order.TIMESTAMP <= 60000)
		);
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
			cleanupOldOrders(setCheapOrders);
			cleanupOldOrders(setSolidOrders);
			cleanupOldOrders(setBigBiznisHere);
		}, 1000);

		return () => clearInterval(intervalId);
	}, [setBigBiznisHere, setCheapOrders, setSolidOrders]);

	const setTitleColor = (label: string) => {
		switch (label) {
			case t('alerts.cheapOrders'):
				return 'text-yellow-500';
			case t('alerts.solidOrders'):
				return 'text-red-500';
			case t('alerts.bigBiznisHere'):
				return 'text-blue-500';
			default:
				return '';
		}
	};

	const setTableColor = (label: string) => {
		switch (label) {
			case t('alerts.cheapOrders'):
				return 'bg-yellow-100';
			case t('alerts.solidOrders'):
				return 'bg-red-200';
			case t('alerts.bigBiznisHere'):
				return 'bg-blue-300';
			default:
				return '';
		}
	};

	return {
		setTableColor,
		setTitleColor
	};
};
