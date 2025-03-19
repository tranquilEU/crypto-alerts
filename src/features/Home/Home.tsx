import cryptoSignaly from '@shared/assets/crypto-signals.webp';
import React from 'react';

const Home: React.FC = () => {
	return (
		<div className="flex h-screen w-fit items-center justify-center overflow-hidden">
			<img
				src={cryptoSignaly}
				alt="Crypto Signaly"
				className="h-full w-full object-cover"
			/>
		</div>
	);
};

export default Home;
