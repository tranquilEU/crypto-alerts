import { Button } from '@/shared/components/ui/button';
import { useWebSocket } from '@/shared/context/websocketContext';
import { cn } from '@/shared/lib/utils';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type CryptoData = {
	M: string;
	P: number;
};

const Sidebar: React.FC = () => {
	const { t } = useTranslation();
	const {
		socket,
		isStreaming,
		isStartDisabled,
		isStopDisabled,
		startStream,
		stopStream
	} = useWebSocket();

	const [data, setData] = useState<CryptoData | null>(null);

	useEffect(() => {
		if (!socket) return;

		socket.onmessage = event => {
			const message = JSON.parse(event.data);
			console.log('Received message:', message);
			setData(message);
		};

		return () => {
			if (socket) {
				socket.close();
			}
		};
	}, [socket]);

	const commonStyles = 'rounded px-4 py-2 text-center';

	return (
		<div className="flex h-screen w-64 flex-col justify-between bg-gray-800 text-white">
			<div>
				<h2 className="p-4 text-2xl font-bold">{t('sidebar.title')}</h2>
				<div className="flex flex-col gap-4 p-4">
					<Link
						to="/monitor"
						className={cn(commonStyles, 'bg-blue-600 hover:bg-blue-500')}
					>
						{t('sidebar.monitor')}
					</Link>
					<Link
						to="/alerts"
						className={cn(commonStyles, 'bg-amber-600 hover:bg-amber-500')}
					>
						{t('sidebar.alerts')}
					</Link>
				</div>
			</div>

			<div className="flex flex-col gap-4 p-4">
				<Button
					className={cn(commonStyles, 'bg-green-600 hover:bg-green-500')}
					disabled={isStreaming || isStartDisabled}
					onClick={startStream}
				>
					{t('sidebar.startStream')}
				</Button>
				<Button
					className={cn(commonStyles, 'bg-red-600 hover:bg-red-500')}
					disabled={!isStreaming || isStopDisabled}
					onClick={stopStream}
				>
					{t('sidebar.stopStream')}
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
