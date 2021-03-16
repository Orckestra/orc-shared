import React, { useCallback } from "react";

export const useNotification = () => {
	const [snackPack, setSnackPack] = React.useState([]);

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

	return { snackPack, setSnackPack, addNotification };
};

export default useNotification;
