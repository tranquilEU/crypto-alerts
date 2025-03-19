import { TWebSocketMessage } from '@/shared/@types/stream';
import {
	BIG_BIZNIS_HERE,
	CHEAP_ORDER,
	SOLID_ORDER
} from '@/shared/constants/alertConstants';

export const formatAlertedRows = (order: TWebSocketMessage) => {
	if (order.Q > SOLID_ORDER) {
		return 'text-accent-foreground bg-red-500 hover:bg-yellow-200';
	} else if (order.P < CHEAP_ORDER) {
		return 'text-accent-foreground bg-yellow-500 hover:bg-yellow-200';
	} else if (order.P * order.Q > BIG_BIZNIS_HERE) {
		return 'text-accent-foreground bg-blue-900 text-white hover:bg-blue-700';
	}
};
