import { Button } from '@/shared/components/ui/button';
import { useWebSocket } from '@/shared/context/websocketContext';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type CryptoData = {
	M: string;
	P: number;
};

export const General: React.FC = () => {
	const { t } = useTranslation();
	const { socket, startStream, stopStream, isStreaming } = useWebSocket();

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

	return (
		<>
			<h1 className="font-bold">{t('general.cryptoAlerts')}</h1>
			<div>
				<Button disabled={isStreaming} onClick={startStream}>
					{t('general.startStream')}
				</Button>
				<Button
					variant="destructive"
					disabled={!isStreaming}
					onClick={stopStream}
				>
					{t('general.stopStream')}
				</Button>
			</div>
		</>
	);
};
