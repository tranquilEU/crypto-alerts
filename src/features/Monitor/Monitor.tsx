import { formatAlertedRows } from '@/features/Monitor/utils/formatAlertedRows';
import { formatDelayNs } from '@/features/Monitor/utils/formatDelayNs';
import { formatSide } from '@/features/Monitor/utils/formatSide';
import { TWebSocketMessage } from '@/shared/@types/stream';
import { cn } from '@/shared/lib/utils';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

type MonitorPageProps = {
	orders: TWebSocketMessage[];
};

const MonitorPage: React.FC<MonitorPageProps> = ({ orders }) => {
	const { t } = useTranslation();
	const parentRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<div className="h-screen w-full overflow-hidden bg-black font-mono text-sm text-green-400">
				{orders && orders.length > 0 && (
					<div ref={parentRef} className="h-full w-full overflow-y-auto px-2">
						<table className="w-full table-auto border-collapse">
							<thead>
								<tr
									className="border-b border-green-700 bg-black text-left text-yellow-400"
									style={{ position: 'sticky', top: 0, zIndex: 1 }}
								>
									<th>#</th>
									<th>{t('monitor.order')}</th>
									<th>{t('monitor.market')}</th>
									<th>{t('monitor.coin')}</th>
									<th>{t('monitor.tsym')}</th>
									<th>{t('monitor.bidAsk')}</th>
									<th>{t('monitor.action')}</th>
									<th>{t('monitor.ccseq')}</th>
									<th>{t('monitor.positionValue')}</th>
									<th>{t('monitor.assetVolume')}</th>
									<th>{t('monitor.seq')}</th>
									<th>{t('monitor.reported')}</th>
									<th>{t('monitor.delay')}</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order, index) => {
									const timestamp = order.REPORTEDNS;
									const milliseconds = Math.floor(timestamp / 1000000);
									const readableDate = new Date(milliseconds);

									return (
										<tr
											key={index}
											className={cn(
												'border-b border-green-700 hover:bg-green-700/20',
												formatAlertedRows(order)
											)}
										>
											<td className="text-yellow-400">{index + 1}</td>
											<td>{order.TYPE === '8' && t('monitor.update')}</td>
											<td>{order.M}</td>
											<td>{order.FSYM}</td>
											<td>{order.TSYM}</td>
											<td>{formatSide(order.SIDE)}</td>
											<td>{order.ACTION}</td>
											<td>{order.CCSEQ}</td>
											<td>{`$${order.P}`}</td>
											<td>{order.Q}</td>
											<td>{order.SEQ}</td>
											<td>{readableDate.toLocaleString()}</td>
											<td>{formatDelayNs(order.DELAYNS)}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</>
	);
};

export default MonitorPage;
