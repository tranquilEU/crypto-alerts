import { ChartConfig, ChartContainer } from '@/shared/components/ui/chart';
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';

type TOrderBookChartProps = {
	data: {
		TYPE: string;
		M: string;
		FSYM: string;
		TSYM: string;
		CCSEQ: number;
		BID: Array<{ P: number; Q: number }>;
		ASK: Array<{ P: number; Q: number }>;
	};
};

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: '#2563eb'
	},
	mobile: {
		label: 'Mobile',
		color: '#60a5fa'
	}
} satisfies ChartConfig;

export const OrderBookChart = ({ data }: TOrderBookChartProps) => {
	const bidData = data.BID.map(item => ({
		type: 'BID',
		price: item.P,
		quantity: item.Q
	}));
	const askData = data.ASK.map(item => ({
		type: 'ASK',
		price: item.P,
		quantity: item.Q
	}));
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<LineChart width={800} height={400}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis
					dataKey="price"
					type="number"
					domain={['auto', 'auto']}
					label={{ value: 'Price', position: 'insideBottom', offset: 0 }}
				/>
				<YAxis
					label={{ value: 'Quantity', angle: -90, position: 'insideLeft' }}
				/>
				<Tooltip />
				<Legend verticalAlign="top" />
				<Line data={bidData} dataKey="quantity" name="BID" stroke="#82ca9d" />
				<Line data={askData} dataKey="quantity" name="ASK" stroke="#8884d8" />
			</LineChart>
		</ChartContainer>
	);
};
