export const formatDelayNs = (delayNs: number): string => {
	const milliseconds = delayNs / 1_000_000;
	const seconds = delayNs / 1_000_000_000;
	const minutes = seconds / 60;

	if (milliseconds < 1000) {
		return `${milliseconds.toFixed(2)} ms`;
	} else if (seconds < 60) {
		return `${seconds.toFixed(2)} seconds`;
	} else {
		return `${minutes.toFixed(2)} minutes`;
	}
};
