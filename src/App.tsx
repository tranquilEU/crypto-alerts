import Alerts from '@/features/Alerts/Alerts';
import Home from '@/features/Home/Home';
import Monitor from '@/features/Monitor/Monitor';
import Sidebar from '@/shared/components/Sidebar/Sidebar';
import { useWebSocketStream } from '@/shared/hooks/useWebSocketStream';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
	const {
		orders,
		cheapOrders,
		solidOrders,
		bigBiznisHere,
		isStreaming,
		isStartDisabled,
		isStopDisabled,
		startStream,
		stopStream,
		setCheapOrders,
		setSolidOrders,
		setBigBiznisHere
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
				<div className="flex-1">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/monitor" element={<Monitor orders={orders} />} />
						<Route
							path="/alerts"
							element={
								<Alerts
									cheapOrders={cheapOrders}
									solidOrders={solidOrders}
									bigBiznisHere={bigBiznisHere}
									setCheapOrders={setCheapOrders}
									setSolidOrders={setSolidOrders}
									setBigBiznisHere={setBigBiznisHere}
								/>
							}
						/>
					</Routes>
				</div>
			</div>
			<ToastContainer />
		</Router>
	);
};

export default App;
