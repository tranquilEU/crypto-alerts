import { TSnapshot, TWebSocketMessage } from '@/shared/@types/stream';
import { createWebSocket } from '@/shared/services/websocketService';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { BehaviorSubject, Subscription } from 'rxjs';
import { scan } from 'rxjs/operators';

export const useWebSocketStream = () => {
	const { t } = useTranslation();
	const snapshot = useRef<TSnapshot | undefined>(undefined);
	const ordersSubject = useRef(new BehaviorSubject<TWebSocketMessage[]>([])); // Keeps track of orders
	const [orders, setOrders] = useState<TWebSocketMessage[]>([]);
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
			// Subscribe to WebSocket and orders
			const subscription = websocket.subscribe({
				next: (message: unknown) => {
					const typedMessage = message as TWebSocketMessage;

					if (typedMessage.TYPE === '9') {
						const typedSnapshot = message as TSnapshot;
						snapshot.current = typedSnapshot;
					}

					if (typedMessage.TYPE === '8') {
						const typedOrder = message as TWebSocketMessage;

						// Push new order into BehaviorSubject
						ordersSubject.current.next([typedOrder]);
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

			const ordersSubscription = ordersSubject.current
				.pipe(
					scan(
						(
							allOrders: TWebSocketMessage[],
							newOrders: TWebSocketMessage[]
						) => {
							return [...allOrders, ...newOrders].slice(-500);
						},
						[] as TWebSocketMessage[]
					)
				)
				.subscribe(latestOrders => setOrders(latestOrders));

			setWebSocketSubscription(
				new Subscription(() => {
					subscription.unsubscribe();
					ordersSubscription.unsubscribe();
				})
			);

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
		snapshot: snapshot.current,
		orders: orders.reverse(),
		isStreaming,
		isStartDisabled,
		isStopDisabled,
		startStream,
		stopStream
	};
};
