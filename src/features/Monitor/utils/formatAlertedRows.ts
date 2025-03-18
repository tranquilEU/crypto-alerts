import { TWebSocketMessage } from '@/shared/@types/stream';

export const formatAlertedRows = (order: TWebSocketMessage) => {
	if (order.Q > 10) {
		return 'text-accent-foreground bg-red-900 hover:bg-amber-400';
	} else if (order.P < 50000) {
		return 'text-accent-foreground bg-yellow-900 hover:bg-amber-200';
	} else if (order.P * order.Q > 1000000) {
		return 'text-accent-foreground bg-white hover:bg-amber-700';
	}
};
