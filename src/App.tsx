import Alerts from '@/features/Alerts/Alerts';
import Monitor from '@/features/Monitor/Monitor';
import Sidebar from '@/shared/components/Sidebar/Sidebar';
import { useWebSocketStream } from '@/shared/hooks/useWebSocketStream';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
	const {
		messages,
		isStreaming,
		isStartDisabled,
		isStopDisabled,
		startStream,
		stopStream
	} = useWebSocketStream();

	return (
		<Router>
			<div className="flex">
				<Sidebar
					isStreaming={isStreaming}
					isStartDisabled={isStartDisabled}
					isStopDisabled={isStopDisabled}
					startStream={startStream}
					stopStream={stopStream}
				/>
				<div className="flex-1 p-4">
					<Routes>
						<Route path="/monitor" element={<Monitor messages={messages} />} />
						<Route path="/alerts" element={<Alerts />} />
					</Routes>
				</div>
			</div>
			<ToastContainer />
		</Router>
	);
};

export default App;
