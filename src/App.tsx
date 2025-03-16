import { General } from '@/features/General/General';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
	return (
		<>
			<General />
			<ToastContainer />
		</>
	);
};

export default App;
