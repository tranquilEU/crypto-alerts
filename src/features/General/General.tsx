import { Button } from '@/shared/components/ui/button';

export const General: React.FC = () => {
	return (
		<>
			<h1 className="font-bold">Crypto Stream Control</h1>
			<div>
				<Button>Start Stream</Button>
				<Button variant={'destructive'}>Stop Stream</Button>
			</div>
		</>
	);
};
