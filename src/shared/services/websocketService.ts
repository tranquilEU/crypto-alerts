import i18n from '@/shared/i18n';
import { toast } from 'react-toastify';
import { webSocket } from 'rxjs/webSocket';

const API_KEY = import.meta.env.VITE_CRYPTO_API_KEY as string;

export const createWebSocket = () => {
	const websocket = webSocket(
		`wss://streamer.cryptocompare.com/v2?api_key=${API_KEY}`
	);

	const subscribe = () => {
		const subscriptionMessage = {
			action: 'SubAdd',
			subs: ['8~Binance~BTC~USDT']
		};
		websocket.next(subscriptionMessage);
		toast.success(i18n.t('toastMessages.open'));
	};

	const unsubscribe = () => {
		const unsubscriptionMessage = {
			action: 'SubRemove',
			subs: ['8~Binance~BTC~USDT']
		};
		websocket.next(unsubscriptionMessage);
		toast.info(i18n.t('toastMessages.close'));
	};

	return { websocket, subscribe, unsubscribe };
};
