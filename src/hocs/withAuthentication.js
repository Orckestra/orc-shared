import React from "react";
import { connect } from "react-redux";
import { compose, branch, renderComponent, mapProps } from "recompose";
import { GET_AUTHENTICATION_PROFILE } from "../actions/authentication";

const isAuthenticated = connect(state => ({
	loading: state.getIn(["requests", GET_AUTHENTICATION_PROFILE]),
	authedUser: state.getIn(["authentication", "name"]),
}));

export const Loader = () => <div>Loading</div>; // Needs to be nicer
export const Error = () => <h1>Not Logged In</h1>; // Should probably redirect to log in

const withAuthentication = compose(
	isAuthenticated,
	branch(({ loading }) => loading, renderComponent(Loader)),
	branch(
		({ authedUser }) => !authedUser,
		renderComponent(Error),
		mapProps(({ authedUser, ...props }) => props),
	),
);

export default withAuthentication;
