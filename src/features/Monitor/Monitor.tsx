import { formatAlertedRows } from '@/features/Monitor/utils/formatAlertedRows';
import { formatDelayNs } from '@/features/Monitor/utils/formatDelayNs';
import { formatSide } from '@/features/Monitor/utils/formatSide';
import { TWebSocketMessage } from '@/shared/@types/stream';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/shared/components/ui/tooltip';
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
								<tr className="sticky top-0 z-10 border-b border-green-700 bg-black text-left text-yellow-400">
									<th>#</th>
									<th>
										{
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>{t('monitor.order')}</TooltipTrigger>
													<TooltipContent>
														<p>{t('monitor.tooltip.order')}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										}
									</th>
									<th>
										{
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>{t('monitor.market')}</TooltipTrigger>
													<TooltipContent>
														<p>{t('monitor.tooltip.market')}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										}
									</th>
									<th>
										{
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>{t('monitor.coin')}</TooltipTrigger>
													<TooltipContent>
														<p>{t('monitor.tooltip.coin')}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										}
									</th>
									<th>
										{
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>{t('monitor.tsym')}</TooltipTrigger>
													<TooltipContent>
														<p>{t('monitor.tooltip.tsym')}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										}
									</th>
									<th>
										{
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>{t('monitor.bidAsk')}</TooltipTrigger>
													<TooltipContent>
														<p>{t('monitor.tooltip.bidAsk')}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										}
									</th>
									<th>
										{
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>{t('monitor.action')}</TooltipTrigger>
													<TooltipContent>
														<p>{t('monitor.tooltip.action')}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										}
									</th>
									<th>
										{
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>{t('monitor.ccseq')}</TooltipTrigger>
													<TooltipContent>
														<p>{t('monitor.tooltip.ccseq')}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										}
									</th>
									<th>
										{
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														{t('monitor.positionValue')}
													</TooltipTrigger>
													<TooltipContent>
														<p>{t('monitor.tooltip.positionValue')}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										}
									</th>
									<th>
										{
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														{t('monitor.assetVolume')}
													</TooltipTrigger>
													<TooltipContent>
														<p>{t('monitor.tooltip.assetVolume')}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										}
									</th>
									<th>
										{
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>{t('monitor.seq')}</TooltipTrigger>
													<TooltipContent>
														<p>{t('monitor.tooltip.seq')}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										}
									</th>
									<th>
										{
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>
														{t('monitor.reported')}
													</TooltipTrigger>
													<TooltipContent>
														<p>{t('monitor.tooltip.reported')}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										}
									</th>
									<th>
										{
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger>{t('monitor.delay')}</TooltipTrigger>
													<TooltipContent>
														<p>{t('monitor.tooltip.delay')}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										}
									</th>
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
