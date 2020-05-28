import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../reducers/request";

export const Relogin = () => {
	const dispatch = useDispatch();
	// Dispatches a simple action that trips the request reducer to remove the logout flag
	const clear = useCallback(() => dispatch({ type: "__LOGIN_SUCCESS" }), [dispatch]);
	const loggedOut = useSelector(state => state.getIn(["requests", LOGOUT]));
	if (!loggedOut) return null;
	if (window.location.hostname === "localhost") {
		console.log("%cYou have been logged out", "font-size: x-large");
		console.log("Execute this function once logged in again to avoid interruption", () =>
			clear(),
		);
		return null;
	}
	return <iframe title="relogin" src={window.location.origin} onLoad={clear} />;
};

export default Relogin;
