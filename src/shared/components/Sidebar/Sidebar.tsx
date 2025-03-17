import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils';
import {
	ChevronLeft,
	ChevronRight,
	Monitor,
	Play,
	Siren,
	Square
} from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

type SidebarProps = {
	isStreaming: boolean;
	isStartDisabled: boolean;
	isStopDisabled: boolean;
	startStream: () => void;
	stopStream: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
	isStreaming,
	isStartDisabled,
	isStopDisabled,
	startStream,
	stopStream
}) => {
	const { t } = useTranslation();
	const [isExpanded, setIsExpanded] = useState(true);

	const commonStyles =
		'flex items-center justify-center gap-2 rounded px-4 py-2 text-center';

	const toggleSidebar = () => {
		setIsExpanded(prevState => !prevState);
	};

	return (
		<div
			className={cn(
				'flex h-screen flex-col justify-between bg-gray-800 text-white',
				isExpanded ? 'w-64' : 'w-16'
			)}
		>
			<div>
				<div className="flex items-center justify-between p-4">
					{isExpanded && (
						<h2 className="text-2xl font-bold">{t('sidebar.title')}</h2>
					)}
					<Button
						className="rounded bg-gray-600 p-2 hover:bg-gray-500"
						onClick={toggleSidebar}
					>
						{isExpanded ? (
							<ChevronLeft size={20} />
						) : (
							<ChevronRight size={20} />
						)}
					</Button>
				</div>
				<div className="flex flex-col gap-4 p-4">
					<Link
						to="/monitor"
						className={cn(
							commonStyles,
							'flex items-center justify-center bg-blue-600 hover:bg-blue-500'
						)}
					>
						<Monitor size={20} className="flex-shrink-0" />
						{isExpanded && t('sidebar.monitor')}
					</Link>
					<Link
						to="/alerts"
						className={cn(commonStyles, 'bg-amber-600 hover:bg-amber-500')}
					>
						<Siren size={20} className="flex-shrink-0" />
						{isExpanded && t('sidebar.alerts')}
					</Link>
				</div>
			</div>
			<div className="flex flex-col gap-4 p-4">
				<Button
					className={cn(commonStyles, 'bg-green-600 hover:bg-green-500')}
					disabled={isStreaming || isStartDisabled}
					onClick={startStream}
				>
					<Play size={20} />
					{isExpanded && t('sidebar.startStream')}
				</Button>
				<Button
					className={cn(commonStyles, 'bg-red-600 hover:bg-red-500')}
					disabled={!isStreaming || isStopDisabled}
					onClick={stopStream}
				>
					<Square size={20} />
					{isExpanded && t('sidebar.stopStream')}
				</Button>
			</div>
		</div>
	);
};

export default Sidebar;
