import React, { createContext, useState } from "react";
import { useNotification } from "./useNotification";
import Notification from "./../DataDisplay/Notification";

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
	const [snackPack, setSnackPack] = useState([]);

	const addNotification = useNotification(snackPack, setSnackPack);

	return (
		<NotificationContext.Provider value={{ addNotification }}>
			<Notification snackPack={snackPack} setSnackPack={setSnackPack} />
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationContextProvider;
