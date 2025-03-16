import Alerts from '@/features/Alerts/Alerts';
import Monitor from '@/features/Monitor/Monitor';
import Sidebar from '@/shared/components/Sidebar/Sidebar';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
	return (
		<Router>
			<div className="flex">
				<Sidebar />
				<div className="flex-1 p-4">
					<Routes>
						<Route path="/monitor" element={<Monitor />} />
						<Route path="/alerts" element={<Alerts />} />
					</Routes>
				</div>
			</div>
			<ToastContainer />
		</Router>
	);
};

export default App;
