import i18n from '@/shared/i18n';

export const formatSide = (side: number): string => {
	return side === 0 ? i18n.t('monitor.bid') : i18n.t('monitor.ask');
};
