import { TSnapshot, TWebSocketMessage } from '@/shared/@types/stream';
import { createWebSocket } from '@/shared/services/websocketService';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Subscription } from 'rxjs/internal/Subscription';

export const useWebSocketStream = () => {
	const { t } = useTranslation();
	const messages = useRef<TWebSocketMessage[]>([]);
	const snapshot = useRef<TSnapshot | undefined>(undefined);
	const [webSocketSubscription, setWebSocketSubscription] =
		useState<Subscription | null>(null);
	const [isStreaming, setIsStreaming] = useState(false);
	const [isStartDisabled, setIsStartDisabled] = useState(false);
	const [isStopDisabled, setIsStopDisabled] = useState(true);

	const { websocket, subscribe, unsubscribe } = createWebSocket();

	const startStream = () => {
		setIsStreaming(true);
		setIsStopDisabled(true);

		if (websocket) {
			const subscription = websocket.subscribe({
				next: (message: unknown) => {
					const typedMessage = message as TWebSocketMessage;
					messages.current = [...messages.current, typedMessage];

					if (typedMessage.TYPE === '9') {
						const typedSnapshot = message as TSnapshot;
						snapshot.current = typedSnapshot;
					}

					setTimeout(() => {
						setIsStopDisabled(false);
					}, 5000);
				},
				error: err => {
					console.error('WebSocket error:', err);
					toast.error(t('toastMessages.error'));
				},
				complete: () => {
					console.log('WebSocket connection closed.');
				}
			});

			setWebSocketSubscription(subscription);
			subscribe();
		}
	};

	const stopStream = () => {
		setIsStreaming(false);
		setIsStartDisabled(true);

		if (webSocketSubscription) {
			unsubscribe();
			webSocketSubscription.unsubscribe();
			setWebSocketSubscription(null);
			console.log('WebSocket stream stopped.');

			setTimeout(() => {
				setIsStartDisabled(false);
			}, 5000);
		}
	};

	return {
		messages,
		snapshot: snapshot.current,
		isStreaming,
		isStartDisabled,
		isStopDisabled,
		startStream,
		stopStream
	};
};
