import React from 'react';

interface MonitorPageProps {
	messages: string[];
}

const MonitorPage: React.FC<MonitorPageProps> = ({ messages }) => {
	return (
		<div className="h-100vh w-[calc(100vw-19rem)] overflow-hidden p-3 font-sans">
			<h1 className="text-2xl font-bold">Stream Monitor</h1>
			<div className="mt-5 max-h-[calc(100vh-120px)] overflow-y-auto rounded border border-gray-300 p-3">
				<h2 className="text-lg font-semibold">Stream Data:</h2>
				<table className="mt-3 w-full border-collapse border border-gray-400">
					<thead>
						<tr>
							<th className="border border-gray-400 px-2 py-1 text-left">#</th>
							<th className="border border-gray-400 px-2 py-1 text-left">
								Message
							</th>
						</tr>
					</thead>
					<tbody>
						{messages.map((msg, index) => (
							<tr key={index}>
								<td className="border border-gray-400 px-2 py-1 text-center">
									{index + 1}
								</td>
								<td className="border border-gray-400 px-2 py-1 break-words">
									{msg}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MonitorPage;
