import React from "react";
import { connect } from "react-redux";
import { compose, branch, renderComponent, mapProps } from "recompose";
import styled, { withTheme } from "styled-components";
import { getThemeProp, safeGet, unwrapImmutable } from "../utils";
import Placeholder from "../components/Placeholder";
import { GET_AUTHENTICATION_PROFILE } from "../actions/authentication";
import { ERROR, LOGOUT } from "../reducers/request";

const isAuthenticated = connect(state => ({
	loading: state.getIn(["requests", GET_AUTHENTICATION_PROFILE]),
	authedUser: state.getIn(["authentication", "name"]),
	requestError: unwrapImmutable(state.getIn(["requests", ERROR])),
	needLogin: state.getIn(["requests", LOGOUT]),
}));

export const Wrapper = styled.div`
	display: flex;
	width: 60%;
	height: 100%;
	padding: 0 20vw;
	flex-direction: column;
	justify-content: center;
`;

export const Loader = withTheme(props => (
	<Wrapper>
		<Placeholder
			icon={getThemeProp(["icons", "loading"], "loading")(props)}
			animate
		/>
	</Wrapper>
));

export const Error = ({ requestError, needLogin }) => {
	if (needLogin) {
		return (
			<Wrapper>
				<h1>Not logged in</h1>
			</Wrapper>
		);
	}
	return (
		<Wrapper>
			<h1>
				{safeGet(requestError, "payload", "message") || "An error occurred"}
			</h1>
			Last failing action: <pre>{JSON.stringify(requestError, null, 2)}</pre>
		</Wrapper>
	);
};

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
