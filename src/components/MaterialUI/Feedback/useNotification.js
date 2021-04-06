import { useCallback } from "react";

export const useNotification = (snackPack, setSnackPack) => {
	const addNotification = useCallback(
		(message, type) => {
			const snack = {
				key: new Date().getTime(),
				message: message,
				type: type,
			};
			setSnackPack([snack, ...snackPack]);
		},
		[snackPack, setSnackPack],
	);

	return addNotification;
};

export default useNotification;
