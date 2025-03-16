import { toast } from '@/shared/utils/toast';
import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

const WebSocketContext = createContext<{
	socket: WebSocket | null;
	isStreaming: boolean;
	isStartDisabled: boolean;
	isStopDisabled: boolean;
	startStream: () => void;
	stopStream: () => void;
}>({
	socket: null,
	isStreaming: false,
	isStartDisabled: false,
	isStopDisabled: false,
	startStream: () => {},
	stopStream: () => {}
});

const API_KEY = import.meta.env.VITE_CRYPTO_API_KEY as string;

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
	const { t } = useTranslation();
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [isStreaming, setIsStreaming] = useState(false);
	const [isStartDisabled, setIsStartDisabled] = useState(false);
	const [isStopDisabled, setIsStopDisabled] = useState(false);

	const startStream = () => {
		if (socket && socket.readyState !== WebSocket.CLOSED) {
			return;
		}

		if (isStreaming) {
			return;
		}

		const ws = new WebSocket(
			`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
		);

		ws.onopen = () => {
			ws.send(
				JSON.stringify({ action: 'SubAdd', subs: ['8~Binance~BTC~USDT'] })
			);
			setIsStreaming(true);
			setIsStopDisabled(true);

			setTimeout(() => {
				setIsStopDisabled(false);
			}, 5000);
			toast.success(t('toastMessages.open'));
		};

		ws.onclose = () => {
			setSocket(null);
			setIsStreaming(false);
		};

		ws.onerror = error => {
			console.error('WebSocket error:', error);
			setSocket(null);
			setIsStreaming(false);
			toast.error(t('toastMessages.error'));
		};

		setSocket(ws);
	};

	const stopStream = () => {
		if (socket) {
			socket.close();
		}
		setSocket(null);
		setIsStreaming(false);
		setIsStartDisabled(true);

		setTimeout(() => {
			setIsStartDisabled(false);
		}, 5000);
		toast.success(t('toastMessages.close'));
	};

	return (
		<WebSocketContext.Provider
			value={{
				socket,
				isStreaming,
				isStartDisabled,
				isStopDisabled,
				startStream,
				stopStream
			}}
		>
			{children}
		</WebSocketContext.Provider>
	);
};

export const useWebSocket = () => {
	return useContext(WebSocketContext);
};
