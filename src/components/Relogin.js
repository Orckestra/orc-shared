import React from "react";
import { connect } from "react-redux";
import { LOGOUT } from "../reducers/request";

export const withLoggedInStatus = connect(
	state => ({
		loggedOut: state.getIn(["requests", LOGOUT]),
	}),
	dispatch => ({
		// Dispatches a simple action that trips the request reducer to remove the logout flag
		clear: () => dispatch({ type: "__LOGIN_SUCCESS" }),
	}),
);

export const Relogin = ({ loggedOut, clear }) =>
	loggedOut ? (
		<iframe title="relogin" src={window.location.origin} onLoad={clear} />
	) : null;

export default withLoggedInStatus(Relogin);
