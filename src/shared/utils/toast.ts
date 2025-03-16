import { Theme, toast as t } from 'react-toastify';

const commpnProperties: { theme: Theme; pauseOnFocusLoss: boolean } = {
	theme: 'colored',
	pauseOnFocusLoss: false
};

const success = (message: string) => {
	t.success(message, {
		className: '!bg-[#508c23] !border-green-primary !text-green-primary',
		...commpnProperties
	});
};

const error = (message: string) => {
	t.error(message, {
		className: '!bg-[#d00606] !border-red-primary !text-red-primary',
		...commpnProperties
	});
};

export const toast = { success, error };
