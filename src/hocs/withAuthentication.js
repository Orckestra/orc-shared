import React from "react";
import { connect } from "react-redux";
import { compose, branch, renderComponent, mapProps } from "recompose";
import styled, { withTheme } from "styled-components";
import { getThemeProp } from "../utils";
import Placeholder from "../components/Placeholder";
import { GET_AUTHENTICATION_PROFILE } from "../actions/authentication";

const isAuthenticated = connect(state => ({
	loading: state.getIn(["requests", GET_AUTHENTICATION_PROFILE]),
	authedUser: state.getIn(["authentication", "name"]),
}));

const LoaderWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	justify-content: center;
`;

export const Loader = withTheme(props => (
	<LoaderWrapper>
		<Placeholder
			icon={getThemeProp(["icons", "loading"], "loading")(props)}
			animate
		/>
	</LoaderWrapper>
));

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
