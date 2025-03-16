import { WebSocketProvider } from '@/shared/context/websocketContext.tsx';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import './global.css';
import './shared/i18n';

createRoot(document.getElementById('root')!).render(
	<WebSocketProvider>
		<App />
	</WebSocketProvider>
);
