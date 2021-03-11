import React from "react";

export const useNotification = () => {
	const [snackPack, setSnackPack] = React.useState([]);

	const addNotification = (message, type) => {
		const snack = {
			key: new Date().getTime(),
			message: message,
			type: type,
		};
		setSnackPack([snack, ...snackPack]);
	};

	return { snackPack, setSnackPack, addNotification };
};

export default useNotification;
