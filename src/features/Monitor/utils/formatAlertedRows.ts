import { TWebSocketMessage } from '@/shared/@types/stream';

export const formatAlertedRows = (order: TWebSocketMessage) => {
	if (order.Q > 10) {
		return 'text-accent-foreground bg-red-500 hover:bg-yellow-200';
	} else if (order.P < 50000) {
		return 'text-accent-foreground bg-yellow-500 hover:bg-yellow-200';
	} else if (order.P * order.Q > 1000000) {
		return 'text-accent-foreground bg-blue-900 text-white hover:bg-blue-700';
	}
};
