import { TWebSocketMessage } from '@/shared/@types/stream';
import { useVirtualizer } from '@tanstack/react-virtual';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface MonitorPageProps {
	orders: TWebSocketMessage[];
}

const MonitorPage: React.FC<MonitorPageProps> = ({ orders }) => {
	const { t } = useTranslation();
	const parentRef = useRef<HTMLDivElement>(null);

	const rowVirtualizer = useVirtualizer({
		count: orders.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 40
	});

	const formatDelayNs = (delayNs: number): string => {
		const milliseconds = delayNs / 1_000_000;
		const seconds = delayNs / 1_000_000_000;
		const minutes = seconds / 60;

		if (milliseconds < 1000) {
			return `${milliseconds.toFixed(2)} ms`;
		} else if (seconds < 60) {
			return `${seconds.toFixed(2)} seconds`;
		} else {
			return `${minutes.toFixed(2)} minutes`;
		}
	};

	const keyColor = 'text-green-700';
	const valueColor = 'text-green-400';
	const pipeColor = 'text-white';

	return (
		<>
			{orders && orders.length > 0 && (
				<div className="h-screen w-full overflow-hidden bg-black font-mono text-sm text-green-400">
					<div ref={parentRef} className="h-full w-full overflow-y-auto">
						<div
							style={{
								height: `${rowVirtualizer.getTotalSize()}px`,
								width: '100%',
								position: 'relative'
							}}
						>
							{rowVirtualizer.getVirtualItems().map(virtualItem => {
								const order = orders[virtualItem.index];
								const timestamp = order.REPORTEDNS;
								const milliseconds = Math.floor(timestamp / 1000000);
								const readableDate = new Date(milliseconds);

								return (
									<div
										className="absolute px-2"
										key={virtualItem.index}
										style={{
											transform: `translateY(${virtualItem.start}px)`
										}}
									>
										<span className="text-yellow-400">
											{virtualItem.index + 1}
										</span>{' '}
										{[
											{ label: t('monitor.type'), value: order.TYPE },
											{ label: t('monitor.m'), value: order.M },
											{ label: t('monitor.fsym'), value: order.FSYM },
											{ label: t('monitor.tsym'), value: order.TSYM },
											{ label: t('monitor.side'), value: order.SIDE },
											{ label: t('monitor.action'), value: order.ACTION },
											{ label: t('monitor.ccseq'), value: order.CCSEQ },
											{ label: t('monitor.p'), value: order.P },
											{ label: t('monitor.q'), value: order.Q },
											{ label: t('monitor.seq'), value: order.SEQ },
											{
												label: t('monitor.reportedns'),
												value: readableDate.toLocaleTimeString()
											},
											{
												label: t('monitor.delayns'),
												value: formatDelayNs(order.DELAYNS)
											}
										].map(({ label, value }, index) => (
											<React.Fragment key={index}>
												<span className={keyColor}>{label}:</span>{' '}
												<span className={valueColor}>{value}</span>{' '}
												{index < 11 && (
													<span className={pipeColor}>|</span>
												)}{' '}
											</React.Fragment>
										))}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default MonitorPage;
