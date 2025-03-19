import { useAlerts } from '@/features/Alerts/useAlerts';
import { TOrders, TWebSocketMessage } from '@/shared/@types/stream';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/shared/components/ui/table';
import i18n from '@/shared/i18n';
import { cn } from '@/shared/lib/utils';
import React from 'react';
import { useTranslation } from 'react-i18next';

type TAlerts = {
	cheapOrders: TWebSocketMessage[];
	solidOrders: TWebSocketMessage[];
	bigBiznisHere: TWebSocketMessage[];
	setCheapOrders: React.Dispatch<React.SetStateAction<TOrders[]>>;
	setSolidOrders: React.Dispatch<React.SetStateAction<TOrders[]>>;
	setBigBiznisHere: React.Dispatch<React.SetStateAction<TOrders[]>>;
};

const Alerts: React.FC<TAlerts> = ({
	cheapOrders,
	solidOrders,
	bigBiznisHere,
	setCheapOrders,
	setSolidOrders,
	setBigBiznisHere
}) => {
	const { t } = useTranslation();
	const { setTableColor, setTitleColor } = useAlerts({
		setCheapOrders,
		setSolidOrders,
		setBigBiznisHere
	});

	const createTable = (orders: TWebSocketMessage[], label: string) => {
		return (
			<div
				className={cn(
					'flex w-full flex-col items-center px-4',
					setTableColor(label)
				)}
			>
				<h2
					className={cn('text-2xl font-bold', setTitleColor(label))}
				>{`${label}: ${orders.length}`}</h2>
				<Table>
					<TableHeader className="sticky top-0 z-10">
						<TableRow className="bg-gray-100 hover:bg-gray-100">
							<TableHead>#</TableHead>
							<TableHead>{t('alerts.alertMessage')}</TableHead>
							<TableHead>{t('alerts.price')}</TableHead>
							<TableHead>{t('alerts.quantity')}</TableHead>
							<TableHead className="text-right">{t('alerts.total')}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders.map((order, index) => (
							<TableRow key={order.CCSEQ}>
								<TableCell>{index}</TableCell>
								<TableCell>{t('alerts.alertMessage')}</TableCell>
								<TableCell>{`$${order.P}`}</TableCell>
								<TableCell>{order.Q}</TableCell>
								<TableCell className="text-right">{`$${(order.P * order.Q).toFixed(2)}`}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		);
	};

	return (
		<div className="flex h-[100vh] content-between">
			{createTable(cheapOrders, i18n.t('alerts.cheapOrders'))}
			{createTable(solidOrders, i18n.t('alerts.solidOrders'))}
			{createTable(bigBiznisHere, i18n.t('alerts.bigBiznisHere'))}
		</div>
	);
};

export default Alerts;
