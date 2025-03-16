import { Button } from '@/shared/components/ui/button';
import { useTranslation } from 'react-i18next';

export const General: React.FC = () => {
	const { t } = useTranslation();
	return (
		<>
			<h1 className="font-bold">{t('general.cryptoAlerts')}</h1>
			<div>
				<Button>{t('general.startStream')}</Button>
				<Button variant={'destructive'}>{t('general.stopStream')}</Button>
			</div>
		</>
	);
};
