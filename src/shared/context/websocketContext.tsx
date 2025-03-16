import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';

const WebSocketContext = createContext<{
	socket: WebSocket | null;
	startStream: () => void;
	stopStream: () => void;
	isStreaming: boolean;
}>({
	socket: null,
	startStream: () => {},
	stopStream: () => {},
	isStreaming: false
});

const API_KEY = import.meta.env.VITE_CRYPTO_API_KEY as string;

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
	const [socket, setSocket] = useState<WebSocket | null>(null);
	const [isStreaming, setIsStreaming] = useState(false);

	const startStream = () => {
		if (socket && socket.readyState !== WebSocket.CLOSED) {
			console.log(
				'WebSocket is already active or in use, skipping startStream'
			);
			return;
		}

		if (isStreaming) {
			console.log('Stream is already starting, skipping startStream');
			return;
		}

		const ws = new WebSocket(
			`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
		);

		ws.onopen = () => {
			console.log('WebSocket connected');
			ws.send(
				JSON.stringify({ action: 'SubAdd', subs: ['8~Binance~BTC~USDT'] })
			);
			setIsStreaming(true);
		};

		ws.onclose = () => {
			console.log('WebSocket disconnected');
			setSocket(null);
			setIsStreaming(false);
		};

		ws.onerror = error => {
			console.error('WebSocket error:', error);
			setSocket(null);
			setIsStreaming(false);
		};

		setSocket(ws);
	};

	const stopStream = () => {
		console.log('Stopping WebSocket connection', socket);
		if (socket) {
			console.log('Closing WebSocket connection');
			socket.close();
		}
		setSocket(null);
		setIsStreaming(false);
	};

	return (
		<WebSocketContext.Provider
			value={{ socket, startStream, stopStream, isStreaming }}
		>
			{children}
		</WebSocketContext.Provider>
	);
};

export const useWebSocket = () => {
	return useContext(WebSocketContext);
};
