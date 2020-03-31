import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../reducers/request";

export const Relogin = () => {
	const dispatch = useDispatch();
	// Dispatches a simple action that trips the request reducer to remove the logout flag
	const clear = useCallback(() => dispatch({ type: "__LOGIN_SUCCESS" }), [dispatch]);
	const loggedOut = useSelector(state => state.getIn(["requests", LOGOUT]));
	return loggedOut ? (
		<iframe title="relogin" src={window.location.origin} onLoad={clear} />
	) : null;
};

export default Relogin;
