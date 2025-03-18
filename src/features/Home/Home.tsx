import cryptoSignaly from '@shared/assets/crypto-signals.webp';
import React from 'react';

const Home: React.FC = () => {
	return (
		<div
			style={{
				width: 'fit-content',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				overflow: 'hidden'
			}}
		>
			<img
				src={cryptoSignaly}
				alt="Crypto Signaly"
				style={{ width: '100%', height: '100%', objectFit: 'cover' }}
			/>
		</div>
	);
};

export default Home;
