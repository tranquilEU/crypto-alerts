import { OrderBookChart } from '@/features/Monitor/OrderBookChart';
import { TSnapshot } from '@/shared/@types/stream';
import React from 'react';

interface MonitorPageProps {
	snapshot?: TSnapshot;
}

const MonitorPage: React.FC<MonitorPageProps> = ({ snapshot }) => {
	return <>{snapshot && <OrderBookChart data={snapshot} />}</>;
};

export default MonitorPage;
